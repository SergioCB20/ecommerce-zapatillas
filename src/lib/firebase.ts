import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Importar Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCj1dTkrLypFAmf9f9jIYJf8z-ig-aygUQ",
  authDomain: "ecommerce-zapatillas-main.firebaseapp.com",
  projectId: "ecommerce-zapatillas-main",
  storageBucket: "ecommerce-zapatillas-main.firebasestorage.app",
  messagingSenderId: "714037179397",
  appId: "1:714037179397:web:caa5132a87f0d2be8b986c"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

