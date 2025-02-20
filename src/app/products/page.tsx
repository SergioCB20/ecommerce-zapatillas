"use client";

import { Suspense } from "react";
import ProductsPageContent from "@/components/ProductsPageContent"; // Extrae la lógica a otro componente

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex justify-center items-center">
          <h1 className="text-4xl font-bold italic text-gray-600">
            Cargando...
          </h1>
        </div>
      }
    >
      <ProductsPageContent />
    </Suspense>
  );
}
