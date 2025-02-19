import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase"; // Importa Firestore
import { Product } from "@/types/types";
import { deleteImage } from "./storageService";

export const createProduct = async (product: Omit<Product, "id">) => {
  try {
    const productsCollection = collection(db, "products"); // Referencia a la colección "products"
    const docRef = await addDoc(productsCollection, product);
    const productId = docRef.id;
    await updateDoc(docRef, { id: productId });
    console.log("Producto creado con ID:", docRef.id);
    return docRef.id; // Retorna el ID del nuevo producto
  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw new Error("Error al crear el producto.");
  }
};

export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const productsCollection = collection(db, "products");
    const querySnapshot = await getDocs(productsCollection); // Obtiene todos los documentos
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      const product = { ...doc.data() } as Product;
      products.push(product);
    });
    return products;
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    throw new Error("Error al obtener los productos.");
  }
};

export const getProductById = async (
  productId: string
): Promise<Product | null> => {
  try {
    const productDocRef = doc(db, "products", productId); // Referencia al documento
    const docSnapshot = await getDoc(productDocRef); // Obtiene el documento
    if (docSnapshot.exists()) {
      const product = { ...docSnapshot.data() } as Product;
      return product;
    } else {
      console.log("Producto no encontrado.");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    throw new Error("Error al obtener el producto.");
  }
};

export const updateProduct = async (
  productId: string,
  updatedData: Partial<Product>
) => {
  try {
    const productDocRef = doc(db, "products", productId);
    const product = await getProductById(productId); 
    if (product?.imageUrl && product.imageUrl !== updatedData.imageUrl) {
      await deleteImage(product.imageUrl);
    }
    await updateDoc(productDocRef, updatedData);
    console.log("Producto actualizado con éxito.");
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    throw new Error("Error al actualizar el producto.");
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    console.log(productId)
    const productDocRef = doc(db, "products", productId); // Referencia al documento
    const product = await getProductById(productId); // Obtiene el producto
    if (product?.imageUrl) {
      await deleteImage(product.imageUrl);
    }
    await deleteDoc(productDocRef); // Elimina el documento
    console.log("Producto eliminado con éxito.");
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw new Error("Error al eliminar el producto.");
  }
};
