import React, { useState } from "react";
import { db, storage } from "../firebaseConfig"; // Asegúrate de importar correctamente Firebase
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function PackageForm() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [images, setImages] = useState([]);
  
  // Manejar cambios en los inputs
  const handleInputChange = (setter) => (e) => setter(e.target.value);

  // Manejar la selección de imágenes
  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  // Subir imágenes a Firebase Storage
  const uploadImages = async () => {
    const urls = await Promise.all(
      images.map(async (image) => {
        const imageRef = ref(storage, `tours/${image.name}`);
        await uploadBytes(imageRef, image);
        return getDownloadURL(imageRef);
      })
    );
    return urls;
  };

  // Guardar paquete en Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageUrls = await uploadImages();
      await addDoc(collection(db, "tours"), {
        title,
        price,
        description,
        duration,
        images: imageUrls,
      });
      alert("Paquete guardado exitosamente");
      setTitle("");
      setPrice("");
      setDescription("");
      setDuration("");
      setImages([]);
    } catch (error) {
      console.error("Error al guardar el paquete:", error);
      alert("Hubo un error al guardar el paquete");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-md">
      <label className="block mb-2">Título</label>
      <input type="text" value={title} onChange={handleInputChange(setTitle)} className="w-full p-2 border rounded" required />
      
      <label className="block mt-4 mb-2">Precio</label>
      <input type="number" value={price} onChange={handleInputChange(setPrice)} className="w-full p-2 border rounded" required />
      
      <label className="block mt-4 mb-2">Descripción</label>
      <textarea value={description} onChange={handleInputChange(setDescription)} className="w-full p-2 border rounded" required />
      
      <label className="block mt-4 mb-2">Duración</label>
      <input type="text" value={duration} onChange={handleInputChange(setDuration)} className="w-full p-2 border rounded" required />
      
      <label className="block mt-4 mb-2">Imágenes</label>
      <input type="file" multiple onChange={handleImageChange} className="w-full p-2 border rounded" />
      
      <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">Guardar Paquete</button>
    </form>
  );
}
