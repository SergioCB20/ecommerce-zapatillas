"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { sneakers } from "@/data/data";
import Image from "next/image";
import { CartItem } from "@/types/types";

export default function ProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const product = sneakers.find((value) => value.id === id);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");

  if (!product) {
    router.push("/");
    return null;
  }

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItemIndex = cart.findIndex((item: CartItem) => item.id === product.id);

    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      const item: CartItem = {
        ...product,
        quantity: quantity,
      };
      cart.push(item);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setMessage(`${product.name} ha sido añadido al carrito.`);
  };

  const originalPrice = product.discountPorcentage 
    ? (product.price / (1 - product.discountPorcentage / 100)).toFixed(2) 
    : product.price.toFixed(2);

  return (
    <div className="w-full h-auto md:h-[80vh] rounded-xl mt-10 md:mt-7 flex flex-col md:flex-row justify-between items-center border bg-white p-4 md:p-0">
      <div className="w-full md:w-[55%] h-[55%] md:h-[85%] flex mb-4 md:mb-0">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={256}
          height={400}
          className="m-auto w-[75%] max-h-full"
        />
      </div>
      <div className="w-full md:w-[45%] h-full flex flex-col items-center gap-3">
        <h1 className="w-full text-2xl md:text-5xl text-center pt-5">{product.name}</h1>
        <p className="w-full text-center text-sm text-gray-400 mb-4 md:mb-16 hover:text-black hover:font-bold hover:cursor-pointer">
          {product.brand}
        </p>
        <div className="flex flex-col gap-6 md:gap-12 items-center">
          {product.hasDiscount ? (
            <div className="flex items-center gap-2">
              <p className="text-lg text-gray-400 line-through">${originalPrice}</p>
              <p className="text-3xl md:text-5xl font-bold text-red-500">${product.price.toFixed(2)}</p>
              <div className="text-white bg-red-700 rounded-full px-2 py-1 font-bold hover:cursor-pointer hover:text-yellow-400">
                -{product.discountPorcentage}%
              </div>
            </div>
          ) : (
            <p className="w-full text-center text-3xl md:text-5xl font-bold">${product.price.toFixed(2)}</p>
          )}
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 items-center">
            <label htmlFor="quantity" className="text-lg">
              Cantidad
            </label>
            <input
              id="quantity"
              type="number"
              min={1}
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border-2 rounded-lg w-[50px] text-center"
            />
            <p className="text-sm text-gray-400 w-full">
              Cantidad de pares disponible: {product.stock} unidades
            </p>
          </div>
          <button
            className="primary-button mx-auto text-xl md:text-3xl px-5 py-2"
            onClick={handleAddToCart}
            disabled={quantity > product.stock}
          >
            Añadir al carrito
          </button>
          {message && (
            <p className="text-center text-green-500 mt-4">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}

