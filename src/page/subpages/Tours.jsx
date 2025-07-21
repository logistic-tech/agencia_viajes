import React from 'react';
import Layout from '../layout/Layout';
import { Carousel } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import tourImage1 from '../../assets/paris.webp';
import tourImage2 from '../../assets/colombia.webp';
import tourImage3 from '../../assets/china.webp';
import tourImage4 from '../../assets/brasil.webp';

export default function Tours() {
  const navigate = useNavigate();
  const { t } = useTranslation('tours');

  const tours = t('tours', { returnObjects: true });

  const images = [tourImage1, tourImage2, tourImage3, tourImage4];

  const handleBuyNow = (id) => {
    navigate(`/tour/${id}`);
  };

  return (
    <Layout>
      <div className="w-full">
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
                  <h3 className="text-4xl font-extrabold mb-2">{tour.title}</h3>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-4 pb-20">
          {tours.map((tour, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-2xl overflow-hidden transform transition-transform duration-300 hover:shadow-2xl hover:scale-105"
            >
              <img src={images[index]} alt={tour.title} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{tour.title}</h3>
                <p className="text-gray-600 mb-3">{tour.description}</p>
                <p className="text-xl font-semibold text-gray-800 mb-4">{tour.price}</p>
                <button
                  onClick={() => handleBuyNow(index + 1)}
                  className="px-5 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full font-semibold transition duration-300"
                >
                  {t('bookNow')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
