import React from 'react';

// Definición del componente ImgRoute
export default function ImgRoute  ({ imageUrl, buttonText, url, title }){
  return (
    <div
      // Contenedor principal del componente con clases de Tailwind CSS para el estilo
      className="flex flex-col items-start justify-center bg-cover bg-center min-h-[400px] p-6 rounded-lg shadow-md mb-6"
      // Establece la imagen de fondo usando la propiedad backgroundImage
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {/* Sección interna que contiene el título y el botón */}
      <section
        className='bg-white h-64 w-64 flex flex-col items-center justify-center p-3 mb-3 rounded-2xl'
        // Establece un color de fondo semi-transparente para el contenedor interno
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
      >
        {/* Título del componente */}
        <p
          className="text-2xl font-semibold text-blue-900 mb-4 bg-transparent bg-opacity-70 p-2 rounded"
        >
          {title}
        </p>
        {/* Botón que enlaza a la URL proporcionada */}
        <a
          href={url}
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {buttonText}
        </a>
      </section>
    </div>
  );
};

