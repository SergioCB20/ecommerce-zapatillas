import Image from "next/image";
import { Product } from "@/types/types";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const finalPrice = product.hasDiscount
    ? (product.price * (1 - (product.discountPorcentage || 0) / 100)).toFixed(2)
    : product.price.toFixed(2);

  return (
    <div className="relative border rounded-lg p-4 shadow-sm transition-transform duration-300 hover:scale-[1.02] bg-white">
      {/* Imagen del producto */}
      <div className="w-full h-60 relative">
        <Image
          src={product.imageUrl}
          alt={product.name}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>

      {/* Contenido del producto */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
          {product.name}
        </h3>

        {/* Precio y descuento */}
        <div className="mt-2 mb-4 flex items-center justify-between">
          <p className="text-xl font-bold text-primary">${finalPrice}</p>
          {product.hasDiscount && (
            <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              {product.discountPorcentage}% OFF
            </span>
          )}
        </div>

        {/* Botón de agregar al carrito */}
        <Link href={`/products/${product.id}`} className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Comprar
        </Link>
      </div>
    </div>
  );
}
