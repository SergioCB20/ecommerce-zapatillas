"use client";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";

export default function LogoutPage() {
  const router = useRouter();
  const { logout } = useUser();

  useEffect(() => {
    // Llama a la función logout del contexto
    const handleLogout = async () => {
      try {
        await logout();
        // Redirige al usuario a la página de inicio después de cerrar la sesión
        router.push("/");
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    };

    // Ejecuta la función de cierre de sesión cuando se carga la página
    handleLogout();
  }, [logout, router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p>Cerrando sesión...</p>
    </div>
  );
}