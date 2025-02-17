// authServices.ts
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";
import { auth } from "./firebase";

// Función para registrar un nuevo usuario
export const registerUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    // Crea el usuario en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Actualiza el displayName del usuario
    if (user) {
      await updateProfile(user, { displayName: username });
    }

    console.log("Usuario registrado:", user);
    return user; // Retorna el usuario registrado
  } catch (error: any) {
    console.error("Error al registrar:", error.message);
    throw new Error(error.message || "Error al registrar el usuario.");
  }
};

// Función para iniciar sesión
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Inicio de sesión exitoso:", userCredential.user);
    return userCredential.user; // Retorna el usuario que inició sesión
  } catch (error: any) {
    console.error("Error al iniciar sesión:", error.message);
    throw new Error(error.message || "Error al iniciar sesión.");
  }
};

// Función para cerrar sesión
export const logout = async () => {
  try {
    await signOut(auth);
    console.log("Cierre de sesión exitoso");
  } catch (error: any) {
    console.error("Error al cerrar sesión:", error.message);
    throw new Error(error.message || "Error al cerrar sesión.");
  }
};