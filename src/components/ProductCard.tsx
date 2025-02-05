import { Product } from "@/types/types";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      key={product.id}
      className="bg-white p-4 rounded-xl shadow-card text-center hover:cursor-pointer hover-default"
    >
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={128}
        height={100}
        className="mx-auto object-cover rounded-lg"
      />
      <h4 className="text-lg font-bold text-text mt-2">{product.name}</h4>
      <p className="text-textMuted">${product.price}</p>
      {product.hasDiscount && (
        <p className="text-green-500 font-bold">
          -{product.discountPorcentage}% Descuento
        </p>
      )}
    </div>
  );
}
