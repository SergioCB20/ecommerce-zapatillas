"use client";
import Image from "next/image";
import { sneakers } from "@/data/data";
import { Product, CartItem } from "@/types/types";
import { useParams } from "next/navigation";
import { useState, ReactNode } from "react";
import { DiscountButton } from "@/components/DiscountButton";

export default function ProductPage() {
  const { id } = useParams();
  const product = sneakers.find((sneaker: Product) => sneaker.id === id);
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState<ReactNode>(null);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Math.max(
      1,
      Math.min(Number(e.target.value), product?.stock || 1)
    );
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (!product) return;
    // Obtener el carrito actual del localStorage
    const cart: CartItem[] = JSON.parse(localStorage.getItem("cart") || "[]");
    // Verificar si el producto ya está en el carrito
    const existingCartItemIndex = cart.findIndex(
      (item) => item.id === product.id
    );
    if (existingCartItemIndex !== -1) {
      // Si el producto ya está en el carrito, verificar que no supere el stock
      const existingCartItem = cart[existingCartItemIndex];
      const newTotalQuantity = existingCartItem.quantity + quantity;
      if (newTotalQuantity > product.stock) {
        setMessage(
          <span className="text-red-600 font-medium">
            No se puede agregar más. Stock insuficiente.
          </span>
        );
        setTimeout(() => setMessage(""), 3000); // Ocultar mensaje después de 3 segundos
        return;
      }
      // Actualizar la cantidad del producto existente
      cart[existingCartItemIndex].quantity = newTotalQuantity;
    } else {
      // Si el producto no está en el carrito, agregarlo
      if (quantity > product.stock) {
        setMessage(
          <span className="text-red-600 font-medium">
            No se puede agregar más. Stock insuficiente.
          </span>
        );
        setTimeout(() => setMessage(""), 3000); // Ocultar mensaje después de 3 segundos
        return;
      }
      const cartItem: CartItem = {
        ...product,
        quantity,
      };
      cart.push(cartItem);
    }
    // Guardar el carrito actualizado en localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    // Mostrar mensaje de confirmación
    setMessage(
      <span className="text-green-600 font-medium">
        ¡{quantity} {product.name} ha sido añadido al carrito!
      </span>
    );
    setTimeout(() => setMessage(""), 3000); // Ocultar mensaje después de 3 segundos
  };

  return (
    <div className="w-full min-h-screen flex items-center pt-6">
      {product ? (
        <div className="w-full max-w-7xl mx-auto flex gap-8 p-6 bg-white rounded-lg shadow-md">
          {/* Imagen del producto */}
          <div className="w-[50%] h-full flex justify-center items-center">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={400}
              height={600}
              className="w-full h-auto object-contain rounded-lg border border-gray-200"
            />
          </div>
          {/* Detalles del producto */}
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
                                onApply={(newPrice) => console.log(`Nuevo precio aplicado: $${newPrice}`)}
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
            {/* Stock restante */}
            <p className="mt-2 text-sm text-gray-500">
              Stock disponible: {product.stock}
            </p>
            <button
              onClick={handleAddToCart}
              className="mt-6 bg-blue-500 hover:bg-blue-600 transition-colors text-white py-2 px-6 rounded-lg font-medium"
            >
              Agregar al carrito
            </button>
            {/* Mensaje de confirmación o error */}
            {message && <div className="mt-4">{message}</div>}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <h1 className="text-4xl font-bold italic text-gray-600">
            PRODUCT NOT FOUND
          </h1>
        </div>
      )}
    </div>
  );
}