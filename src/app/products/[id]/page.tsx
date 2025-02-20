"use client";
import Image from "next/image";
import { getProductById } from "@/lib/productsService";
import { Product, CartItem } from "@/types/types";
import { useParams } from "next/navigation";
import { useState, useEffect, ReactNode } from "react";
import { DiscountButton } from "@/components/DiscountButton";
import { ProductPageSkeleton } from "@/components/Skeletons/ProductPage";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState<ReactNode>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const fetchedProduct = await getProductById(Array.isArray(id) ? id[0] : id);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!product) return;
    const newQuantity = Math.max(1, Math.min(Number(e.target.value), product.stock));
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (!product) return;
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingCartItemIndex = cart.findIndex((item) => item.id === product.id);
    
    if (existingCartItemIndex !== -1) {
      const existingCartItem = cart[existingCartItemIndex];
      const newTotalQuantity = existingCartItem.quantity + quantity;
      if (newTotalQuantity > product.stock) {
        setMessage(<span className="text-red-600 font-medium">No se puede agregar más. Stock insuficiente.</span>);
        setTimeout(() => setMessage(""), 3000);
        return;
      }
      cart[existingCartItemIndex].quantity = newTotalQuantity;
    } else {
      if (quantity > product.stock) {
        setMessage(<span className="text-red-600 font-medium">No se puede agregar más. Stock insuficiente.</span>);
        setTimeout(() => setMessage(""), 3000);
        return;
      }
      cart.push({ ...product, quantity });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setMessage(<span className="text-green-600 font-medium">¡{quantity} {product.name} ha sido añadido al carrito!</span>);
    setTimeout(() => setMessage(""), 3000);
  };

  if (loading) {
    return (
      <div className="w-full h-full">
        <ProductPageSkeleton/>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center pt-6">
      {product ? (
        <div className="w-full max-w-7xl mx-auto flex gap-8 p-6 bg-white rounded-lg shadow-md">
          <div className="w-[50%] h-full flex justify-center items-center">
            <Image src={product.imageUrl} alt={product.name} width={400} height={600} className="w-full h-auto object-contain rounded-lg border border-gray-200" />
          </div>
          <div className="w-[50%] h-full pt-5 px-3">
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <div className="flex items-center gap-2 mt-4">
              {product.hasDiscount && product.discountPorcentage ? (
                <div className="flex gap-2">
                  <h2 className="line-through text-gray-500">${product.price.toFixed(2)}</h2>
                  <h2 className="text-xl text-red-600 font-semibold">${(product.price - product.price * (product.discountPorcentage / 100)).toFixed(2)}</h2>
                  <DiscountButton discountPercentage={product.discountPorcentage ?? 0} onApply={(newPrice) => console.log(`Nuevo precio aplicado: $${newPrice}`)} />
                </div>
              ) : (
                <h2 className="text-xl font-semibold">${product.price.toFixed(2)}</h2>
              )}
            </div>
            <div className="mt-6 flex items-center gap-4">
              <label htmlFor="quantity" className="text-gray-700 font-medium">Cantidad:</label>
              <input id="quantity" type="number" value={quantity} min="1" max={product.stock} onChange={handleQuantityChange} className="border border-gray-300 p-2 rounded w-20 text-center" />
            </div>
            <p className="mt-2 text-sm text-gray-500">Stock disponible: {product.stock}</p>
            <button onClick={handleAddToCart} className="mt-6 bg-blue-500 hover:bg-blue-600 transition-colors text-white py-2 px-6 rounded-lg font-medium">Agregar al carrito</button>
            {message && <div className="mt-4">{message}</div>}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <h1 className="text-4xl font-bold italic text-gray-600">PRODUCT NOT FOUND</h1>
        </div>
      )}
    </div>
  );
}
