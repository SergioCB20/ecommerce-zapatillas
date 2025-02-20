"use client";
import React, { useEffect, useState, useMemo, useCallback, useReducer } from "react";
import { getAllProducts } from "@/lib/productsService";
import { Product } from "@/types/types";
import { useSearchParams } from "next/navigation";
import { FunnelIcon } from "@heroicons/react/24/solid";
import ProductCard from "@/components/ProductCard";
import loadConfig from "next/dist/server/config";

// Definimos el estado inicial para los filtros
const initialFilters: FiltersState = {
  category: "",
  brand: "",
  priceRange: [0, 1000],
  hasDiscount: false,
  sortOption: "",
};

// Reducer para manejar los filtros de forma más limpia
interface FiltersState {
  category: string;
  brand: string;
  priceRange: [number, number];
  hasDiscount: boolean;
  sortOption: string;
}

interface FiltersAction {
  type: string;
  payload?: any;
}

const filtersReducer = (state: FiltersState, action: FiltersAction): FiltersState => {
  switch (action.type) {
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    case "SET_BRAND":
      return { ...state, brand: action.payload };
    case "SET_PRICE_RANGE":
      return { ...state, priceRange: action.payload };
    case "TOGGLE_DISCOUNT":
      return { ...state, hasDiscount: !state.hasDiscount };
    case "SET_SORT":
      return { ...state, sortOption: action.payload };
    case "RESET":
      return initialFilters;
    default:
      return state;
  }
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [openFilterSideBar, setOpenFilterSideBar] = useState(false);
  const [filters, dispatch] = useReducer(filtersReducer, initialFilters);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  // Fetch de productos
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const fetchedProducts = await getAllProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Filtrar productos
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        return (
          product.name.toLowerCase().includes(query.toLowerCase()) &&
          (filters.category ? product.category === filters.category : true) &&
          (filters.brand ? product.brand === filters.brand : true) &&
          product.price >= filters.priceRange[0] &&
          product.price <= filters.priceRange[1] &&
          (filters.hasDiscount ? product.hasDiscount : true)
        );
      })
      .sort((a, b) => {
        switch (filters.sortOption) {
          case "name-asc":
            return a.name.localeCompare(b.name);
          case "name-desc":
            return b.name.localeCompare(a.name);
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "discount-asc":
            return (a.discountPorcentage ?? 0) - (b.discountPorcentage ?? 0);
          case "discount-desc":
            return (b.discountPorcentage ?? 0) - (a.discountPorcentage ?? 0);
          default:
            return 0;
        }
      });
  }, [products, query, filters]);

  return (
    <div className="w-full min-h-screen bg-background px-4 py-5 mt-14 md:mt-7">
      {/* Encabezado */}
      <div className="flex justify-between items-center mb-6">
        <div>
          {query ? (
            <h1 className="text-xl">
              Resultado de: <span className="font-bold text-3xl italic">"{query.toUpperCase()}"</span>
            </h1>
          ) : (
            <h1 className="text-3xl font-bold italic">¡Explora nuestros productos!</h1>
          )}
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 border border-black hover:bg-gray-200 transition"
          onClick={() => setOpenFilterSideBar(true)}
        >
          <FunnelIcon className="h-6 w-6 text-gray-700" />
          <span className="font-bold hidden md:block">Filtrar y Ordenar</span>
        </button>
      </div>

      {/* Productos */}
      {loading ? (
        <h1>Cargando..</h1>
      ) : (
        <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => <ProductCard product={product} key={product.id} />)
          ) : (
            <p className="text-center col-span-full text-gray-600">No se encontraron productos.</p>
          )}
        </div>
      )}

      {/* Sidebar de Filtros */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex justify-end transition-all ${
          openFilterSideBar ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`bg-white h-full pt-24 p-6 transition-all duration-300 w-full md:w-96 ${
            openFilterSideBar ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            className="text-red-500 font-bold mb-4"
            onClick={() => setOpenFilterSideBar(false)}
          >
            Cerrar
          </button>
          <h1 className="text-xl font-bold mb-4">Filtros</h1>

          {/* Categoría */}
          <label className="block font-semibold mb-1">Categoría</label>
          <select
            className="w-full p-2 border mb-4"
            value={filters.category}
            onChange={(e) => dispatch({ type: "SET_CATEGORY", payload: e.target.value })}
          >
            <option value="">Todas</option>
            <option value="sneakers">Sneakers</option>
            <option value="sandalias">Sandalias</option>
            <option value="crocs">Crocs</option>
          </select>

          {/* Marca */}
          <label className="block font-semibold mb-1">Marca</label>
          <select
            className="w-full p-2 border mb-4"
            value={filters.brand}
            onChange={(e) => dispatch({ type: "SET_BRAND", payload: e.target.value })}
          >
            <option value="">Todas</option>
            <option value="nike">Nike</option>
            <option value="adidas">Adidas</option>
          </select>

          {/* Rango de Precios */}
          <label className="block font-semibold mb-1">Precio</label>
          <input
            type="range"
            min="0"
            max="1000"
            value={filters.priceRange[1]}
            onChange={(e) =>
              dispatch({ type: "SET_PRICE_RANGE", payload: [0, Number(e.target.value)] })
            }
            className="w-full mb-2"
          />
          <p className="text-sm">Máximo: ${filters.priceRange[1]}</p>

          {/* Descuento */}
          <label className="flex items-center font-semibold">
            <input
              type="checkbox"
              checked={filters.hasDiscount}
              onChange={() => dispatch({ type: "TOGGLE_DISCOUNT" })}
              className="mr-2"
            />
            Solo productos con descuento
          </label>

          {/* Ordenar */}
          <h1 className="text-xl font-bold mt-6 mb-2">Ordenar por</h1>
          <select
            className="w-full p-2 border mb-4"
            value={filters.sortOption}
            onChange={(e) => dispatch({ type: "SET_SORT", payload: e.target.value })}
          >
            <option value="">Ninguno</option>
            <option value="name-asc">Nombre (A-Z)</option>
            <option value="name-desc">Nombre (Z-A)</option>
            <option value="price-asc">Precio (Menor a Mayor)</option>
            <option value="price-desc">Precio (Mayor a Menor)</option>
          </select>
        </div>
      </div>
    </div>
  );
}



