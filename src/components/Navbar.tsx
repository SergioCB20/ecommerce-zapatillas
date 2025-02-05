"use client";
import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"; // Ícono de lupa de Heroicons
import Dropdown from "./Dropdown"; // Importamos el componente Dropdown
import { useRouter } from "next/navigation";
import { UserIcon,ShoppingCartIcon } from '@heroicons/react/24/solid';
import Link from "next/link";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState(""); // Estado para almacenar el texto de búsqueda
  const router = useRouter();

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="fixed top-0 z-20 w-full bg-primary text-white p-4 flex justify-between items-center md:flex-row flex-col text-center">
      {/* Logo */}
      <Link href={"/"}>
        <h1 className="text-2xl font-bold">DEINSA SNEAKERS</h1>
      </Link>
      {/* Enlaces y Buscador */}
      <div className="space-x-4 mt-2 md:mt-0 flex flex-wrap justify-center items-center">
        {/* Buscador con ícono de lupa */}
        <form
          onSubmit={handleSubmit}
          className="relative bg-white flex items-center rounded-xl px-2 py-1"
        >
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Actualizar el estado con el valor del input
            className="bg-transparent border-b border-borderColor focus:outline-none text-textMuted placeholder-textMuted px-2 py-1 transition duration-300"
          />
          <button type="submit" className="absolute right-4">
            <MagnifyingGlassIcon className="w-5 h-5 text-textMuted" />
          </button>
        </form>
        <ShoppingCartIcon className="w-5 h-5 hover:cursor-pointer hover:text-gray-300 hover-default"/>
        {/* Dropdown para Registro e Inicio de Sesión */}
        <Dropdown
          icon={<UserIcon className="w-5 h-5 text-white ms-2 hover:text-gray-300 hover-default" />}
          label="sergio"
          options={[
            { label: "Regístrate", href: "/auth/register" },
            { label: "Inicia sesión", href: "/auth/login" },
          ]}
        />
      </div>
    </nav>
  );
}
