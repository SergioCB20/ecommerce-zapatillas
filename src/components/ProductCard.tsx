"use client";
import Image from "next/image";
import { useState } from "react";
import { Product } from "@/types/types";
import { updateProduct } from "@/lib/productsService";
import Link from "next/link";
import ProductImage from "@/../public/ProductCard_PlaceHolder.jpg";
import { DiscountButton } from "./DiscountButton"; // Asegúrate de importar el componente DiscountButton

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // 🔹 Estado para manejar el descuento localmente
  const [discountPercentage, setDiscountPercentage] = useState(
    product.discountPorcentage ?? 0
  );
  const [finalPrice, setFinalPrice] = useState(
    product.hasDiscount
      ? (product.price * (1 - discountPercentage / 100)).toFixed(2)
      : product.price.toFixed(2)
  );

  const handleApplyDiscount = async (newPercentage: number) => {
    console.log(`Aplicando nuevo porcentaje de descuento: ${newPercentage}%`);
    
    // Actualizar el backend
    await updateProduct(product.id, {
      discountPorcentage: newPercentage,
    });

    // 🔹 Actualizar el estado localmente para re-renderizar SOLO este componente
    setDiscountPercentage(newPercentage);
    setFinalPrice((product.price * (1 - newPercentage / 100)).toFixed(2));

    console.log(`Nuevo porcentaje de descuento aplicado: ${newPercentage}%`);
  };

  return (
    <div className="w-full min-w-64 relative max-w-sm p-4 bg-white border rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.02]">
      {/* Imagen del producto */}
      <div className="w-full h-60 relative">
        <Image
          src={product.imageUrl || ProductImage}
          alt={product.name}
          width={400}
          height={600}
          style={{ objectFit: "cover" }}
          className="rounded-t-lg max-h-[250px]"
        />
      </div>

      {/* Contenido del producto */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {product.name}
        </h3>

        {/* Precio y descuento */}
        <div className="mt-2 mb-4 flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <p className="text-xl font-bold text-primary">${finalPrice}</p>
            {product.hasDiscount && (
              <p className="text-sm text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </p>
            )}
          </div>
          {product.hasDiscount && (
            <DiscountButton
              originalPrice={product.price}
              discountPercentage={discountPercentage}
              onApply={handleApplyDiscount}
            />
          )}
        </div>

        {/* Botón de agregar al carrito */}
        <Link
          href={`/products/${product.id}`}
          className="w-full bg-blue-500 text-white text-sm px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Comprar
        </Link>
      </div>
    </div>
  );
}
