"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase"; // Importa Firebase Auth

// Define la interfaz para el contexto
interface UserContextType {
  user: { name: string; role: string } | null;
  loading: boolean;
  setIsRegistering: (value: boolean) => void; // Agregamos una función para controlar el estado de registro
}

// Crea el contexto
const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  setIsRegistering: () => {}, // Función vacía por defecto
});

// Hook personalizado para usar el contexto
export const useUser = () => {
  return useContext(UserContext);
};

// Proveedor del contexto
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false); // Indicador para saber si el usuario está registrándose

  useEffect(() => {
    // Escucha cambios en la autenticación de Firebase
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const email = currentUser.email || "";
        const role = email.endsWith("@admin.com") ? "admin" : "customer";

        if (!isRegistering) {
          console.log("Usuario autenticado:", currentUser);
          setUser({ name: currentUser.displayName || "Usuario", role });
        }
      } else {
        setUser(null); 
      }
      setLoading(false);
    });

    // Limpia el listener cuando el componente se desmonta
    return () => unsubscribe();
  }, [isRegistering]); // Agregamos isRegistering como dependencia

  return (
    <UserContext.Provider value={{ user, loading, setIsRegistering }}>
      {children}
    </UserContext.Provider>
  );
};