import React from 'react';
import Layout from '../layout/Layout';
import teamImage from '../../assets/team.webp';
import servicesImage from '../../assets/services.webp';
import destinationImage from '../../assets/destination.webp';
import background from '../../assets/san-blas-panama.jpg';

export default function AboutUs() {
  return (
    <Layout>
      <div className="container mx-auto px-6 py-16 space-y-24">

        {/* Sección de introducción */}
        <div className="relative overflow-hidden rounded-3xl shadow-xl">
          <img 
            src={background} 
            alt="Travel Background" 
            className="w-full h-[450px] object-cover opacity-90"
          />
          <div className="absolute inset-0 flex items-center justify-center text-center text-white p-6 bg-gradient-to-t from-black via-transparent to-transparent">
            <div className="z-10">
              <h1 className="text-6xl font-extrabold leading-tight drop-shadow-lg mb-4">
                Explore the World with Us
              </h1>
              <p className="text-xl font-light mb-6">
                Start your adventure today. We design unforgettable experiences tailored just for you.
              </p>
              <a 
                href="#services" 
                className="bg-indigo-800 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg hover:bg-indigo-700 transform transition duration-300 hover:scale-105"
              >
                Discover Our Services
              </a>
            </div>
          </div>
        </div>

        {/* Sección de equipo */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-3xl shadow-xl p-10 space-y-10 md:space-y-0 md:space-x-8 transition-all ease-in-out duration-500 hover:scale-105 hover:shadow-2xl">
          <div className="md:w-1/2">
            <img
              src={teamImage}
              alt="Our Team"
              className="w-full h-full object-cover rounded-3xl shadow-lg transform transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-bold text-indigo-800 mb-6">Meet Our Team</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our team is passionate about delivering exceptional travel experiences. Each member brings a unique set of skills to ensure your trip is memorable and stress-free.
            </p>
            <a 
              href="#contact" 
              className="mt-6 inline-block bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-500 transition duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Sección de servicios */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 rounded-3xl shadow-xl p-10 space-y-10 md:space-y-0 md:space-x-8 transition-all ease-in-out duration-500 hover:scale-105 hover:shadow-2xl">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-bold text-white mb-6">Our Services</h2>
            <p className="text-lg text-white leading-relaxed">
              We offer a wide range of services to cater to your travel needs: flight bookings, hotel reservations, personalized tours, and more.
            </p>
            <a 
              href="#services" 
              className="mt-6 inline-block bg-white text-indigo-600 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition duration-300"
            >
              Learn More
            </a>
          </div>
          <div className="md:w-1/2">
            <img
              src={servicesImage}
              alt="Our Services"
              className="w-full h-full object-cover rounded-3xl shadow-lg transform transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        {/* Sección de destinos */}
        <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-3xl shadow-xl p-10 space-y-10 md:space-y-0 md:space-x-8 transition-all ease-in-out duration-500 hover:scale-105 hover:shadow-2xl">
          <div className="md:w-1/2">
            <img
              src={destinationImage}
              alt="Destinations"
              className="w-full h-full object-cover rounded-3xl shadow-lg transform transition-transform duration-300 hover:scale-105"
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-bold text-indigo-800 mb-6">Explore Our Destinations</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Whether you're after a beach escape, cultural exploration, or an adventure tour, we have the perfect destination for you.
            </p>
            <a 
              href="#destinations" 
              className="mt-6 inline-block bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-500 transition duration-300"
            >
              Start Exploring
            </a>
          </div>
        </div>

      </div>
    </Layout>
  );
}
