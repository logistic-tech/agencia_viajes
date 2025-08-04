
import national1 from '../../assets/bocas.webp';
import national2 from '../../assets/sanblas.webp';
import national3 from '../../assets/cascadaschorrillito.webp';
import national4 from '../../assets/cangilonesGualaca.webp';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate para la navegación programática

// Componente principal que muestra los paquetes nacionales
export default function NationalPackages() {
  const navigate = useNavigate(); // Hook para permitir la navegación entre rutas programáticamente

  // Arreglo que contiene detalles de los paquetes nacionales (id, título, descripción, imagen y precio)
  const nationalPackages = [
    { id: 1, title: 'Bocas del Toro', description: 'Enjoy a relaxing beach vacation with crystal-clear waters and sandy shores.', image: national1, price: '$499' },
    { id: 2, title: 'San Blas', description: 'Experience the thrill of hiking through rugged mountain trails with breathtaking views.', image: national2, price: '$699' },
    { id: 3, title: 'Cascadas Chorrillito', description: 'Explore the rich history and vibrant culture of the city with guided tours and local experiences.', image: national3, price: '$399' },
    { id: 4, title: 'Cangilones Gualaca', description: 'Embark on an exciting safari adventure and witness wildlife in their natural habitat.', image: national4, price: '$899' }
  ];

  // Función para manejar el clic en el botón "Buy Now" y navegar a la página de detalles del paquete
  const handleBuyNow = (id) => {
    navigate(`/national/${id}`); // Navega a la página de detalles del paquete con el id correspondiente
  };

  return (
    <section>
      {/* Contenedor para el carrusel de imágenes */}
      <div className="w-screen">
        {/* Contenedor del carrusel */}
        <div className="relative w-full h-[70vh] mb-12 overflow-hidden rounded-2xl">
      {nationalPackages.map((packageItem, index) => (
        <div
          key={packageItem.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <img
            src={packageItem.image}
            alt={packageItem.title}
            className="w-full h-full object-cover rounded-2xl transform hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute bottom-0 bg-gradient-to-t from-black to-transparent text-white p-6 rounded-b-2xl w-full">
            <h3 className="text-3xl font-semibold">{packageItem.title}</h3>
            <p className="text-lg mt-2">{packageItem.description}</p>
            <p className="text-xl font-bold mt-4">{packageItem.price}</p>
            <button
              className="mt-6 bg-yellow-500 text-black px-6 py-3 rounded-full hover:bg-yellow-600 transition-colors duration-300"
              onClick={() => handleBuyNow(packageItem.id)}
            >
              Buy Now
            </button>
          </div>
        </div>
      ))}
    </div>

        {/* Contenedor de tarjetas de paquetes nacionales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {/* Mapea sobre los paquetes nacionales para crear una tarjeta para cada uno */}
          {nationalPackages.map((packageItem) => (
            <div key={packageItem.id} className="bg-white shadow-xl rounded-2xl overflow-hidden transform hover:scale-105 transition-transform duration-500 hover:shadow-2xl">
              {/* Imagen del paquete en la tarjeta */}
              <img src={packageItem.image} alt={packageItem.title} className="w-full h-64 object-cover rounded-t-2xl" />
              {/* Contenedor de los detalles del paquete en la tarjeta */}
              <div className="p-6">
                {/* Título del paquete */}
                <h3 className="text-2xl font-semibold mb-4">{packageItem.title}</h3>
                {/* Descripción del paquete */}
                <p className="text-gray-700 mb-4">{packageItem.description}</p>
                {/* Precio del paquete */}
                <p className="text-lg font-bold mb-4">{packageItem.price}</p>
                {/* Botón para comprar el paquete */}
                <button
                  className="w-full bg-blue-500 text-white py-3 rounded-full hover:bg-blue-600 transition-colors duration-300"
                  onClick={() => handleBuyNow(packageItem.id)}
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
