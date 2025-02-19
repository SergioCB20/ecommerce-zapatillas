"use client"
import React, { useEffect, useState } from "react";
import { getAllProducts } from "@/lib/productsService";
import { Product } from "@/types/types";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
      const fetchProducts = async () => {
        const fetchedProducts = await getAllProducts();
        console.log(fetchedProducts);
        setProducts(fetchedProducts);
      };
      fetchProducts();
    }, []);
  return (
    <div className="w-full h-full bg-background">
      <div className="w-full h-screen relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://cdn.pixabay.com/photo/2022/05/08/08/58/feet-7181596_1280.jpg"
            alt="HeroImage"
            width={1920}
            height={1080}
            objectFit="cover"
            className="w-full h-full brightness-50"
          />
        </div>

        <div className="absolute inset-0 flex justify-center items-center z-10 text-white">
          <div className="relative max-w-[80%] flex flex-col items-center gap-5 bg-black bg-opacity-50 p-8 rounded-lg magical-bg">
            <h1 className="text-6xl font-bold text-center">Calidad que se ajusta a ti</h1>
            <p className="text-center">¡Explora nuestro catálogo de zapatillas!</p>
            <Link href={`/products`} className="primary-button max-w-[50%] px-5 py-2">Explora Ahora</Link>
          </div>
        </div>
      </div>
      {/* Categorías */}
      <section className="p-6">
        <h3 className="text-xl font-semibold text-text mb-4">Categorías</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {["Descuentos", "Sneakers", "Sandalias", "Crocs", "Pantuflas"].map(
            (cat) => (
              <div
                key={cat}
                className="bg-blue-500 hover:bg-blue-600 p-4 rounded-xl text-center text-white hover:cursor-pointer hover-default"
              >
                {cat}
              </div>
            )
          )}
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="p-6">
        <h3 className="text-xl font-semibold text-text mb-4">Destacados</h3>
        <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </section>
    </div>
  );
}
