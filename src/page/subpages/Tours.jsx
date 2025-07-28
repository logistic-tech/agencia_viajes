
import { Carousel } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import tourImage1 from '../../assets/paris.webp';
import tourImage2 from '../../assets/colombia.webp';
import tourImage3 from '../../assets/china.webp';
import tourImage4 from '../../assets/brasil.webp';
import { obtenerPaquetes } from '../../services/services';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Tours() {
  const navigate = useNavigate();
  const { t } = useTranslation('tours');
  const [paquetes, setPaquetes] = useState([]);
  const [error, setError] = useState(null);
  const tours = t('tours', { returnObjects: true });

  const images = [tourImage1, tourImage2, tourImage3, tourImage4];



  const handleBuyNow = (id) => {
    navigate(`/tour/${id}`);
  };



  useEffect(() => {
    const cargarDestinos = async () => {
      try {
        const data = await obtenerPaquetes();
        console.log(data)
        setPaquetes(data);
      } catch (err) {
        setError(err.message);
      }
    };

    cargarDestinos();
  }, []);

  return (

      <div className="">
        {/* Carousel */}
        <div className="relative w-full h-[70vh] mb-16 rounded-xl overflow-hidden">
  <Carousel indicators={false} autoPlay interval={5000}>
    {tours.map((tour, index) => (
      <div key={index} className="relative w-full h-full">
        <img
          src={images[index]}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent text-white p-8 flex flex-col justify-end">
          <h2 className="text-4xl font-extrabold mb-2">{tour.title}</h2>
          <p className="text-lg font-light mb-2">{tour.description}</p>
          <p className="text-2xl font-semibold mb-4">{tour.price}</p>
          <button
            onClick={() => handleBuyNow(index + 1)}
            className="w-max px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full font-semibold transition duration-300"
          >
            {t('bookNow')}
          </button>
        </div>
      </div>
    ))}
  </Carousel>
</div>

        {/* Tour Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4 pb-20">
  {paquetes.map((tour, index) => (
    <article
      key={index}
      className="bg-white shadow-lg rounded-2xl overflow-hidden transform transition-transform duration-300 hover:shadow-2xl hover:scale-105"
    >
      <img
        src={images[index]}
        alt={`Imagen del tour ${tour.nombre}`}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-gray-900">{tour.nombre}</h2>
        <p className="text-gray-600 mb-3">{tour.descripcion}</p>
        <p className="text-xl font-semibold text-gray-800 mb-4">${tour.precio}</p>
        <button
          onClick={() => handleBuyNow(index + 1)}
          className="px-5 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full font-semibold transition duration-300"
        >
          {t('bookNow')}
        </button>
      </div>
    </article>
  ))}
</section>

      </div>

  );
}
