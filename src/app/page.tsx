import { getRandomProducts } from "@/lib/productsService";
import Image from "next/image";
import Link from "next/link";
import HeroImage from "@/../public/Hero_Home.jpg"
import ProductListWithSuspense from "@/components/ProductListWithSuspense";

export default function Home() {
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
          <div className="relative max-w-[80%] flex flex-col items-center gap-5 bg-black bg-opacity-50 p-8 rounded-lg magical-bg">
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

      <section className="p-6">
        <h3 className="text-xl font-semibold text-text mb-4">¡Productos que te van a encantar!</h3>
        <ProductListWithSuspense fetchProducts={getRandomProducts} />
      </section>
    </div>
  );
}
