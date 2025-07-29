import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import international1 from '../../assets/paris.webp';
import international2 from '../../assets/Amsterdam.webp';
import international3 from '../../assets/belgica.webp';
import international4 from '../../assets/brasil.webp';
import Layout from '../layout/Layout';
import { ButtonIcon } from '../../components/ButtonIcon';
import { FaArrowLeft } from "react-icons/fa";
import { useAuth } from '../../firebase/auth'; 

// Datos de tours internacionales con sus detalles.
const internationalDetails = {
    1: { title: 'Paris', description: 'Enjoy a relaxing beach vacation with crystal-clear waters and sandy shores.', image: international1, price: '$499' },
    2: { title: 'Amsterdam', description: 'Experience the thrill of hiking through rugged mountain trails with breathtaking views.', image: international2, price: '$699' },
    3: { title: 'Belgica', description: 'Explore the rich history and vibrant culture of the city with guided tours and local experiences.', image: international3, price: '$399' },
    4: { title: 'Brasil', description: 'Embark on an exciting safari adventure and witness wildlife in their natural habitat.', image: international4, price: '$899' }
};

export default function InternationalDetails() {
    // Extrae el `id` de los parámetros de la URL usando `useParams`.
    const { id } = useParams();
    // Obtiene la función `navigate` para redirigir al usuario a otras páginas.
    const navigate = useNavigate();
    // Obtiene el objeto `user` del hook de autenticación.
    const { user } = useAuth();
    // Estado para controlar la visibilidad del modal.
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Obtiene los detalles del tour internacional basado en el `id` de los parámetros de la URL.
    const international = internationalDetails[id];

    // Muestra un mensaje si no se encuentran detalles del tour para el `id` dado.
    if (!international) return <div>Tour not found</div>;

    // Función que maneja la acción de reservar ahora.
    const handleBookNow = () => {
        // Si el usuario no está autenticado, abre el modal de inicio de sesión.
        if (!user) {
            setIsModalOpen(true);
        } else {
            // Si el usuario está autenticado, redirige a la página de compra.
            navigate(`/buyinternational/${id}`);
        }
    };

    // Función que maneja la navegación a la página de inicio de sesión.
    const handleLogin = () => {
        navigate('/login');
    };

    // Función que maneja la navegación a la página de registro.
    const handleRegister = () => {
        navigate('/register');
    };

    return (
        // Envuelve el contenido en el componente Layout.
        <section>
            <div className="container mx-auto p-4">
                {/* Botón para volver a la página de paquetes nacionales. */}
                <ButtonIcon
                    icon={<FaArrowLeft className="mr-2 h-5 w-5"/>}
                    classnamebtn="bg-transparent text-black border-transparent font-style: italic px-0 items-center text-center"
                    label="Back"
                    left={true}
                    link="/internationalpackages"
                />
                <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
                    {/* Imagen del tour internacional. */}
                    <img src={international.image} alt={international.title} className="w-full md:w-1/2 rounded-xl" />
                    <div className="md:w-1/2">
                        {/* Título del tour internacional. */}
                        <h1 className="text-4xl font-bold mb-4">{international.title}</h1>
                        {/* Descripción del tour internacional. */}
                        <p className="text-lg mb-4">{international.description}</p>
                        {/* Precio del tour internacional. */}
                        <p className="text-xl font-bold mb-4">{international.price}</p>
                        {/* Botón para reservar el tour. */}
                        <button
                            onClick={handleBookNow}
                            className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition-colors duration-300"
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
            
            {/* Modal que se muestra si el usuario no está autenticado. */}
            <div 
                id="authentication-modal" 
                tabIndex="-1" 
                aria-hidden="true" 
                className={`fixed inset-0 flex items-center justify-center z-50 ${isModalOpen ? 'block' : 'hidden'}`}
            >
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 max-w-sm w-full mx-4 md:mx-auto">
                    {/* Botón para cerrar el modal. */}
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
                        {/* Mensaje informativo en el modal. */}
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">You need to be logged in to book</h3>
                        <p className="mb-5 text-gray-500 dark:text-gray-400">Please log in or register to continue with your booking.</p>
                        <div className="flex justify-center gap-4">
                            {/* Botón para iniciar sesión. */}
                            <button
                                type="button"
                                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={handleLogin}
                            >
                                Log In
                            </button>
                            {/* Botón para registrarse. */}
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
        </section>
    );
}
