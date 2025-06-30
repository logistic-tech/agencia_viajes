import React from 'react';
import { Card } from 'flowbite-react'; // Importa el componente Card de Flowbite

export default function CardInfo({ img, title, description }) {
  return (
    <section className='rounded-xl overflow-hidden border-none shadow-lg'> {/* Contenedor de la tarjeta con bordes redondeados y sombra */}
      <Card className="max-w-sm h-40 md:h-80 rounded-xl relative overflow-hidden"> {/* Tarjeta de Flowbite con tamaño máximo de tarjeta y alto fijo */}
        {/* Imagen de la tarjeta */}
        <img src={img} className="w-full h-full object-cover" alt="Card image" /> {/* Imagen que cubre todo el contenedor, ajustada para mantener sus proporciones */}
        
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white bg-opacity-100"> {/* Contenedor para el título y la descripción, posicionado en la parte inferior */}
          {/* Título */}
          <h5 className="text-lg font-bold tracking-tight text-gray-900 h-10 overflow-hidden"> {/* Título con estilo, con altura fija y texto recortado si es demasiado largo */}
            {title} {/* Muestra el título pasado como propiedad */}
          </h5>
  
          <p className="text-base text-gray-700 h-24 overflow-hidden"> {/* Descripción con estilo, con altura fija y texto recortado si es demasiado largo */}
            {description} {/* Muestra la descripción pasada como propiedad */}
          </p>
        </div>
      </Card>
    </section>
  );
}
