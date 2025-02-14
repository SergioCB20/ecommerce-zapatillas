"use client"; // Asegura que useRouter y useEffect funcionen

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Logo from "../../../../public/Sneakers-Logo.png"
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState<User | null>(null); // ✅ Se especifica el tipo User | null
  const [loading, setLoading] = useState(true); // Nuevo estado para manejar la carga
  const router = useRouter();

  useEffect(() => {
    // Detectar si hay un usuario autenticado
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Usuario autenticado:", user); // ✅ Debugging
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Limpiar error anterior

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Usuario después del login:", auth.currentUser); // ✅ Debugging
      router.push("/dashboard"); // Redirigir después del login exitoso
    } catch (err: any) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Cargando...</p>;
  }

  return (
    <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm flex-col items-center">
        <Image src={Logo} alt="Logo" width={200} height={300} className="mx-auto pe-5"/>
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="correo@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="*********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>

        {/* Enlace para recuperar contraseña */}
        <p className="mt-4 text-center">
          <Link href="/auth/password" className="text-indigo-600 hover:text-indigo-500">
            Forgot your password?
          </Link>
        </p>

        {/* Enlace para registrarse */}
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-indigo-600 hover:text-indigo-500">
            Register here
          </Link>
        </p>

        {/* ✅ Solo mostrar los enlaces si el usuario está autenticado */}
        {user && (
          <>
            <p className="mt-4 text-center">
              <Link href="/products" className="text-indigo-600 hover:text-indigo-500">
                Ver Productos
              </Link>
            </p>
            <p className="mt-4 text-center">
              <Link href="/cart" className="text-indigo-600 hover:text-indigo-500">
                Ir al Carrito
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}


