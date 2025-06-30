import React from 'react';
import Layout from '../layout/Layout';
import { Link } from 'react-router-dom';
import img1 from '../../assets/paris.webp'; // International tickets
import img2 from '../../assets/china.webp';
import img3 from '../../assets/belgica.webp';
import img4 from '../../assets/brasil.webp';
import img5 from '../../assets/colombia.webp'; 
import img6 from '../../assets/vietnam.webp';
import img7 from '../../assets/qatar.webp';
import img8 from '../../assets/surcorea.webp';
import img9 from '../../assets/cangilonesGualaca.webp'; // National tickets
import img10 from '../../assets/cascadabermejo.webp';
import img11 from '../../assets/cascadaschorrillito.webp';
import img12 from '../../assets/islabastimentos.webp';
import img13 from '../../assets/bovedas.webp'; 
import img14 from '../../assets/sanblas.webp';
import img15 from '../../assets/panamavieja.webp';
import img16 from '../../assets/bocas.webp';

export default function Tickets() {
  // International tickets
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

  // National tickets
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
    <Layout>
      {/* International Section with gradient from top to bottom */}
      <section className="py-20 bg-gradient-to-b from-indigo-600 to-transparent text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-semibold mb-6">Discover the Best International Tickets</h1>
          <p className="text-lg mb-10">Get ready for the adventure of a lifetime with our exclusive international travel tickets.</p>
          
          {/* International Tickets Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {imgLayoutInternational.map((ticket, index) => (
              <div key={index} className="relative overflow-hidden rounded-lg shadow-xl transition duration-500 transform hover:scale-105">
                <img src={ticket.img} alt={ticket.title} className="w-full h-64 object-cover rounded-lg"/>
                <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
                <div className="absolute bottom-0 left-0 p-6 text-center z-10">
                  <h2 className="text-2xl font-semibold">{ticket.title}</h2>
                  <p className="text-lg font-light">{ticket.price}</p>
                  <Link to="/internationalpackages" className="mt-4 inline-block px-6 py-3 bg-transparent border-2 border-white text-white rounded-full text-lg font-semibold hover:bg-white hover:text-black transition">
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* "See More" Button */}
          <Link to="/internationalpackages" className="mt-8 inline-block bg-transparent border-2 border-blue-800 text-blue-900 py-3 px-6 rounded-full text-lg font-semibold hover:bg-white hover:text-black transition">
            See More International Tickets
          </Link>
        </div>
      </section>

      {/* National Section with gradient from bottom to top */}
      <section className="py-20 bg-gradient-to-b from-indigo-600 to-transparent text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-semibold mb-6">Discover the Best National Tickets</h1>
          <p className="text-lg mb-10">Explore the beauty of your own country with our handpicked national tours and tickets.</p>
          
          {/* National Tickets Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {imgLayoutNational.map((ticket, index) => (
              <div key={index} className="relative overflow-hidden rounded-lg shadow-xl transition duration-500 transform hover:scale-105">
                <img src={ticket.img} alt={ticket.title} className="w-full h-64 object-cover rounded-lg"/>
                <div className="absolute inset-0 bg-black opacity-20 rounded-lg"></div>
                <div className="absolute bottom-0 left-0 p-6 text-center z-10">
                  <h2 className="text-2xl font-semibold">{ticket.title}</h2>
                  <p className="text-lg font-light">{ticket.price}</p>
                  <Link to="/nationalpackages" className="mt-4 inline-block px-6 py-3 bg-transparent border-2 border-white text-white rounded-full text-lg font-semibold hover:bg-black hover:text-white transition">
                    Book Now
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* "See More" Button */}
          <Link to="/nationalpackages" className="mt-8 inline-block bg-transparent border-2 border-blue-800 text-blue-900 py-3 px-6 rounded-full text-lg font-semibold hover:bg-black hover:text-white transition">
            See More National Tickets
          </Link>
        </div>
      </section>
    </Layout>
  );
}
