import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import national1 from '../../assets/bocas.webp';
import national2 from '../../assets/sanblas.webp';
import national3 from '../../assets/cascadaschorrillito.webp';
import national4 from '../../assets/cangilonesGualaca.webp';
import { ButtonIcon } from '../../components/ButtonIcon';
import { FaArrowLeft } from "react-icons/fa";
import emailjs from 'emailjs-com';
import { useAuth } from '../../firebase/auth';
import PurchaseForm from './PurchaseForm';
 
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

  // Estados del formulario
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [people, setPeople] = useState('');
  const [residence, setResidence] = useState('');
  const [paymentInfo, setPaymentInfo] = useState('');

  // Modales
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const resetForm = () => {
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
      .then(() => {
        setIsSuccessModalOpen(true);
        resetForm();
      })
      .catch(() => {
        setIsErrorModalOpen(true);
      });
  };

  const closeSuccessModal = () => setIsSuccessModalOpen(false);
  const closeErrorModal = () => setIsErrorModalOpen(false);

  return (
    <section>
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

            {/* ✅ Usamos el formulario externo aquí */}
            <PurchaseForm
              name={name}
              email={email}
              people={people}
              residence={residence}
              paymentInfo={paymentInfo}
              setName={setName}
              setEmail={setEmail}
              setPeople={setPeople}
              setResidence={setResidence}
              setPaymentInfo={setPaymentInfo}
              handlePurchase={handlePurchase}
            />
          </div>
        </div>
      </div>

    {/* Modal de éxito */}
{isSuccessModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white w-full max-w-md rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b font-semibold text-lg">
        Purchase Confirmation
      </div>
      
      {/* Body */}
      <div className="p-4">
        <p>Your purchase has been successfully processed!</p>
      </div>
      
      {/* Footer */}
      <div className="p-4 border-t flex justify-end">
        <button
          onClick={closeSuccessModal}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

{/* Modal de error */}
{isErrorModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white w-full max-w-md rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b font-semibold text-lg text-red-600">
        Error
      </div>
      
      {/* Body */}
      <div className="p-4">
        <p>Failed to send purchase details. Please try again.</p>
      </div>
      
      {/* Footer */}
      <div className="p-4 border-t flex justify-end">
        <button
          onClick={closeErrorModal}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

    </section>
  );
}
