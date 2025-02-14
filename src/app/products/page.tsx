"use client";
import { useSearchParams } from "next/navigation";
import { FunnelIcon } from "@heroicons/react/24/solid";
import { sneakers } from "@/data/data";
import { useState } from "react";
import { useMemo } from "react";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [openFilterSideBar, setOpenFilterSideBar] = useState(false);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [hasDiscount, setHasDiscount] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const query = searchParams.get("query");

  // Filtrar los productos que contienen el contenido de la query
  const filteredSneakers = useMemo(() => {
    return sneakers
      .filter((sneaker) => {
        const matchesQuery = sneaker.name.toLowerCase().includes(query?.toLowerCase() || "");
        const matchesCategory = category ? sneaker.category === category : true;
        const matchesBrand = brand ? sneaker.brand === brand : true;
        const matchesPrice = sneaker.price >= priceRange[0] && sneaker.price <= priceRange[1];
        const matchesDiscount = hasDiscount ? sneaker.hasDiscount : true;
        return matchesQuery && matchesCategory && matchesBrand && matchesPrice && matchesDiscount;
      })
      .sort((a, b) => {
        if (sortOption === "name-asc") {
          return a.name.localeCompare(b.name);
        } else if (sortOption === "name-desc") {
          return b.name.localeCompare(a.name);
        } else if (sortOption === "price-asc") {
          return a.price - b.price;
        } else if (sortOption === "price-desc") {
          return b.price - a.price;
        } else if (sortOption === "discount-asc") {
          return (a.discountPorcentage ?? 0) - (b.discountPorcentage ?? 0);
        } else if (sortOption === "discount-desc") {
          return (b.discountPorcentage ?? 0) - (a.discountPorcentage ?? 0);
        }
        return 0;
      });
  }, [query, category, brand, priceRange, hasDiscount, sortOption]);

  return (
    <div className="w-full min-h-screen bg-background px-2 py-5 mt-10 md:mt-7">
      <div className="w-full h-12 flex justify-between items-center">
        <div className="w-fit ms-5 mt-5">
          {query?(
            <div>
              <h1 className="font-normal text-xl">Resultado de:</h1>
            <span className="font-bold text-4xl italic">
              "{query.toUpperCase()}"
            </span>
            </div>
          ) :(
            <div>
              <h1 className="font-bold text-4xl italic">¡Explora nuestros productos!</h1>
            </div>
          )}
        </div>
        <div
          className="flex items-center gap-4 px-3 py-1 border border-black cursor-pointer"
          onClick={() => setOpenFilterSideBar(true)}
        >
          <p className="font-bold">FILTRAR Y ORDENAR</p>
          <FunnelIcon className="h-8 w-8 text-gray-700" />
        </div>
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-5 border-t-2">
        {filteredSneakers.length > 0 ? (
          filteredSneakers.map((sneaker) => (
            <ProductCard product={sneaker} key={sneaker.id} />
          ))
        ) : (
          <p>No se encontraron resultados</p>
        )}
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex justify-end z-30 transition-all duration-300 ${
          openFilterSideBar ? "w-full" : "w-0"
        }`}
      >
        <div
          className={`bg-white h-full p-4 transition-all duration-300 overflow-hidden ${
            openFilterSideBar ? "w-full md:w-96 opacity-100" : "w-0 opacity-0"
          }`}
        >
          <button
            className="mb-4 text-red-500"
            onClick={() => setOpenFilterSideBar(false)}
          >
            Cerrar
          </button>
          <div>
            <h1 className="text-xl mb-4 font-bold">Filtros</h1>
            {/* Filtros */}
            <h2 className="font-bold mb-2">Categoría</h2>
            <select
              className="w-full p-2 border mb-4"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Todas</option>
              <option value="categoria1">Categoría 1</option>
              <option value="categoria2">Categoría 2</option>
              {/* Añade más categorías según tus datos */}
            </select>
            <h2 className="font-bold mb-2">Marca</h2>
            <select
              className="w-full p-2 border mb-4"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            >
              <option value="">Todas</option>
              <option value="marca1">Marca 1</option>
              <option value="marca2">Marca 2</option>
              {/* Añade más marcas según tus datos */}
            </select>
            <h2 className="font-bold mb-2">Precio</h2>
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              className="w-full mb-4"
            />
            <p className="mb-4">Máximo: ${priceRange[1]}</p>
            <label className="flex items-center mb-4 font-bold">
              <input
                type="checkbox"
                checked={hasDiscount}
                onChange={(e) => setHasDiscount(e.target.checked)}
                className="mr-2"
              />
              Solo productos con descuento
            </label>
          </div>
          <div>
            <h1 className="text-xl mb-4 font-bold">Ordenar</h1>
            {/* Ordenar por nombre, precio y descuento (ascendente o descendente) */}
            <select
              className="w-full p-2 border mb-4"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Ninguno</option>
              <option value="name-asc">Nombre (A-Z)</option>
              <option value="name-desc">Nombre (Z-A)</option>
              <option value="price-asc">Precio (Bajo a Alto)</option>
              <option value="price-desc">Precio (Alto a Bajo)</option>
              <option value="discount-asc">Descuento (Menor a Mayor)</option>
              <option value="discount-desc">Descuento (Mayor a Menor)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}



