import React, { useState, useEffect } from 'react'; // Importa React y hooks necesarios
import { useParams, useNavigate } from 'react-router-dom'; // Importa hooks para manejar parámetros de URL y navegación
import Layout from '../layout/Layout'; // Importa el componente de diseño para la página
import international1 from '../../assets/paris.webp'; // Importa imágenes para los paquetes internacionales
import international2 from '../../assets/Amsterdam.webp';
import international3 from '../../assets/belgica.webp';
import international4 from '../../assets/brasil.webp';
import { ButtonIcon } from '../../components/ButtonIcon'; // Importa un componente personalizado para el botón
import { FaArrowLeft } from "react-icons/fa"; // Importa el ícono de flecha hacia atrás
import emailjs from 'emailjs-com'; // Importa la librería para enviar correos electrónicos
import { Button, Modal } from 'flowbite-react'; // Importa componentes para modales y botones

// Componente principal para la compra de paquetes internacionales
export default function BuyInternational() {
    // Objeto que contiene detalles de los paquetes internacionales (título, descripción, imagen y precio)
    const internationalDetails = {
        1: { title: 'Paris', description: 'Enjoy a relaxing beach vacation with crystal-clear waters and sandy shores.', image: international1, price: '$499' },
        2: { title: 'Amsterdam', description: 'Experience the thrill of hiking through rugged mountain trails with breathtaking views.', image: international2, price: '$699' },
        3: { title: 'Belgica', description: 'Explore the rich history and vibrant culture of the city with guided tours and local experiences.', image: international3, price: '$399' },
        4: { title: 'Brasil', description: 'Embark on an exciting safari adventure and witness wildlife in their natural habitat.', image: international4, price: '$899' }
    };

    // Obtiene el parámetro 'id' de la URL que indica el paquete internacional seleccionado
    const { id } = useParams();
    // Hook para navegar programáticamente
    const navigate = useNavigate();

    // Obtiene los detalles del paquete basado en el 'id'
    const pack = internationalDetails[id];

    // Estados para manejar el formulario y los modales
    const [name, setName] = useState(''); // Nombre del comprador
    const [email, setEmail] = useState(''); // Correo electrónico del comprador
    const [people, setPeople] = useState(''); // Cantidad de personas del comprador
    const [residence, setResidence] = useState(''); //Lugar de residencia del comprador
    const [paymentInfo, setPaymentInfo] = useState(''); // Información de pago
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // Estado para controlar la visibilidad del modal de éxito
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false); // Estado para controlar la visibilidad del modal de error
  
    const resetForm = () =>{
        setName('');
        setEmail('');
        setPeople('');
        setResidence('');
        setPaymentInfo('');

    };

    // Función para manejar el envío del formulario de compra
    const handlePurchase = (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario

        // Parámetros para enviar el correo usando emailjs
        const templateParams = {
            from_name: name,
            from_email: email,
            from_people: people,
            from_residence: residence,
            payment_info: paymentInfo,
            pack_title: pack.title,
            pack_description: pack.description,
            pack_price: pack.price
          };

        // Envía el correo usando emailjs
        emailjs.send('service_f6my0vj', 'template_b8wb16t', templateParams, 'jWB4cGsy7UULiIThh')
            .then((response) => {
                // Si el envío es exitoso, abre el modal de éxito
                setIsSuccessModalOpen(true);
                resetForm();
            }, (error) => {
                // Si ocurre un error, abre el modal de error
                
                setIsErrorModalOpen(true);
            });
    };

    // Funciones para cerrar los modales
    const closeSuccessModal = () => setIsSuccessModalOpen(false);
    const closeErrorModal = () => setIsErrorModalOpen(false);

 
    return (
        <Layout>
            <div className="container mx-auto p-4">
                {/* Botón para volver a la página de paquetes internacionales */}
                <ButtonIcon
                    icon={<FaArrowLeft className="mr-2 h-5 w-5" />}
                    classnamebtn="bg-transparent text-black border-transparent font-style: italic px-0 items-center text-center"
                    label="Back"
                    left={true}
                    link="/internationalpackages"
                />
                {/* Contenedor para mostrar los detalles del paquete y el formulario de compra */}
                <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
                    {/* Imagen del paquete */}
                    <img src={pack.image} alt={pack.title} className="w-full md:w-1/2 rounded-xl" />
                    {/* Detalles del paquete y formulario de compra */}
                    <div className="md:w-1/2">
                        {/* Título del paquete */}
                        <h1 className="text-4xl font-bold mb-4">{pack.title}</h1>
                        {/* Descripción del paquete */}
                        <p className="text-lg mb-4">{pack.description}</p>
                        {/* Precio del paquete */}
                        <p className="text-xl font-bold mb-4">{pack.price}</p>
                        {/* Formulario para comprar el paquete */}
                        <form onSubmit={handlePurchase} className="space-y-4">
                            {/* Campo para el nombre del comprador */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                            {/* Campo para el correo electrónico del comprador */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                             {/* Campo para la cantidad de personas del comprador */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Number of People interested</label>
                <input
                  type="text"
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              {/* Campo para el lugar de residencia del comprador */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Place of residence</label>
                <input
                  type="text"
                  value={residence}
                  onChange={(e) => setResidence(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
                            {/* Campo para la información de pago */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Payment Info</label>
                                <input
                                    type="text"
                                    value={paymentInfo}
                                    onChange={(e) => setPaymentInfo(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    required
                                />
                            </div>
                            {/* Botón para confirmar la compra */}
                            <button type="submit" className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition-colors duration-300">
                                Confirm Purchase
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Modal de éxito */}
            <Modal show={isSuccessModalOpen} onClose={closeSuccessModal} size="md" position="center" className="max-h-48 rounded-xl">
                <div className="">
                    <Modal.Header>
                        Purchase Confirmation
                    </Modal.Header>
                    <Modal.Body>
                        <p>Your purchase has been successfully processed!</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={closeSuccessModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>

            {/* Modal de error */}
            <Modal show={isErrorModalOpen} onClose={closeErrorModal} size="md" position="center" className="max-h-48 rounded-xl">
                <div className="">
                    <Modal.Header>
                        Error
                    </Modal.Header>
                    <Modal.Body>
                        <p>Failed to send purchase details. Please try again.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={closeErrorModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
        </Layout>
    );
}
