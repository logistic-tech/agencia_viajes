import React from 'react'; // Importa React para usar JSX
import Layout from '../layout/Layout'; // Importa el componente Layout para el diseño general
import { Carousel } from 'flowbite-react'; // Importa el componente Carousel para mostrar las imágenes en un carrusel
import international1 from '../../assets/paris.webp'; // Importa las imágenes de los tickets internacionales
import international2 from '../../assets/Amsterdam.webp';
import international3 from '../../assets/belgica.webp';
import international4 from '../../assets/brasil.webp';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para la navegación programática

export default function InternationalTickets() {
  const navigate = useNavigate(); // Hook para la navegación programática
  
  // Datos de los tickets internacionales
  const internationalTickets = [
    { id: 1, title: 'Paris', description: 'Disfruta de unas vacaciones relajantes en la playa con aguas cristalinas y arenas blancas.', image: international1, price: '$499' },
    { id: 2, title: 'Amsterdam', description: 'Experimenta la emoción de caminar por rutas de montaña con vistas impresionantes.', image: international2, price: '$699' },
    { id: 3, title: 'Bélgica', description: 'Explora la rica historia y la vibrante cultura de la ciudad con visitas guiadas y experiencias locales.', image: international3, price: '$399' },
    { id: 4, title: 'Brasil', description: 'Emprende una emocionante aventura de safari y observa la fauna en su hábitat natural.', image: international4, price: '$899' }
  ];

  // Función para manejar la compra del ticket
  const handleBuyNow = (id) => {
    navigate(`/international/${id}`); // Navega a la página de detalles del ticket
  };

  return (
    <section>
      <div className="w-screen">
        {/* Carrusel de Tickets Internacionales */}
        <div className="relative w-full h-[70vh] mb-12">
          <Carousel indicators={false} autoPlay={true} interval={5000}>
            {internationalTickets.map((ticketItem) => (
              <div key={ticketItem.id} className="relative w-full h-full">
                <img
                  src={ticketItem.image}
                  alt={ticketItem.title}
                  className="w-full h-full object-cover rounded-2xl transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-0 bg-gradient-to-t from-black to-transparent text-white p-6 rounded-b-2xl w-full">
                  <h3 className="text-3xl font-semibold">{ticketItem.title}</h3>
                  <p className="text-lg mt-2">{ticketItem.description}</p>
                  <p className="text-xl font-bold mt-4">{ticketItem.price}</p>
                  <button
                    className="mt-6 bg-yellow-500 text-black px-6 py-3 rounded-full hover:bg-yellow-600 transition-colors duration-300"
                    onClick={() => handleBuyNow(ticketItem.id)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        {/* Tarjetas de Tickets Internacionales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {internationalTickets.map((ticketItem) => (
            <div key={ticketItem.id} className="bg-white shadow-xl rounded-2xl overflow-hidden transform hover:scale-105 transition-transform duration-500 hover:shadow-2xl">
              <img src={ticketItem.image} alt={ticketItem.title} className="w-full h-64 object-cover rounded-t-2xl" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-4">{ticketItem.title}</h3>
                <p className="text-gray-700 mb-4">{ticketItem.description}</p>
                <p className="text-lg font-bold mb-4">{ticketItem.price}</p>
                <button
                  className="w-full bg-blue-500 text-white py-3 rounded-full hover:bg-blue-600 transition-colors duration-300"
                  onClick={() => handleBuyNow(ticketItem.id)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
