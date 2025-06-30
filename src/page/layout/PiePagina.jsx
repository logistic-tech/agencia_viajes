import React from 'react'; // Importa la biblioteca React
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'; // Importa iconos de redes sociales desde react-icons
import logo from '/src/assets/blancologo.webp'; // Ruta del logo

// Define el componente PiePagina
export function PiePagina() {
    return (
        <footer className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white py-10">
            <div className="max-w-7xl mx-auto px-6">
                {/* Sección para el logo */}
                <div className="flex justify-center mb-6">
                    <img src={logo} alt="Logo" className="h-12 w-auto" />
                </div>

                {/* Sección de enlaces importantes */}
                <div className="flex justify-center space-x-12 mb-6">
                    <a href="https://panamamarinelogistic.com.pa" className="hover:text-blue-300 transition-colors">Home</a>
                    <a href="/aboutus" className="hover:text-blue-300 transition-colors">About Us</a>
                    <a href="/contactus" className="hover:text-blue-300 transition-colors">Contact</a>
                    <a href="https://panamamarinelogistic.com.pa" className="hover:text-blue-300 transition-colors">Terms & Conditions</a>
                    <a href="https://panamamarinelogistic.com.pa" className="hover:text-blue-300 transition-colors">Privacy Policy</a>
                </div>

                {/* Línea divisoria */}
                <div className="border-t border-blue-300 my-6"></div>

                {/* Sección para las redes sociales */}
                <div className="flex justify-center space-x-6 mb-6">
                    <a href="https://www.facebook.com/logisticisc" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition-colors">
                        <FaFacebook className="w-6 h-6" />
                    </a>
                    <a href="https://www.instagram.com/logistic_isc/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition-colors">
                        <FaInstagram className="w-6 h-6" />
                    </a>
                    <a href="https://www.linkedin.com/company/panama-marine-logistic" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition-colors">
                        <FaLinkedin className="w-6 h-6" />
                    </a>
                    <a href="https://www.youtube.com/@panamamarinelogistic-pty" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-300 transition-colors">
                        <FaYoutube className="w-6 h-6" />
                    </a>
                </div>

                {/* Información de derechos de autor */}
                <div className="text-center text-sm text-gray-200">
                    <p>&copy; 2024 Logistic Travels & Tours. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
