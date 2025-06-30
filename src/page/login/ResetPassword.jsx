import React, { useState } from 'react'; // Importa React y useState para manejar el estado del componente
import { sendPasswordResetEmail } from 'firebase/auth'; // Importa la función para enviar el correo de restablecimiento de contraseña desde Firebase
import { auth } from '../../firebase/config'; // Importa la configuración de autenticación de Firebase
import fondo from '../../../src/assets/fondo.webp'; // Importa la imagen de fondo
import { Link } from 'react-router-dom'; // Importa Link para la navegación entre rutas


export default function ResetPassword() {
  const [email, setEmail] = useState(''); // Estado para almacenar el email ingresado
  const [message, setMessage] = useState(''); // Estado para almacenar el mensaje de éxito
  const [error, setError] = useState(''); // Estado para almacenar el mensaje de error

  const handleResetPassword = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario (recarga de página)
    try {
      await sendPasswordResetEmail(auth, email); // Intenta enviar el correo de restablecimiento
      setMessage('Password reset email sent! Check your inbox.'); // Muestra un mensaje de éxito
      setError(''); // Limpia cualquier mensaje de error
    } catch (err) {
      setError(err.message); // Muestra el mensaje de error en caso de fallo
      setMessage(''); // Limpia el mensaje de éxito
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="mb-4">
          <Link to="/login" className="text-blue-500 hover:underline">
            &larr; Back to Login
          </Link>
        </div>
        <h1 className="text-2xl font-bold mb-6">Reset Password</h1>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Send Reset Email
          </button>
        </form>
        {message && <p className="mt-4 text-green-500">{message}</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>
    </div>
  );
}
