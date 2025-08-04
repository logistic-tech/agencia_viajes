import React from 'react';

export default function CardInfo({ img, title, description }) {
  return (
    <section className="rounded-xl overflow-hidden border-none shadow-lg max-w-sm h-40 md:h-80 relative">
      {/* Imagen de fondo */}
      <img src={img} className="w-full h-full object-cover" alt="Card image" />

      {/* Contenedor del contenido superpuesto */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-100">
        <h5 className="text-lg font-bold tracking-tight text-gray-900 h-10 overflow-hidden">
          {title}
        </h5>
        <p className="text-base text-gray-700 h-24 overflow-hidden">
          {description}
        </p>
      </div>
    </section>
  );
}
