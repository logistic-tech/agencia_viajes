import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import national1 from '../../assets/bocas.webp';
import national2 from '../../assets/sanblas.webp';
import national3 from '../../assets/cascadaschorrillito.webp';
import national4 from '../../assets/cangilonesGualaca.webp';
import { ButtonIcon } from '../../components/ButtonIcon';
import { FaArrowLeft } from "react-icons/fa";
import emailjs from 'emailjs-com';
import { Button, Modal } from 'flowbite-react';
import { useAuth } from '../../firebase/auth';

export default function BuyNational() {
    const nationalDetails = {
        1: { title: 'Bocas del Toro', description: 'Enjoy a relaxing beach vacation with crystal-clear waters and sandy shores.', image: national1, price: '$499' },
        2: { title: 'San Blas', description: 'Experience the thrill of hiking through rugged mountain trails with breathtaking views.', image: national2, price: '$699' },
        3: { title: 'Cascadas Chorrillito', description: 'Explore the rich history and vibrant culture of the city with guided tours and local experiences.', image: national3, price: '$399' },
        4: { title: 'Cangilones Gualaca', description: 'Embark on an exciting safari adventure and witness wildlife in their natural habitat.', image: national4, price: '$899' }
    };

    const { id } = useParams();
    const navigate = useNavigate();
    const { user, loading } = useAuth();
    const pack = nationalDetails[id];

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

    const handlePurchase = (e) => {
        e.preventDefault();

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

        emailjs.send('service_f6my0vj', 'template_b8wb16t', templateParams, 'jWB4cGsy7UULiIThh')
            .then((response) => {
                setIsSuccessModalOpen(true);
                resetForm();
            }, (error) => {
                
                setIsErrorModalOpen(true);
            });
    };

    const closeSuccessModal = () => setIsSuccessModalOpen(false);
    const closeErrorModal = () => setIsErrorModalOpen(false);

   

    return (
        <Layout>
            <div className="container mx-auto p-4">
                <ButtonIcon
                    icon={<FaArrowLeft className="mr-2 h-5 w-5" />}
                    classnamebtn="bg-transparent text-black border-transparent font-style: italic px-0 items-center text-center"
                    label="Back"
                    left={true}
                    link="/nationalpackages"
                />
                <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
                    <img src={pack.image} alt={pack.title} className="w-full md:w-1/2 rounded-xl" />
                    <div className="md:w-1/2">
                        <h1 className="text-4xl font-bold mb-4">{pack.title}</h1>
                        <p className="text-lg mb-4">{pack.description}</p>
                        <p className="text-xl font-bold mb-4">{pack.price}</p>
                        <form onSubmit={handlePurchase} className="space-y-4">
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
                            <button type="submit" className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition-colors duration-300">
                                Confirm Purchase
                            </button>
                        </form>
                    </div>
                </div>
            </div>

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
