import React, { useState } from 'react'; // Importa React y el hook useState para manejar el estado local del componente
import { useAuth } from '../../firebase/auth'; // Importa el hook useAuth para obtener el estado de autenticación del usuario
import { useParams, useNavigate } from 'react-router-dom'; // Importa hooks para obtener parámetros de la URL y para navegación programática
import tourImage1 from '../../assets/paris.webp'; // Importa imágenes para los tours
import tourImage2 from '../../assets/colombia.webp';
import tourImage3 from '../../assets/china.webp';
import tourImage4 from '../../assets/brasil.webp';
import Layout from '../layout/Layout'; // Importa el componente de diseño que envuelve la página
import { ButtonIcon } from '../../components/ButtonIcon'; // Importa un componente personalizado para el botón con íconos
import { FaArrowLeft } from "react-icons/fa"; // Importa el ícono de flecha hacia atrás

// Objeto que contiene detalles sobre los tours, incluyendo título, descripción, imagen y precio
const tourDetails = {
  1: { title: 'Tropical Beach Adventure', description: 'Enjoy a relaxing beach vacation with crystal-clear waters and sandy shores.', image: tourImage1, price: '$499' },
  2: { title: 'Mountain Hiking Expedition', description: 'Experience the thrill of hiking through rugged mountain trails with breathtaking views.', image: tourImage2, price: '$699' },
  3: { title: 'Cultural City Tour', description: 'Explore the rich history and vibrant culture of the city with guided tours and local experiences.', image: tourImage3, price: '$399' },
  4: { title: 'Safari Adventure', description: 'Embark on an exciting safari adventure and witness wildlife in their natural habitat.', image: tourImage4, price: '$899' }
};

// Componente principal que muestra los detalles de un tour
export default function TourDetails() {
    const { id } = useParams(); // Obtiene el parámetro 'id' de la URL, que identifica el tour a mostrar
    const navigate = useNavigate(); // Hook para permitir la navegación programática entre rutas
    const { user } = useAuth(); // Hook para obtener el estado de autenticación del usuario
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado que controla la visibilidad del modal de autenticación

    // Obtiene los detalles del tour basándose en el 'id' obtenido de la URL
    const tour = tourDetails[id];

    // Muestra un mensaje de error si el tour no se encuentra
    if (!tour) return <div>Tour not found</div>;

    // Función que maneja el clic en el botón "Book Now"
    const handleBookNow = () => {
        if (!user) {
            // Si el usuario no está autenticado, abre el modal de autenticación
            setIsModalOpen(true);
        } else {
            // Si el usuario está autenticado, navega a la página de compra del tour
            navigate(`/buyTours/${id}`);
        }
    };

    // Función que maneja el clic en el botón de inicio de sesión dentro del modal
    const handleLogin = () => {
        navigate('/login'); // Navega a la página de inicio de sesión
    };

    // Función que maneja el clic en el botón de registro dentro del modal
    const handleRegister = () => {
        navigate('/register'); // Navega a la página de registro
    };

    return (
        <Layout>
            <div className="container mx-auto p-4">
                {/* Botón para volver a la página de tours */}
                <ButtonIcon
                    icon={<FaArrowLeft className="mr-2 h-5 w-5"/>}
                    classnamebtn="bg-transparent text-black border-transparent font-style: italic px-0 items-center text-center"
                    label="Back"
                    left={true}
                    link="/tours"
                />
                {/* Contenedor para organizar la imagen y los detalles del tour */}
                <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
                    {/* Imagen del tour */}
                    <img src={tour.image} alt={tour.title} className="w-full md:w-1/2 rounded-xl" />
                    {/* Contenedor para los detalles del tour y el botón de reserva */}
                    <div className="md:w-1/2">
                        {/* Título del tour */}
                        <h1 className="text-4xl font-bold mb-4">{tour.title}</h1>
                        {/* Descripción del tour */}
                        <p className="text-lg mb-4">{tour.description}</p>
                        {/* Precio del tour */}
                        <p className="text-xl font-bold mb-4">{tour.price}</p>
                        {/* Botón que permite a los usuarios reservar el tour */}
                        <button
                            onClick={handleBookNow}
                            className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition-colors duration-300"
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Modal de Flowbite que se muestra si el usuario no está autenticado */}
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
                        {/* Mensaje dentro del modal que informa al usuario que necesita estar autenticado */}
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">You need to be logged in to book</h3>
                        <p className="mb-5 text-gray-500 dark:text-gray-400">Please log in or register to continue with your booking.</p>
                        {/* Botones dentro del modal para iniciar sesión o registrarse */}
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
