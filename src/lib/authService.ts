import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile, 
  signOut, 
  User 
} from "firebase/auth";
import { auth, db } from "./firebase"; 
import { doc, setDoc, getDoc } from "firebase/firestore";

/**
 * Registra un nuevo usuario en Firebase Authentication y lo guarda en Firestore.
 */
export const registerUser = async (
  email: string,
  password: string,
  username: string
): Promise<User> => {
  try {
    // Crea el usuario en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user) throw new Error("No se pudo registrar el usuario.");

    // Actualiza el displayName del usuario
    await updateProfile(user, { displayName: username }).catch((err) => {
      console.warn("No se pudo actualizar el nombre de usuario:", err.message);
    });

    // Guarda el usuario en Firestore con el rol "customer"
    await setDoc(doc(db, "users", user.uid), {
      name: username,
      email: user.email,
      role: "customer", // Todos los nuevos usuarios son clientes por defecto
      createdAt: new Date(),
    });

    console.log("Usuario registrado y guardado en Firestore:", user);
    return user;
  } catch (error: any) {
    console.error("Error al registrar:", error.message);
    throw new Error(error.message || "Error al registrar el usuario.");
  }
};

/**
 * Inicia sesión con email y contraseña, y obtiene los datos del usuario desde Firestore.
 */
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    if (!user) throw new Error("No se pudo iniciar sesión.");

    // Obtener datos del usuario desde Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));
    const userData = userDoc.exists() ? userDoc.data() : null;

    console.log("Inicio de sesión exitoso:", { ...user, ...userData });
    return { ...user, ...userData }; // Retorna los datos combinados de Auth y Firestore
  } catch (error: any) {
    console.error("Error al iniciar sesión:", error.message);
    throw new Error(error.message || "Error al iniciar sesión.");
  }
};

/**
 * Cierra sesión del usuario actual.
 */
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("Cierre de sesión exitoso");
  } catch (error: any) {
    console.error("Error al cerrar sesión:", error.message);
    throw new Error(error.message || "Error al cerrar sesión.");
  }
};
