"use client";
import React, { useState } from "react";
import { registerUser } from "../../../lib/authService"; // Importa la función de registro
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"; // Iconos de Heroicons
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(""); // Nuevo estado para el nombre de usuario
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const {setIsRegistering} = useUser(); // Usa la función setIsRegistering del contexto
  const router = useRouter();

  // Validación del nombre de usuario: Solo letras, números y guion bajo
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9_]*$/; // Regex para permitir solo letras, números y guion bajo
    if (regex.test(value)) {
      setUsername(value);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Registra al usuario con Firebase Authentication
      setIsRegistering(true);
      await registerUser(email, password, username);
      setIsRegistering(false);
      setSuccess(true);
      setError("");
      router.push("/");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">
          Registro
        </h1>
        <form onSubmit={handleRegister}>
          {/* Campo de nombre de usuario */}
          <div className="mb-4">
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange} // Validación en tiempo real
              placeholder="Nombre de usuario (Alfanumérico)"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          {/* Campo de correo electrónico */}
          <div className="mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          {/* Campo de contraseña */}
          <div className="relative mb-6">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 hover:text-gray-800"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
          {/* Botón de registro */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Registrarse
          </button>
        </form>
        {/* Mensajes de error o éxito */}
        {error && (
          <p className="mt-4 text-red-500 text-sm text-center">{error}</p>
        )}
        {success && (
          <p className="mt-4 text-green-500 text-sm text-center">
            ¡Registro exitoso!
          </p>
        )}
      </div>
    </div>
  );
}