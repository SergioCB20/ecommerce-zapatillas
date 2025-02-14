"use client";
import { sneakers } from "@/data/data";
import Image from "next/image";
import { Product } from "@/types/types";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const { id } = useParams();
  const product = sneakers.find((sneaker: Product) => sneaker.id === id);
  return (
    <div className="w-full min-h-screen pt-6">
      {product ? (
        <div className="w-full h-screen flex">
          <div className="w-[60%] h-full border flex justify-center items-center">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={400}
              height={600}
              className="w-[80%] h-[80%] border border-red-900"
            />
          </div>
          <div className="w-[40%] h-full pt-5 px-3">
            <h1>{product.name}</h1>
            <h1>${product.price.toFixed(2)}</h1>
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <h1 className="text-4xl font-bold italic">PRODUCTO NO ENCONTRADO</h1>
        </div>
      )}
    </div>
  );
}
