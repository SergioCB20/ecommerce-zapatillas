"use client";
import React, { useEffect, useState } from "react";
import { getRandomProducts } from "@/lib/productsService";
import { Product } from "@/types/types";
import Image from "next/image";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import HeroImage from "@/../public/Hero_Home.jpg"

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getRandomProducts(6);
        if (isMounted) {
          setProducts(fetchedProducts);
        }
      } catch (error) {
        console.error("Error fetching random products:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full h-full bg-background">
      {/* Hero Section */}
      <div className="w-full h-screen relative">
        <div className="absolute inset-0 z-0">
          <Image
            src={HeroImage}
            alt="Hero Image"
            width={1920}
            height={1080}
            className="w-full h-full object-cover brightness-50"
            priority
          />
        </div>

        <div className="absolute inset-0 flex justify-center items-center z-10 text-white">
          <div className="relative max-w-[80%] flex flex-col items-center gap-5 bg-black bg-opacity-50 p-8 rounded-lg">
            <h1 className="text-6xl font-bold text-center">
              Calidad que se ajusta a ti
            </h1>
            <p className="text-center">
              ¡Explora nuestro catálogo de zapatillas!
            </p>
            <Link
              href="/products"
              className="primary-button max-w-[50%] px-5 py-2"
              aria-label="Explorar productos"
            >
              Explora Ahora
            </Link>
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
                className="bg-blue-500 hover:bg-blue-600 p-4 rounded-xl text-center text-white cursor-pointer transition-all duration-200"
              >
                {cat}
              </div>
            )
          )}
        </div>
      </section>

      {/* Productos Destacados (Aleatorios) */}
      <section className="p-6">
        <h3 className="text-xl font-semibold text-text mb-4">Destacados</h3>

        {loading ? (
          <p className="text-center text-gray-500">Cargando productos...</p>
        ) : products.length > 0 ? (
          <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No hay productos disponibles en este momento.
          </p>
        )}
      </section>
    </div>
  );
}
