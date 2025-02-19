"use client";
import React, { useState } from "react";
import { Product } from "@/types/types";
import { createProduct, updateProduct } from "@/lib/productsService";
import { uploadImageToStorage } from "@/lib/storageService"; // Importa la función de almacenamiento
import Image from "next/image";

interface ProductFormProps {
  product?: Product; // Producto a editar (opcional)
  onClose: () => void; // Función para cerrar el formulario
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onClose }) => {
  const [formData, setFormData] = useState<Product>({
    id: product?.id || "",
    name: product?.name || "",
    price: product?.price || 0,
    brand: product?.brand || "",
    category: product?.category || "",
    imageUrl: product?.imageUrl || "",
    hasDiscount: product?.hasDiscount || false,
    discountPorcentage: product?.discountPorcentage || 0,
    stock: product?.stock || 0,
  });
  const [imageFile, setImageFile] = useState<File | null>(null); // Estado para almacenar la imagen seleccionada
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    product?.imageUrl || null
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    if(name === "price"|| name === "discountPorcentage" || name === "stock"){ 
        if (!/^\d*$/.test(value)) {
            return;
          }
          if(value === ""){
                setFormData({
                    ...formData,
                    [name]: 0,
                });
                return
          }
          setFormData({
            ...formData,
            [name]: parseInt(value),
          });
          return;
    }
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file); // Guarda la imagen seleccionada
      setPreviewUrl(URL.createObjectURL(file)); // Genera una vista previa local
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = formData.imageUrl;

      // Si se seleccionó una nueva imagen, subirla a Firebase Storage
      if (imageFile) {
        imageUrl = await uploadImageToStorage(imageFile); // Usa la función encapsulada
      }

      // Actualiza los datos del producto con la nueva URL de la imagen
      const updatedData = { ...formData, imageUrl };

      if (product) {
        // Editar producto
        await updateProduct(product.id, updatedData);
        alert("Producto actualizado exitosamente.");
      } else {
        // Crear producto
        await createProduct(updatedData);
        alert("Producto creado exitosamente.");
      }

      onClose(); // Cierra el formulario
    } catch (error) {
      console.error("Error al guardar el producto:", error);
      alert("Ocurrió un error al guardar el producto.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex pt-24 justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4">
          {product ? "Editar Producto" : "Crear Producto"}
        </h2>
        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre (*)</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Precio ($) (*)</label>
            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Marca (*)</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Categoría (*)</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="hasDiscount"
                checked={formData.hasDiscount}
                onChange={handleChange}
                className="mr-2"
              />
              Tiene descuento
            </label>
          </div>
          {formData.hasDiscount && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Porcentaje de descuento
              </label>
              <input
                name="discountPorcentage"
                value={formData.discountPorcentage}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Stock (*)</label>
            <input
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <label className="block text-sm font-medium mb-1">
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {/* Vista previa de la imagen */}
          {previewUrl && (
            <div className="flex justify-around items-center mt-2">
                <p className="text-sm">{product && !imageFile ? "Imagen actual: " : "Imagen seleccionada:"}</p>
              <Image
                src={previewUrl}
                alt="Vista previa"
                className="w-24 h-24 object-cover rounded-md"
                width={96}
                height={96}
              />
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
