"use client";
import Image from "next/image";
import { Product } from "@/types/types";
import { useState } from "react";
import Link from "next/link";
import {DiscountButton} from "./DiscountButton"; // Asegúrate de importar el componente DiscountButton

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const finalPrice = product.hasDiscount
    ? (product.price * (1 - (product.discountPorcentage || 0) / 100)).toFixed(2)
    : product.price.toFixed(2);

  const [hasDiscount, setHasDiscount] = useState(product.hasDiscount);
  const [discountPercentage, setDiscountPercentage] = useState(
    product.discountPorcentage || 0
  );

  function handleModifyDiscount() {
    // Lógica para modificar el descuento
  }

  const handleApplyDiscount = (newPercentage: number) => {
    setDiscountPercentage(newPercentage);
    console.log(`Nuevo porcentaje de descuento aplicado: ${newPercentage}%`);
  };

  return (
    <div className="w-full relative max-w-sm p-4 bg-white border rounded-lg shadow-md transition-transform duration-300 hover:scale-[1.02]">
      {/* Imagen del producto */}
      <div className="w-full h-60 relative">
        <Image
          src={product.imageUrl}
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
            {hasDiscount && (
              <p className="text-sm text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </p>
            )}
          </div>
          {hasDiscount && 
            <DiscountButton
              originalPrice={product.price}
              discountPercentage={discountPercentage}
              onApply={handleApplyDiscount}
            />}
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