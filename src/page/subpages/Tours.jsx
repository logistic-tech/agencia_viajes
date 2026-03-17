import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

import tourImage1 from '../../assets/paris.webp';
import tourImage2 from '../../assets/colombia.webp';
import tourImage3 from '../../assets/china.webp';
import tourImage4 from '../../assets/brasil.webp';
import { obtenerPaquetes } from '../../services/services';

export default function Tours() {
  const navigate = useNavigate();
  const { t } = useTranslation('tours');
  const [paquetes, setPaquetes] = useState([]);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const tours = t('tours', { returnObjects: true });
  const images = [tourImage1, tourImage2, tourImage3, tourImage4];

  const handleBuyNow = (id) => {
    navigate(`/tour/${id}`);
  };

  useEffect(() => {
    const cargarDestinos = async () => {
      try {
        const data = await obtenerPaquetes();
        setPaquetes(data);
      } catch (err) {
        setError(err.message);
      }
    };
    cargarDestinos();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % tours.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [tours.length]);

  return (
    <div>
      {/* Carousel personalizado */}
      <div className="relative w-full h-[70vh] mb-16 rounded-xl overflow-hidden">
        {tours.map((tour, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
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
      </div>

      {/* Tour Cards */}
    <section className="max-w-7xl mx-auto px-6 mb-24">

  {/* Header */}
  <div className="text-center mb-16">
    <h2 className="text-4xl font-extrabold text-neutral-900 mb-4">
      {t('experiencesTitle')}
    </h2>

    <p className="text-neutral-600 max-w-2xl mx-auto">
      {t('experiencesSubtitle')}
    </p>

    <div className="w-20 h-1 bg-[#b89c6e] mx-auto mt-6 rounded-full"></div>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

    {/* Expediciones */}
    <div className="group bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition text-center">
      <div className="text-4xl mb-4 text-[#b89c6e]">🧭</div>
      <h3 className="text-xl font-bold mb-3">
        {t('expeditionsTitle')}
      </h3>
      <p className="text-neutral-600 text-sm">
        {t('expeditionsDesc')}
      </p>
    </div>

    {/* Aventura */}
    <div className="group bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition text-center">
      <div className="text-4xl mb-4 text-blue-900">🏔️</div>
      <h3 className="text-xl font-bold mb-3">
        {t('adventureTitle')}
      </h3>
      <p className="text-neutral-600 text-sm">
        {t('adventureDesc')}
      </p>
    </div>

    {/* Cultura */}
    <div className="group bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition text-center">
      <div className="text-4xl mb-4 text-blue-900">🏛️</div>
      <h3 className="text-xl font-bold mb-3">
        {t('culturalTitle')}
      </h3>
      <p className="text-neutral-600 text-sm">
        {t('culturalDesc')}
      </p>
    </div>

  </div>
</section>
    </div>
  );
}
