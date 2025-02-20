"use client";
import React, { useEffect, useState, useMemo, useReducer } from "react";
import { getAllProducts } from "@/lib/productsService";
import { Product } from "@/types/types";
import { useSearchParams } from "next/navigation";
import { FunnelIcon } from "@heroicons/react/24/solid";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/Skeletons/ProductCard";

const initialFilters: FiltersState = {
  category: "",
  brand: "",
  priceRange: [0, 1000],
  hasDiscount: false,
  sortOption: "name-asc",
};

interface FiltersState {
  category: string;
  brand: string;
  priceRange: [number, number];
  hasDiscount: boolean;
  sortOption:
    | "name-asc"
    | "name-desc"
    | "price-asc"
    | "price-desc"
    | "discount-asc"
    | "discount-desc";
}

interface FiltersAction {
  type: string;
  payload?: any;
}

const filtersReducer = (
  state: FiltersState,
  action: FiltersAction
): FiltersState => {
  switch (action.type) {
    case "SET_FILTER":
      return { ...state, [action.payload.key]: action.payload.value };
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
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [openFilterSideBar, setOpenFilterSideBar] = useState(false);
  const [filters, dispatch] = useReducer(filtersReducer, initialFilters);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [maxPrice, setMaxPrice] = useState(1000); // Valor por defecto

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const fetchedProducts = await getAllProducts();
      console.log(fetchedProducts)
      setProducts(fetchedProducts);
  
      const uniqueCategories = Array.from(new Set(fetchedProducts.map(p => p.category)));
      const uniqueBrands = Array.from(new Set(fetchedProducts.map(p => p.brand)));
  
      setCategories(uniqueCategories);
      setBrands(uniqueBrands);
  
      // Solo establecer maxPrice una vez al cargar productos
      if (fetchedProducts.length > 0) {
        const calculatedMaxPrice = Math.max(
          ...fetchedProducts.map((p) => p.price - ((p.discountPorcentage ?? 0) * p.price) / 100)
        );
        
        setMaxPrice(calculatedMaxPrice);
      }
  
      setLoading(false);
    };
  
    fetchProducts();
  }, []);
  

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        return (
          product.name.toLowerCase().includes(query.toLowerCase()) &&
          (!filters.category || product.category === filters.category || filters.category === "Todas") &&
          (!filters.brand || product.brand === filters.brand || filters.brand === "Todas") &&
          product.price - ((product.discountPorcentage ?? 0) * product.price) / 100 >= filters.priceRange[0] &&
          product.price - ((product.discountPorcentage ?? 0) * product.price) / 100 <= filters.priceRange[1] &&
          (!filters.hasDiscount || product.hasDiscount)
        );
      })
      .sort((a, b) => {
        const sorting = {
          "name-asc": () => a.name.localeCompare(b.name),
          "name-desc": () => b.name.localeCompare(a.name),
          "price-asc": () => a.price - b.price,
          "price-desc": () => b.price - a.price,
          "discount-asc": () =>
            (a.discountPorcentage ?? 0) - (b.discountPorcentage ?? 0),
          "discount-desc": () =>
            (b.discountPorcentage ?? 0) - (a.discountPorcentage ?? 0),
        };
        return sorting[filters.sortOption]() || 0;
      });
  }, [products, query, filters]);

  return (
    <div className="w-full min-h-screen bg-background px-4 py-5 mt-14 md:mt-7">
      <Header query={query} setOpenFilterSideBar={setOpenFilterSideBar} />
      <ProductList loading={loading} products={filteredProducts} />
      <FilterSidebar
        open={openFilterSideBar}
        setOpen={setOpenFilterSideBar}
        filters={filters}
        dispatch={dispatch}
        categories={categories}
        brands={brands}
        loading={loading}
        maxPrice={maxPrice}
      />
    </div>
  );
}


const Header = ({
  query,
  setOpenFilterSideBar,
}: {
  query: string;
  setOpenFilterSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}) => (
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-xl md:text-3xl font-bold italic">
      {query
        ? `Resultado de: "${query.toUpperCase()}"`
        : "¡Explora nuestros productos!"}
    </h1>
    <button
      className="flex items-center gap-2 px-4 py-2 border border-black hover:bg-gray-200 transition"
      onClick={() => setOpenFilterSideBar(true)}
    >
      <FunnelIcon className="h-6 w-6 text-gray-700" />
      <span className="font-bold hidden md:block">Filtrar y Ordenar</span>
    </button>
  </div>
);

