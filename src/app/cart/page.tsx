"use client";
import { CartItem } from "@/types/types";
import { useState, useEffect } from "react";
import { updateProduct } from "@/lib/productsService"; // Importar la función para actualizar productos

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
    calculateTotals(storedCart);
  }, []);

  const calculateTotals = (cart: CartItem[]) => {
    let total = 0;
    let discount = 0;
    let totalOriginalPrice = 0;

    cart.forEach((item) => {
      const originalItemPrice =
        item.hasDiscount && (item.discountPorcentage ?? 0) > 0
          ? item.price / (1 - (item.discountPorcentage ?? 0) / 100)
          : item.price;

      const itemDiscount =
        item.hasDiscount && (item.discountPorcentage ?? 0) > 0
          ? (originalItemPrice - item.price) * item.quantity
          : 0;

      total += item.price * item.quantity;
      discount += itemDiscount;
      totalOriginalPrice += originalItemPrice * item.quantity;
    });

    setTotalPrice(total);
    setTotalDiscount(discount);
    setOriginalPrice(totalOriginalPrice);
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: Number(quantity) } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotals(updatedCart);
  };

  const handleRemoveProduct = (id: string) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotals(updatedCart);
  };

  const handleCheckout = async () => {
    try {
      await Promise.all(
        cart.map(async (product) => {
          const newStock = product.stock - product.quantity;
          if (newStock >= 0) {
            await updateProduct(product.id, { stock: newStock });
          }
        })
      );

      alert("¡Compra realizada con éxito!");
      setCart([]);
      localStorage.removeItem("cart");
    } catch (error) {
      console.error("Error al actualizar el stock:", error);
      alert("Hubo un error al procesar la compra.");
    }
  };

  return (
    <div className="w-full bg-background p-5 mt-10 md:mt-7">
      <h1 className="font-bold italic text-4xl mb-5">Tu carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <div>
          {cart.map((product) => (
            <div
              key={product.id}
              className="flex justify-between items-center border p-3 mb-3"
            >
              <div className="w-1/4">
                <img src={product.imageUrl} alt={product.name} className="w-full" />
              </div>
              <div className="w-1/2">
                <h2 className="text-xl font-bold">{product.name}</h2>
                <p className="text-gray-500">{product.brand}</p>
                <p className="text-gray-500">
                  ${product.price.toFixed(2)} x {product.quantity}
                </p>
                {product.hasDiscount && (
                  <p className="text-red-500">
                    Descuento: {product.discountPorcentage}%
                  </p>
                )}
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={product.quantity}
                  onChange={(e) =>
                    handleQuantityChange(product.id, Number(e.target.value))
                  }
                  className="border p-1 w-20"
                />
                <button
                  onClick={() => handleRemoveProduct(product.id)}
                  className="text-red-500 ml-3"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <div className="border p-3 flex flex-col items-end">
            <h2 className="text-2xl font-bold">Resumen del Pedido</h2>
            <p>Precio Original: ${originalPrice.toFixed(2)}</p>
            <p className="text-gray-500">
              Descuento aplicado: ${totalDiscount.toFixed(2)}
            </p>
            <p>Total: ${totalPrice.toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              className="primary-button mt-3 px-3 py-1"
            >
              Comprar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
