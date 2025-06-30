import React, { useState, useEffect } from 'react'; // Importa React, useState y useEffect
import { Link, useNavigate } from 'react-router-dom'; // Importa Link y useNavigate para navegación
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'; // Importa funciones para autenticación con Firebase
import { auth, db } from '../../firebase/config'; // Importa la configuración de Firebase
import { doc, setDoc } from 'firebase/firestore'; // Importa funciones de Firestore para manejo de documentos
import fondo from '../../../src/assets/fondo.webp'; // Importa la imagen de fondo
import googleIcon from '../../../src/assets/google.svg'; // Importa el ícono de Google
import { onAuthStateChanged } from 'firebase/auth'; // Importa onAuthStateChanged para manejar cambios en el estado de autenticación

export default function Login() {
  // Estados para manejar los valores del formulario y los mensajes de error
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Estado para manejar la carga mientras se verifica la autenticación
  const navigate = useNavigate(); // Hook para la navegación programática

  // Efecto para verificar el estado de autenticación del usuario
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.emailVerified) {
        navigate('/'); // Redirige a la página principal si el usuario está autenticado y su correo está verificado
      } else {
        setLoading(false); // Deja de cargar si el usuario no está autenticado o su correo no está verificado
      }
    });

    return () => unsubscribe(); // Limpia el suscriptor cuando el componente se desmonte
  }, [navigate]);

  // Función para manejar el inicio de sesión con email y contraseña
  const handleLogin = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    setEmailError(''); // Resetea el mensaje de error del email
    setPasswordError(''); // Resetea el mensaje de error de la contraseña
    setError(''); // Resetea el mensaje de error general

    // Validación de campos
    if (!email) {
      setEmailError('Email is required'); // Muestra un error si el campo de email está vacío
      return;
    }
    if (!password) {
      setPasswordError('Password is required'); // Muestra un error si el campo de contraseña está vacío
      return;
    }

    try {
      // Inicia sesión con email y contraseña usando Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Verifica si el correo electrónico del usuario está verificado
      if (!user.emailVerified) {
        setError('Please verify your email address.'); // Muestra un error si el correo no está verificado
        await auth.signOut(); // Cierra la sesión del usuario
        return;
      }

      navigate('/'); // Redirige a la página principal si el inicio de sesión es exitoso
    } catch (err) {
      handleFirebaseErrors(err.code); // Maneja los errores de Firebase
    }
  };

  // Función para manejar el inicio de sesión con Google
  const handleGoogleLogin = async () => {
    const googleProvider = new GoogleAuthProvider(); // Crea un proveedor de autenticación de Google
    try {
      const result = await signInWithPopup(auth, googleProvider); // Inicia sesión con Google
      const user = result.user;

      // Extrae el nombre completo del usuario y lo divide en nombre y apellido
      const displayName = user.displayName || '';
      const [name = '', lastName = ''] = displayName.split(' ');

      // Guarda los datos del usuario en Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        name: name,
        lastName: lastName,
        photoURL: user.photoURL || ''
      });

      navigate('/'); // Redirige a la página principal después de iniciar sesión con Google
    } catch (err) {
      setError('An error occurred with Google login'); // Muestra un error si ocurre un problema con el inicio de sesión de Google
      
    }
  };

  // Función para manejar errores de Firebase
  const handleFirebaseErrors = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        setEmailError('Invalid email address'); // Muestra un error si el email es inválido
        break;
      case 'auth/user-disabled':
        setError('User account is disabled'); // Muestra un error si la cuenta del usuario está deshabilitada
        break;
      case 'auth/user-not-found':
        setEmailError('No user found with this email'); // Muestra un error si no se encuentra el usuario
        break;
      case 'auth/wrong-password':
        setPasswordError('Incorrect email or password'); // Muestra un error si la contraseña es incorrecta
        break;
      default:
        setError('Incorrect email or password'); // Mensaje de error genérico
    }
  };

  // Muestra un indicador de carga mientras se verifica el estado de autenticación
  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover" style={{ backgroundImage: `url(${fondo})` }}>
      
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <div className="mb-4">
          <Link to="/" className="text-blue-500 hover:underline">
            &larr; Back to Home
          </Link>
          </div>
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        {/* Formulario de inicio de sesión */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${emailError ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>} {/* Mensaje de error del email */}
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${passwordError ? 'border-red-500 focus:ring-red-500' : 'focus:ring-blue-500'}`}
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>} {/* Mensaje de error de la contraseña */}
          </div>
          <p className="mt-4">
            Forgot your password? <Link to="/resetpassword" className="text-blue-500">Reset it here</Link> {/* Enlace para resetear contraseña */}
          </p>
          <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Login
          </button>
        </form>
        <button
          onClick={handleGoogleLogin}
          className="w-full mt-4 px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900 flex items-center justify-center"
        >
          <img src={googleIcon} alt="Google Icon" className="w-6 h-6 mr-2" /> {/* Icono de Google */}
          Login with Google
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>} {/* Mensaje de error general */}
        <p className="mt-4">
          Don't have an account? <Link to="/register" className="text-blue-500">Register</Link> {/* Enlace para registro */}
        </p>
      </div>
    </div>
  );
}
