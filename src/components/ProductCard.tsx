import { Product } from "@/types/types";
import Link from "next/link";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div
      key={product.id}
      className="bg-white relative p-4 rounded-xl shadow-card text-center hover:cursor-pointer hover-default"
    >
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={128}
        height={100}
        className="h-20 mx-auto object-cover rounded-lg"
      />
      <h4 className="text-lg font-bold text-text mt-2">{product.name}</h4>
      {product.hasDiscount ? (
        <div className="mb-5 w-full justify-center flex gap-3">
          <p className="text-textMuted line-through">${(product.price / (1 - (product.discountPorcentage ?? 0) / 100)).toFixed(2)}</p>
          <p className="text-red-500">${product.price.toFixed(2)}</p>
        </div>
      ) : (
        <p className="text-textMuted mb-5">${product.price.toFixed(2)}</p>
      )}
      {product.hasDiscount && (
        <div className="absolute top-3 left-0 rounded-e-xl text-white bg-red-700 w-fit px-2 py-1 font-bold hover:text-yellow-400">
          -{product.discountPorcentage}%
        </div>
      )}
      <Link href={`products/${product.id}`} className="primary-button px-4 py-2">
        Comprar
      </Link>
    </div>
  );
}