const ProductList = ({
  loading,
  products,
}: {
  loading: boolean;
  products: Product[];
}) => (
  <div className="grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {loading ? (
      Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)
    ) : products.length > 0 ? (
      products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))
    ) : (
      <p className="text-center col-span-full text-gray-600">
        No se encontraron productos.
      </p>
    )}
  </div>
);

const FilterSidebar = ({
  open,
  setOpen,
  filters,
  dispatch,
  categories,
  brands,
  loading,
  maxPrice
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filters: FiltersState;
  dispatch: React.Dispatch<FiltersAction>;
  categories: string[];
  brands: string[];
  loading: boolean;
  maxPrice: number;
}) => (
  <div
    className={`fixed inset-0 bg-black bg-opacity-50 flex justify-end transition-all ${
      open ? "opacity-100" : "opacity-0 pointer-events-none"
    }`}
  >
    <div
      className={`bg-white h-full pt-24 p-6 transition-all duration-300 w-full md:w-96 ${
        open ? "opacity-100" : "opacity-0"
      }`}
    >
      <button
        className="text-red-500 font-bold mb-4"
        onClick={() => setOpen(false)}
      >
        Cerrar
      </button>
      <h1 className="text-xl font-bold mb-4">Filtros</h1>

      {/* Mostrar loading en los selects si aún no han cargado */}
      {loading ? (
        <p className="text-gray-500">Cargando filtros...</p>
      ) : (
        <>
          <FilterSelect
            label="Categoría"
            value={filters.category}
            onChange={(value) =>
              dispatch({ type: "SET_FILTER", payload: { key: "category", value } })
            }
            options={["Todas", ...categories].reduce((acc, category) => {
              acc[category] = category;
              return acc;
            }, {} as { [key: string]: string })}
          />
          <FilterSelect
            label="Marca"
            value={filters.brand}
            onChange={(value) =>
              dispatch({ type: "SET_FILTER", payload: { key: "brand", value } })
            }
            options={["Todas", ...brands].reduce((acc, brand) => {
              acc[brand] = brand;
              return acc;
            }, {} as { [key: string]: string })}
          />
          <FilterPriceRange
        value={filters.priceRange}
        onChange={(value) =>
          dispatch({
            type: "SET_FILTER",
            payload: { key: "priceRange", value },
          })
        }
        maxPrice={maxPrice}
      />
      <FilterCheckbox
        label="Solo productos con descuento"
        checked={filters.hasDiscount}
        onChange={() =>
          dispatch({
            type: "SET_FILTER",
            payload: { key: "hasDiscount", value: !filters.hasDiscount },
          })
        }
      />
        </>
      )}

    </div>
  </div>
);


const FilterSelect = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { [key: string]: string };
}) => (
  <div>
    <label className="block font-semibold mb-1">{label}</label>
    <select
      className="w-full p-2 border mb-4"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {Object.entries(options).map(([key, text]) => (
        <option key={key} value={key}>
          {text}
        </option>
      ))}
    </select>
  </div>
);

const FilterPriceRange = ({
  value,
  onChange,
  maxPrice = 500, // Se asegura que siempre tenga un valor
}: {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  maxPrice?: number;
}) => {
  const [sliderValue, setSliderValue] = useState(value[1]);

  useEffect(() => {
    // Sincroniza el slider cuando `maxPrice` cambia o si `value` cambia desde fuera
    setSliderValue(Math.min(value[1], maxPrice));
  }, [value, maxPrice]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setSliderValue(newValue);
    onChange([0, newValue]);
  };

  return (
    <div>
      <label className="block font-semibold mb-1">Precio</label>
      <input
        type="range"
        min="0"
        max={maxPrice.toString()}
        value={sliderValue}
        onChange={handleChange}
        className="w-full mb-2"
      />
      <p className="text-sm">Máximo: ${sliderValue}</p>
    </div>
  );
};


const FilterCheckbox = ({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) => (
  <label className="flex items-center font-semibold">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="mr-2"
    />
    {label}
  </label>
);
