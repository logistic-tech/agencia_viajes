import React from 'react'; // Importa la biblioteca React para construir componentes
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa Router y funciones para manejar rutas
import Home from './page/Home'; // Importa el componente de la página principal
import AboutUs from './page/subpages/AboutUs'; // Importa el componente de la página "Acerca de nosotros"
import Packages from './page/subpages/Packages'; // Importa el componente para la página de paquetes
import ContactUs from './page/subpages/ContactUs'; // Importa el componente de la página de contacto
import Tours from './page/subpages/Tours'; // Importa el componente para la página de tours
import TourDetails from './page/subpages/ToursDetails'; // Importa el componente para detalles de tours
import BuyTours from './page/subpages/BuyTours'; // Importa el componente para comprar tours
import NationalPackages from './page/subpages/NationalPackages'; // Importa el componente para paquetes nacionales
import InternationalPackages from './page/subpages/InternationalPackages'; // Importa el componente para paquetes internacionales
import Login from './page/login/Login'; // Importa el componente de inicio de sesión
import Register from './page/login/Register'; // Importa el componente de registro
import ResetPassword from './page/login/ResetPassword'; // Importa el componente para restablecimiento de contraseña
import Profile from './page/subpages/Profile'; // Importa el componente del perfil del usuario
import ProtectedRoutes from './page/authentication/ProtectedRoutes'; // Importa el componente para rutas protegidas
import NationalDetails from './page/subpages/NationalDetails'; // Importa el componente para detalles de paquetes nacionales
import BuyNational from './page/subpages/BuyNational'; // Importa el componente para comprar paquetes nacionales
import InternationalDetails from './page/subpages/InternationalDetails'; // Importa el componente para detalles de paquetes internacionales
import BuyInternational from './page/subpages/BuyInternational'; // Importa el componente para comprar paquetes internacionales
import PaymentOption from './page/subpages/PaymentOption';
import InvoiceView from './page/subpages/InvoiceView';
import ProfileAdmin from './page/subpages/ProfileAdmin';

export default function App() {
  return (
    <Router> {/* Configura el enrutador para la aplicación */}
      <Routes> {/* Define las rutas para la aplicación */}
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} /> {/* Ruta para la página principal */}
        <Route path="/login" element={<Login />} /> {/* Ruta para la página de inicio de sesión */}
        <Route path="/register" element={<Register />} /> {/* Ruta para la página de registro */}
        <Route path="/resetpassword" element={<ResetPassword />} /> {/* Ruta para la página de restablecimiento de contraseña */}
        
        <Route path="/aboutus" element={<AboutUs />} /> {/* Ruta para la página "Acerca de nosotros" */}
        <Route path="/packages" element={<Packages />} /> {/* Ruta para la página de paquetes */}
        <Route path="/contactus" element={<ContactUs />} /> {/* Ruta para la página de contacto */}
        <Route path="/tours" element={<Tours />} /> {/* Ruta para la página de tours */}
        <Route path="/tour/:id" element={<TourDetails />} /> {/* Ruta para detalles de un tour específico */}
        <Route path="/nationalpackages" element={<NationalPackages />} /> {/* Ruta para paquetes nacionales */}
        <Route path="/national/:id" element={<NationalDetails />} /> {/* Ruta para detalles de un paquete nacional específico */}
        <Route path="/internationalpackages" element={<InternationalPackages />} /> {/* Ruta para paquetes internacionales */}
        <Route path="/international/:id" element={<InternationalDetails />} /> {/* Ruta para detalles de un paquete internacional específico */}
        <Route path="/payment-option/:purchaseId" element={<PaymentOption />} />
       <Route path="/invoice/:purchaseId" element={<InvoiceView />} />
       <Route path="/admin" element={<ProfileAdmin />} />
        {/* Rutas protegidas */}
        <Route element={<ProtectedRoutes />}> {/* Define un conjunto de rutas que requieren autenticación */}
          <Route path="/profile" element={<Profile />} /> {/* Ruta para la página del perfil del usuario */}
          <Route path="/buyinternational/:id" element={<BuyInternational />} /> {/* Ruta para comprar un paquete internacional específico */}
          <Route path="/buynational/:id" element={<BuyNational />} /> {/* Ruta para comprar un paquete nacional específico */}
          <Route path="/buytours/:id" element={<BuyTours />} /> {/* Ruta para comprar un tour específico */}
          <Route path="/buytours/:id" element={<BuyTours />} /> {/* Ruta para comprar un tour específico */}

        
        </Route>
      </Routes>
    </Router>
  );
}
