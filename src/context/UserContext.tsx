"use client"
import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Importa Firebase Auth
import { loginUser as loginService, logout as logoutService } from "@/lib/authService"; // Importa los servicios de autenticación

// Define la interfaz para el contexto
interface UserContextType {
  user: { name: string; role: string } | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Crea el contexto
const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
});

// Hook personalizado para usar el contexto
export const useUser = () => {
  return useContext(UserContext);
};

// Proveedor del contexto
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Escucha cambios en la autenticación de Firebase
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const email = currentUser.email || "";
        const role = email.endsWith("@admin.com") ? "admin" : "customer";

        // Guarda el nombre y el rol del usuario
        setUser({ name: currentUser.displayName || "Usuario", role });
      } else {
        setUser(null); // No hay usuario autenticado
      }
      setLoading(false);
    });

    // Limpia el listener cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  // Función para iniciar sesión usando el servicio de autenticación
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await loginService(email, password);
      const role = email.endsWith("@admin.com") ? "admin" : "customer";
      setUser({ name: userCredential.displayName || "Usuario", role });
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error.message);
      throw new Error(error.message || "Error al iniciar sesión.");
    }
  };

  // Función para cerrar sesión usando el servicio de autenticación
  const logout = async () => {
    try {
      await logoutService();
      setUser(null); // Limpiar el estado del usuario
    } catch (error: any) {
      console.error("Error al cerrar sesión:", error.message);
      throw new Error(error.message || "Error al cerrar sesión.");
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};