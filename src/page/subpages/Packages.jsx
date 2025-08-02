import React from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../layout/Layout';
import { Link } from 'react-router-dom';
import img1 from '../../assets/paris.webp';
import img2 from '../../assets/china.webp';
import img3 from '../../assets/belgica.webp';
import img4 from '../../assets/brasil.webp';
import img5 from '../../assets/colombia.webp';
import img6 from '../../assets/vietnam.webp';
import img7 from '../../assets/qatar.webp';
import img8 from '../../assets/surcorea.webp';
import img9 from '../../assets/cangilonesGualaca.webp';
import img10 from '../../assets/cascadabermejo.webp';
import img11 from '../../assets/cascadaschorrillito.webp';
import img12 from '../../assets/islabastimentos.webp';
import img13 from '../../assets/bovedas.webp';
import img14 from '../../assets/sanblas.webp';
import img15 from '../../assets/panamavieja.webp';
import img16 from '../../assets/bocas.webp';

export default function Tickets() {
  const { t } = useTranslation('tickets');

  const imgLayoutInternational = [
    { img: img1, title: 'Paris, France', price: '$1,200' },
    { img: img2, title: 'Beijing, China', price: '$900' },
    { img: img3, title: 'Bruges, Belgium', price: '$850' },
    { img: img4, title: 'Rio de Janeiro, Brazil', price: '$950' },
    { img: img5, title: 'Cartagena, Colombia', price: '$750' },
    { img: img6, title: 'Hanoi, Vietnam', price: '$800' },
    { img: img7, title: 'Doha, Qatar', price: '$1,100' },
    { img: img8, title: 'Seoul, South Korea', price: '$1,000' }
  ];

  const imgLayoutNational = [
    { img: img9, title: 'Los Cangilones de Gualaca, Chiriquí', price: '$30' },
    { img: img10, title: 'Cascada de Bermejo, Veraguas', price: '$25' },
    { img: img11, title: 'Cascadas de Chorrillito, Veraguas', price: '$20' },
    { img: img12, title: 'Isla Bastimentos, Bocas del Toro', price: '$40' },
    { img: img13, title: 'Las Bovedas, Panama City', price: '$15' },
    { img: img14, title: 'San Blas, Guna Yala', price: '$50' },
    { img: img15, title: 'Panama la Vieja, Panama', price: '$10' },
    { img: img16, title: 'Bocas del Toro', price: '$45' }
  ];

  return (
    <section>
      {/* International Section */}
      <section className="py-20 bg-white text-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold mb-3">{t('internationalTitle')}</h1>
          <p className="text-lg text-gray-600 mb-12">{t('internationalDescription')}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {imgLayoutInternational.map((ticket, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-lg bg-white transition duration-300 hover:shadow-2xl">
                <img src={ticket.img} alt={ticket.title} className="w-full h-56 object-cover" />
                <div className="p-6 text-left">
                  <h2 className="text-xl font-semibold mb-1">{ticket.title}</h2>
                  <p className="text-gray-500 mb-4">{ticket.price}</p>
                  <Link
                    to="/internationalpackages"
                    className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                  >
                    {t('bookNow')}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/internationalpackages"
            className="mt-12 inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-base font-semibold transition"
          >
            {t('seeMoreInternational')}
          </Link>
        </div>
      </section>

      {/* National Section */}
      <section className="py-20 bg-gray-50 text-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold mb-3">{t('nationalTitle')}</h1>
          <p className="text-lg text-gray-600 mb-12">{t('nationalDescription')}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {imgLayoutNational.map((ticket, index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-lg bg-white transition duration-300 hover:shadow-2xl">
                <img src={ticket.img} alt={ticket.title} className="w-full h-56 object-cover" />
                <div className="p-6 text-left">
                  <h2 className="text-xl font-semibold mb-1">{ticket.title}</h2>
                  <p className="text-gray-500 mb-4">{ticket.price}</p>
                  <Link
                    to="/nationalpackages"
                    className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium transition"
                  >
                    {t('bookNow')}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <Link
            to="/nationalpackages"
            className="mt-12 inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full text-base font-semibold transition"
          >
            {t('seeMoreNational')}
          </Link>
        </div>
      </section>
    </section>
  );
}
