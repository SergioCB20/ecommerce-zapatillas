"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { deleteProduct } from "@/lib/productsService";
import { Product } from "@/types/types";
import ProductForm from "./ProductForm";
import ProductCardSkeleton from "./Skeletons/ProductCard";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const productsCollection = collection(db, "products");

    const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
      const productList = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Product[];
      console.log("Productos actualizados:", productList);
      setProducts(productList);
    });
    return () => unsubscribe(); 
  }, []);

  const handleDelete = async (productId: string) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      try {
        await deleteProduct(productId);
      } catch (error) {
        console.error("Error al eliminar el producto:", error);
        alert("Ocurrió un error al eliminar el producto.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <div className="w-full flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-6">Lista de Productos</h1>
        <button
          onClick={() => {
            setSelectedProduct(null);
            setShowForm(true);
          }}
          className="px-4 py-2 bg-green-600 text-white rounded-md mb-4 hover:bg-green-700"
        >
          Crear Producto
        </button>
      </div>
      {products.length === 0 ? (
        <ProductCardSkeleton />
      ):(
        <table className="w-full md:w-[60%] border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Nombre</th>
            <th className="p-2">Precio</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b">
              <td className="text-center p-2">{product.name}</td>
              <td className="text-center p-2">
                ${Number(product.price).toFixed(2)}
              </td>
              <td className="text-center p-2">{product.stock}</td>
              <td className="text-center p-2">
                <button
                  onClick={() => {
                    setSelectedProduct(product);
                    setShowForm(true);
                  }}
                  className="px-2 py-1 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
      {showForm && (
        <ProductForm
          product={selectedProduct || undefined}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default ProductList;

