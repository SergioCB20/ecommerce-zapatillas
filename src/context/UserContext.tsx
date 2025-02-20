"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

// Define la interfaz para el contexto
interface UserContextType {
  user: { name: string; role: string } | null;
  loading: boolean;
  setIsRegistering: (value: boolean) => void;
}

// Crea el contexto
const UserContext = createContext<UserContextType>({
  user: null,
  loading: true,
  setIsRegistering: () => {},
});

// Hook personalizado para usar el contexto
export const useUser = () => {
  return useContext(UserContext);
};

// Función para obtener datos del usuario desde Firestore
const fetchUserData = async (user: User) => {
  const userDoc = await getDoc(doc(db, "users", user.uid));
  if (userDoc.exists()) {
    return userDoc.data() as { name: string; role: string };
  }
  return { name: user.displayName || "Usuario", role: "customer" };
};

// Proveedor del contexto
export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    // Escucha cambios en la autenticación de Firebase
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userData = await fetchUserData(currentUser);
          setUser(userData);
        } catch (error) {
          console.error("Error obteniendo datos del usuario:", error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [isRegistering]);

  return (
    <UserContext.Provider value={{ user, loading, setIsRegistering }}>
      {children}
    </UserContext.Provider>
  );
};
