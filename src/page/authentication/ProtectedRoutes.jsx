import React from 'react'; // Importa React
import { Navigate, Outlet } from 'react-router-dom'; // Importa Navigate y Outlet de react-router-dom para manejar la navegación y la renderización de rutas anidadas
import { useAuthState } from 'react-firebase-hooks/auth'; // Importa useAuthState para gestionar el estado de autenticación de Firebase
import { auth } from '../../firebase/config'; // Importa la configuración de autenticación desde el archivo config

export default function ProtectedRoutes() {
  const [user] = useAuthState(auth); // Usa el hook useAuthState para obtener el estado de autenticación del usuario

  // Si el usuario está autenticado, renderiza las rutas hijas (Outlet)
  // Si el usuario no está autenticado, redirige a la página de login
  return user ? <Outlet /> : <Navigate to="/login" />;
}