"use client";
import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"; // Ícono de lupa de Heroicons
import Dropdown from "./Dropdown"; // Importamos el componente Dropdown
import { useRouter } from "next/navigation";
import { UserCircleIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import Logo from "../../public/Sneakers-Logo.png";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState(""); // Estado para almacenar el texto de búsqueda
  const router = useRouter();
  const { user } = useUser();

  // Función para manejar el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?query=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  interface DropdownOption {
    label: string;
    href: string;
  }
  
  let dropdownOptions: DropdownOption[] = [];

  if (!user) {
    dropdownOptions = [
      { label: "Regístrate", href: "/auth/register" },
      { label: "Inicia sesión", href: "/auth/login" },
    ];
  } else if (user.role === "customer") {
    dropdownOptions = [{ label: "Cerrar sesión", href: "/auth/logout" }];
  } else if (user.role === "admin") {
    dropdownOptions = [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Cerrar sesión", href: "/auth/logout" },
    ];
  }

  return (
    <nav className="fixed top-0 z-40 w-full bg-primary text-white p-4 flex justify-between items-center md:flex-row flex-col text-center">
      {/* Logo */}
      <Link href={"/"}>
        <Image src={Logo} alt="Logo" width={100} height={200} />
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
            className="bg-transparent border-b border-borderColor focus:outline-none text-textMuted placeholder-textMuted ps-2 pe-10 py-1 transition duration-300"
          />
          <button type="submit" className="absolute right-4">
            <MagnifyingGlassIcon className="w-5 h-5 text-textMuted" />
          </button>
        </form>
        <Link href={"/cart"}>
          <ShoppingCartIcon className="w-5 h-5 hover:cursor-pointer hover:text-gray-300 hover-default" />
        </Link>
        {/* Dropdown para Registro e Inicio de Sesión */}
        <Dropdown
          icon={<UserCircleIcon className="w-5 h-5 text-white ms-2 hover:text-gray-300 hover-default" />}
          label={user ? user.name : ""}
          options={dropdownOptions}
        />
      </div>
    </nav>
  );
}