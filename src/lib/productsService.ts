import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product } from "@/types/types";
import { deleteImage } from "./storageService";

export const createProduct = async (product: Omit<Product, "id">) => {
  try {
    const productsCollection = collection(db, "products");

    // Obtener la cantidad de productos actuales
    const querySnapshot = await getDocs(productsCollection);
    const newProductId = (querySnapshot.size + 1).toString(); // Convertir a string

    // Crear referencia con el nuevo ID
    const productDocRef = doc(productsCollection, newProductId);

    // Guardar el producto con el ID asignado
    const productWithId = { ...product, id: newProductId };
    await setDoc(productDocRef, productWithId);

    return newProductId;
  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw new Error("No se pudo crear el producto.");
  }
};

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const productsCollection = collection(db, "products");
    const querySnapshot = await getDocs(productsCollection);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw new Error("No se pudo obtener la lista de productos.");
  }
};

export const getProductById = async (
  productId: string
): Promise<Product | null> => {
  try {
    const productDocRef = doc(db, "products", productId);
    const docSnapshot = await getDoc(productDocRef);
    return docSnapshot.exists()
      ? ({ id: docSnapshot.id, ...docSnapshot.data() } as Product)
      : null;
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    throw new Error("No se pudo obtener el producto.");
  }
};

export const getRandomProducts = async (count: number = 6): Promise<Product[]> => {
  try {
    const productsCollection = collection(db, "products");
    const querySnapshot = await getDocs(productsCollection);
    const allProducts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];

    if (allProducts.length === 0) return [];

    // Barajar los productos aleatoriamente y tomar hasta "count"
    const shuffled = allProducts.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  } catch (error) {
    console.error("Error al obtener productos aleatorios:", error);
    throw new Error("No se pudieron obtener productos aleatorios.");
  }
};

export const updateProduct = async (
  productId: string,
  updatedData: Partial<Product>
) => {
  try {
    const productDocRef = doc(db, "products", productId);
    const docSnapshot = await getDoc(productDocRef);

    if (docSnapshot.exists()) {
      const currentImageUrl = docSnapshot.get("imageUrl");
      if (currentImageUrl && currentImageUrl !== updatedData.imageUrl) {
        await deleteImage(currentImageUrl);
      }
      await updateDoc(productDocRef, updatedData);
    } else {
      throw new Error("El producto no existe.");
    }
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    throw new Error("No se pudo actualizar el producto.");
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const productDocRef = doc(db, "products", productId);
    const docSnapshot = await getDoc(productDocRef);

    if (docSnapshot.exists()) {
      const imageUrl = docSnapshot.get("imageUrl");
      if (imageUrl) {
        await deleteImage(imageUrl);
      }
      await deleteDoc(productDocRef);
    } else {
      throw new Error("El producto no existe.");
    }
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw new Error("No se pudo eliminar el producto.");
  }
};
