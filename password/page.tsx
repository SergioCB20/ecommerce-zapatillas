"use client";

import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function PasswordResetPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Se ha enviado un enlace a tu correo para restablecer la contraseña.");
    } catch (err: any) {
      setError("Error al enviar el correo. Verifica la dirección.");
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Recuperar contraseña
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleResetPassword}>
          <div>
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="correo@gmail.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {message && <p className="text-green-500 text-sm">{message}</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Enviar enlace
            </button>
          </div>
        </form>
        <p className="mt-4 text-center">
          <Link href="/auth/login" className="text-indigo-600 hover:text-indigo-500">
            Volver al inicio de sesión
          </Link>
        </p>
        <p className="mt-4 text-center">
          <Link href="/password" className="text-indigo-600 hover:text-indigo-500">
            ¿Olvidaste tu contraseña?
          </Link>
        </p>
      </div>
    </div>
  );
}