import { useState, useEffect } from 'react'; // Importa los hooks useState y useEffect de React
import { auth } from './config'; // Importa la configuración de autenticación de Firebase
import { onAuthStateChanged } from 'firebase/auth'; // Importa la función onAuthStateChanged de Firebase Authentication

export const useAuth = () => {
  const [user, setUser] = useState(null); // Estado local para almacenar la información del usuario

  useEffect(() => {
    // Configura un observador para el estado de autenticación del usuario
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user); // Actualiza el estado `user` con la información del usuario
    });

    // Limpia el observador cuando el componente se desmonta
    return () => unsubscribe();
  }, []); // El array vacío [] significa que el efecto solo se ejecutará una vez después del primer renderizado

  // Devuelve un objeto con la propiedad `user`
  return { user };
};

export async function savePurchase(passengers, totalAdults, totalChildren) {
  const auth = getAuth(); // Asegúrate que auth esté inicializado desde el mismo app
  const user = auth.currentUser;

  if (!user) {
    throw new Error("El usuario no está autenticado");
  }

  const data = {
    userId: user.uid,
    adults: passengers.slice(0, totalAdults),
    children: passengers.slice(totalAdults),
    createdAt: new Date(),
  };

  try {
    const docRef = await addDoc(collection(db, "purchases"), data);
    return docRef.id;
  } catch (error) {
    console.error("Error guardando la compra:", error);
    throw error;
  }
}
