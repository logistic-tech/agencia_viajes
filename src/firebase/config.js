// Importa funciones de Firebase para inicializar la aplicación y manejar autenticación y Firestore
import { initializeApp } from "firebase/app"; // Importa la función para inicializar la aplicación de Firebase
import {
  getAuth,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup as firebaseSignInWithPopup,
} from "firebase/auth"; // Importa funciones y objetos para autenticación
import { getFirestore } from "firebase/firestore"; // Importa la función para obtener la instancia de Firestore
import { getStorage } from "firebase/storage";
// Configuración de Firebase con credenciales del proyecto
const firebaseConfig = {
  apiKey: "AIzaSyAWym2B86zKPX6b0RfEKPN4EM1oeYGsbIc", // Clave de la API de Firebase
  authDomain: "logistic-travels-tours-455ea.firebaseapp.com", // Dominio de autenticación
  projectId: "logistic-travels-tours-455ea", // ID del proyecto de Firebase
  storageBucket: "logistic-travels-tours-455ea.appspot.com", // Bucket de almacenamiento
  messagingSenderId: "1040331481578", // ID del remitente de mensajes
  appId: "1:1040331481578:web:b77cb35b51c66263be1293", // ID de la aplicación
  measurementId: "G-RPDMEN497T", // ID de medición de Google Analytics
};

// Inicializa la aplicación de Firebase con la configuración proporcionada
export const app = initializeApp(firebaseConfig);

// Obtiene la instancia de autenticación de Firebase
export const auth = getAuth(app);

// Configura el proveedor de autenticación de Google
export const googleProvider = new GoogleAuthProvider();

// Exporta las funciones de autenticación con email y Google
export const signInWithEmailAndPassword = firebaseSignInWithEmailAndPassword;
export const createUserWithEmailAndPassword =
  firebaseCreateUserWithEmailAndPassword;
export const signInWithPopup = firebaseSignInWithPopup;

// Obtiene la instancia de Firestore para manejar la base de datos
export const db = getFirestore(app);
export const storage = getStorage(app);
