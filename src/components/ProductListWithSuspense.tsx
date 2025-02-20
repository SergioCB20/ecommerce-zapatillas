import { Suspense } from "react";
import { Product } from "@/types/types";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "./Skeletons/ProductCard";

type ProductListProps = {
  fetchProducts: () => Promise<Product[]>;
};

async function ProductList({ fetchProducts }: ProductListProps) {
  const products: Product[] = await fetchProducts();

  if (products.length === 0) {
    return (
      <p className="text-center text-gray-500">No hay productos disponibles.</p>
    );
  }

  return (
    <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}

export default function ProductListWithSuspense({
  fetchProducts,
}: ProductListProps) {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      }
    >
      <ProductList fetchProducts={fetchProducts} />
    </Suspense>
  );
}
