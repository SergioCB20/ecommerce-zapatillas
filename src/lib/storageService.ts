import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "./firebase";

export const uploadImageToStorage = async (file: File): Promise<string> => {
  try {
    const storageRef = ref(storage, `product-images/${file.name}`); 
    await uploadBytes(storageRef, file);
    console.log("Imagen subida exitosamente.");

    const downloadURL = await getDownloadURL(storageRef);
    console.log("URL de la imagen:", downloadURL);

    return downloadURL;
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    throw new Error("Ocurrió un error al subir la imagen.");
  }
};

export const deleteImage = async (imageUrl: string) => {
  try {
    const storageRef = ref(storage, imageUrl);
    await deleteObject(storageRef);
    console.log("Imagen eliminada exitosamente.");
  } catch (error) {
    console.error("Error al eliminar la imagen:", error);
    throw new Error("Ocurrió un error al eliminar la imagen.");
  }
};