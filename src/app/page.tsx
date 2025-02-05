import { sneakers } from "@/data/data";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    <div className="w-full h-full">
      {/* Banner */}
      <section className="p-6 flex justify-center">
        <div className="bg-white shadow-card rounded-xl p-6 max-w-4xl text-center w-full hover:cursor-pointer">
          <Image
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Nike Air Max"
            width={256}
            height={200}
            className="mx-auto object-cover rounded-lg"
          />
          <h2 className="text-3xl font-bold text-text mt-4">Air Max Plus</h2>
          <p className="text-textMuted">
            El Nike Air Max combina estilo retro con tecnología moderna.
          </p>
          <button className="mt-4 bg-primary text-white px-4 py-2 rounded-xl shadow-button transition hover:bg-primaryHover hover-default">
            Comprar
          </button>
        </div>
      </section>

      {/* Categorías */}
      <section className="p-6">
        <h3 className="text-xl font-semibold text-text mb-4">Categorías</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {["Descuentos", "Sneakers", "Sandalias", "Crocs", "Pantuflas"].map(
            (cat) => (
              <div
                key={cat}
                className="bg-secondary p-4 rounded-xl text-center text-text hover:cursor-pointer hover-default"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {sneakers.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </section>
    </div>
  );
}
