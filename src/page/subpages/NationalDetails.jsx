import React, { useState } from 'react'; // Importa React y el hook useState
import { useAuth } from '../../firebase/auth'; // Importa el hook de autenticación para gestionar el estado del usuario
import { useParams, useNavigate } from 'react-router-dom'; // Importa hooks para obtener parámetros de URL y para navegar programáticamente
import national1 from '../../assets/bocas.webp'; // Importa imágenes para los paquetes nacionales
import national2 from '../../assets/sanblas.webp';
import national3 from '../../assets/cascadaschorrillito.webp';
import national4 from '../../assets/cangilonesGualaca.webp';
import Layout from '../layout/Layout'; // Importa el componente de diseño para la página
import { ButtonIcon } from '../../components/ButtonIcon'; // Importa un componente personalizado para el botón
import { FaArrowLeft } from "react-icons/fa"; // Importa el ícono de flecha hacia atrás

// Objeto que contiene detalles de los paquetes nacionales (título, descripción, imagen y precio)
const nationalDetails = {
  1: { title: 'Bocas del Toro', description: 'Enjoy a relaxing beach vacation with crystal-clear waters and sandy shores.', image: national1, price: '$499' },
  2: { title: 'San Blas', description: 'Experience the thrill of hiking through rugged mountain trails with breathtaking views.', image: national2, price: '$699' },
  3: { title: 'Cascadas Chorrillito', description: 'Explore the rich history and vibrant culture of the city with guided tours and local experiences.', image: national3, price: '$399' },
  4: { title: 'Cangilones Gualaca', description: 'Embark on an exciting safari adventure and witness wildlife in their natural habitat.', image: national4, price: '$899' }
};

// Componente principal para mostrar los detalles de un paquete nacional
export default function NationalDetails() {
    const { id } = useParams(); // Obtiene el parámetro 'id' de la URL
    const navigate = useNavigate(); // Hook para navegar programáticamente
    const { user } = useAuth(); // Obtiene el estado de autenticación del usuario
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la visibilidad del modal

    // Obtiene los detalles del paquete basado en el 'id'
    const national = nationalDetails[id];

    // Muestra un mensaje si el paquete no se encuentra
    if (!national) return <div>Tour not found</div>;

    // Maneja el clic en el botón "Book Now"
    const handleBookNow = () => {
        if (!user) {
            // Si el usuario no está autenticado, abre el modal
            setIsModalOpen(true);
        } else {
            // Si el usuario está autenticado, navega a la página de compra
            navigate(`/buynational/${id}`);
        }
    };

    // Maneja el clic en el botón de inicio de sesión en el modal
    const handleLogin = () => {
        navigate('/login'); // Navega a la página de inicio de sesión
    };

    // Maneja el clic en el botón de registro en el modal
    const handleRegister = () => {
        navigate('/register'); // Navega a la página de registro
    };

    return (
        <Layout>
            <div className="container mx-auto p-4">
                {/* Botón para volver a la página de paquetes nacionales */}
                <ButtonIcon
                    icon={<FaArrowLeft className="mr-2 h-5 w-5"/>}
                    classnamebtn="bg-transparent text-black border-transparent font-style: italic px-0 items-center text-center"
                    label="Back"
                    left={true}
                    link="/nationalpackages"
                />
                {/* Contenedor para mostrar los detalles del paquete */}
                <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
                    {/* Imagen del paquete */}
                    <img src={national.image} alt={national.title} className="w-full md:w-1/2 rounded-xl" />
                    {/* Detalles del paquete y botón de reserva */}
                    <div className="md:w-1/2">
                        {/* Título del paquete */}
                        <h1 className="text-4xl font-bold mb-4">{national.title}</h1>
                        {/* Descripción del paquete */}
                        <p className="text-lg mb-4">{national.description}</p>
                        {/* Precio del paquete */}
                        <p className="text-xl font-bold mb-4">{national.price}</p>
                        {/* Botón para reservar el paquete */}
                        <button
                            onClick={handleBookNow}
                            className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition-colors duration-300"
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal de Flowbite para usuarios no autenticados */}
            <div 
                id="authentication-modal" 
                tabIndex="-1" 
                aria-hidden="true" 
                className={`fixed inset-0 flex items-center justify-center z-50 ${isModalOpen ? 'block' : 'hidden'}`}
            >
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 max-w-sm w-full mx-4 md:mx-auto">
                    {/* Botón para cerrar el modal */}
                    <button
                        type="button"
                        className="absolute top-3 right-2.5 text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        onClick={() => setIsModalOpen(false)}
                    >
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1l12 12M13 1L1 13"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                        {/* Mensaje en el modal */}
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">You need to be logged in to book</h3>
                        <p className="mb-5 text-gray-500 dark:text-gray-400">Please log in or register to continue with your booking.</p>
                        {/* Botones para iniciar sesión o registrarse */}
                        <div className="flex justify-center gap-4">
                            <button
                                type="button"
                                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={handleLogin}
                            >
                                Log In
                            </button>
                            <button
                                type="button"
                                className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                onClick={handleRegister}
                            >
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
