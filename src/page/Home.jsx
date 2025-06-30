import React from 'react';
import Layout from './layout/Layout';
import Fqs from '../components/Fqs';
import LayoutImg from '../components/LayoutImg';
import CarruselCard from '../components/CarruselCard';
import Layoutinfo from '../components/Layoutinfo';
import ImgRoute from '../components/ImgRoute';
import img from '../assets/hungria.webp'; 
import img1 from '../assets/paris.webp';
import img2 from '../assets/china.webp';
import img3 from '../assets/belgica.webp';
import img4 from '../assets/brasil.webp';
import img5 from '../assets/colombia.webp'; 
import img6 from '../assets/vietnam.webp';
import img7 from '../assets/qatar.webp';
import img8 from '../assets/surcorea.webp';
import img9 from '../assets/cangilonesGualaca.webp'; 
import img10 from '../assets/cascadabermejo.webp';
import img11 from '../assets/cascadaschorrillito.webp';
import img12 from '../assets/islabastimentos.webp';
import img13 from '../assets/bovedas.webp'; 
import img14 from '../assets/sanblas.webp';
import img15 from '../assets/panamavieja.webp';
import img16 from '../assets/bocas.webp';

export default function Home() {

  // Cuadricula de paquetes internacionales
  const imgLayout = [
    { img: img1, title: 'Paris, France' },
    { img: img3, title: 'Brujas, Bélgica' },
    { img: img2, title: 'Beijing, China' },
    { img: img4, title: 'Río de Janeiro, Brasil' },
    { img: img5, title: 'Cartagena, Colombia' },
    { img: img6, title: 'Hanoi, Vietnam' },
    { img: img7, title: 'Doha, Qatar' },
    { img: img8, title: 'Seul, Corea del Sur' }
  ];
  
  // Carrusel de paquetes nacionales
  const carruImg = [
    { img: img9, title: 'Los Cangilones de Gualaca, Chiriqui' },
    { img: img10, title: 'Cascada de Bermejo, Veraguas' },
    { img: img11, title: 'Cascadas de Chorrillito, Veraguas' },
    { img: img12, title: 'Isla Bastimentos, Bocas del Toro' },
    { img: img13, title: 'Las Bovedas, Panama' },
    { img: img14, title: 'San Blas, Guna Yala' },
    { img: img15, title: 'Panama la Vieja, Panama' },
    { img: img16, title: 'Bocas del Toro' }
  ];

  // Cards de tips y recomendaciones
  const infoLayout = [
    { img: img9, title: 'Planning ahead', description: 'Be sure to plan your trip well in advance to get better prices and availability on flights, hotels and activities.' },
    { img: img10, title: 'Necessary documentation', description: 'Check visa requirements and other documents needed to enter the country you will be visiting, and make sure you have everything in order before you leave.' },
    { img: img11, title: 'Travel Insurance', description: 'Consider taking out travel insurance to protect you against unforeseen events such as cancellations, medical emergencies or lost luggage.' },
    { img: img12, title: 'Budget and expenses', description: 'Set a clear budget for your trip and keep track of your expenses so you do not overspend.' }
  ];

  return (
    <Layout>
      {/* Sección para mostrar una imagen de ruta con un enlace */}
      <section className="relative overflow-hidden">
        <ImgRoute
          imageUrl={img} // Imagen de fondo.
          title="Find the best packages with Logistic Travels & Tours" // Título sobre la imagen.
          url="/packages" // Enlace al que redirige el botón.
          buttonText='Search Packages...' // Texto del botón.
          className="rounded-xl shadow-xl transition-transform duration-500 transform hover:scale-105"
        />
      </section>

      {/* Sección para mostrar una serie de imágenes con un título */}
      <section className="w-full mt-16 px-4 py-12 bg-gradient-to-r from-blue-50 to-blue-100">
        <LayoutImg 
          data={imgLayout} // Datos de imágenes y títulos.
          title="Discover the most beautiful cities in the world with us!" // Título para la sección de imágenes.
          className="text-center"
        />
      </section>

      {/* Sección para mostrar un carrusel de imágenes */}
      <section className="mb-12 px-4 py-12 bg-white shadow-lg rounded-xl">
        <CarruselCard 
          data={carruImg} // Datos del carrusel.
          title="Discover the most beautiful places of our country PANAMA with us!" // Título para el carrusel.
        />
      </section>

      {/* Sección para mostrar consejos y recomendaciones de viaje */}
      <section className="px-4 py-12 bg-gradient-to-r from-teal-100 to-teal-200">
        <Layoutinfo 
          title="Travel Tips and Recommendations" // Título de la sección de consejos.
          data={infoLayout} // Datos de consejos y recomendaciones.
          className="text-center"
        />
      </section>

      {/* Sección para mostrar preguntas frecuentes */}
      <section className="px-4 py-12">
        <Fqs /> {/* Componente para mostrar preguntas frecuentes. */}
      </section>
    </Layout>
  );
}
