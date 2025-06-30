import React from 'react';
import Layout from '../layout/Layout';
import { Carousel } from 'flowbite-react';
import tourImage1 from '../../assets/paris.webp';
import tourImage2 from '../../assets/colombia.webp';
import tourImage3 from '../../assets/china.webp';
import tourImage4 from '../../assets/brasil.webp';
import { useNavigate } from 'react-router-dom';

export default function Tours() {
  const navigate = useNavigate();
  const tours = [
    { id: 1, title: 'Tropical Beach Adventure', description: 'Enjoy a relaxing beach vacation with crystal-clear waters and sandy shores.', image: tourImage1, price: '$499' },
    { id: 2, title: 'Mountain Hiking Expedition', description: 'Experience the thrill of hiking through rugged mountain trails with breathtaking views.', image: tourImage2, price: '$699' },
    { id: 3, title: 'Cultural City Tour', description: 'Explore the rich history and vibrant culture of the city with guided tours and local experiences.', image: tourImage3, price: '$399' },
    { id: 4, title: 'Safari Adventure', description: 'Embark on an exciting safari adventure and witness wildlife in their natural habitat.', image: tourImage4, price: '$899' }
  ];

  const handleBuyNow = (id) => {
    navigate(`/tour/${id}`);
  };

  return (
    <Layout>
      <div className="w-full">
        {/* Elegant Tour Carousel */}
        <div className="relative w-full h-[70vh] mb-16">
          <Carousel indicators={false} autoPlay={true} interval={5000}>
            {tours.map((tour) => (
              <div key={tour.id} className="relative w-full h-full">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-full object-cover rounded-xl transform transition-transform duration-700 ease-in-out hover:scale-105"
                />
                <div className="absolute bottom-0 bg-gradient-to-t from-black via-black to-transparent text-white p-6 rounded-b-xl w-full">
                  <h3 className="text-4xl font-extrabold mb-3">{tour.title}</h3>
                  <p className="text-lg font-medium mb-4">{tour.description}</p>
                  <p className="text-2xl font-semibold mb-6">{tour.price}</p>
                  <button
                    className="px-6 py-3 bg-gradient-to-r from-[#3b82f6] to-[#1e40af] text-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:from-[#1e40af] hover:to-[#3b82f6]"
                    onClick={() => handleBuyNow(tour.id)}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {tours.map((tour, index) => (
            <div key={index} className="bg-white shadow-xl rounded-3xl overflow-hidden transform transition-transform duration-700 ease-in-out hover:scale-105">
              <img
                src={tour.image}
                alt={tour.title}
                className="w-full h-64 object-cover rounded-t-3xl"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-black mb-4">{tour.title}</h3>
                <p className="text-gray-600 text-lg mb-4">{tour.description}</p>
                <p className="text-xl font-semibold text-primary">{tour.price}</p>
                <button
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-[#3b82f6] to-[#1e40af] text-white rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:from-[#1e40af] hover:to-[#3b82f6]"
                  onClick={() => handleBuyNow(tour.id)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
