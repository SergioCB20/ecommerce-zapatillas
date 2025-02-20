import Image from "next/image";
import { getProductById } from "@/lib/productsService";
import { DiscountButton } from "./DiscountButton";

export default async function ProductDetail({ id }: { id: string }) {
  const product = await getProductById(id);

  if (!product) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <h1 className="text-4xl font-bold italic text-gray-600">
          PRODUCT NOT FOUND
        </h1>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto flex gap-8 p-6 bg-white rounded-lg shadow-md">
      <div className="w-[50%] h-full flex justify-center items-center">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={400}
          height={600}
          className="w-full h-auto object-contain rounded-lg border border-gray-200"
        />
      </div>
      <div className="w-[50%] h-full pt-5 px-3">
        <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
        <div className="flex items-center gap-2 mt-4">
          {product.hasDiscount && product.discountPorcentage ? (
            <div className="flex gap-2">
              <h2 className="line-through text-gray-500">
                ${product.price.toFixed(2)}
              </h2>
              <h2 className="text-xl text-red-600 font-semibold">
                $
                {(
                  product.price -
                  product.price * (product.discountPorcentage / 100)
                ).toFixed(2)}
              </h2>
              <DiscountButton
                originalPrice={product.price}
                discountPercentage={product.discountPorcentage ?? 0}
                onApply={(newPrice) =>
                  console.log(`Nuevo precio aplicado: $${newPrice}`)
                }
              />
            </div>
          ) : (
            <h2 className="text-xl font-semibold">
              ${product.price.toFixed(2)}
            </h2>
          )}
        </div>
        <div className="mt-6 flex items-center gap-4">
          <label htmlFor="quantity" className="text-gray-700 font-medium">
            Cantidad:
          </label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            min="1"
            max={product.stock}
            onChange={handleQuantityChange}
            className="border border-gray-300 p-2 rounded w-20 text-center"
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Stock disponible: {product.stock}
        </p>
        <button
          onClick={handleAddToCart}
          className="mt-6 bg-blue-500 hover:bg-blue-600 transition-colors text-white py-2 px-6 rounded-lg font-medium"
        >
          Agregar al carrito
        </button>
        {message && <div className="mt-4">{message}</div>}
      </div>
    </div>
  );
}
