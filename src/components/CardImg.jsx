import React from 'react';
import { Card } from 'flowbite-react'; // Importa el componente Card de Flowbite

export default function CardImg({ img, title }) {
  return (
    <section className='w-full rounded-xl'> {/* Contenedor de la tarjeta, con un borde redondeado */}
      <Card className="w-full h-full rounded-xl relative overflow-hidden group"> {/* Tarjeta de Flowbite */}
        <div
        //Estilo para la imagen de fondo 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-in-out group-hover:scale-110" 
          // La imagen de fondo se establece mediante la URL pasada en `img` 
          style={{ backgroundImage: `url(${img})` }} >

        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-transparent to-transparent"> {/* Contenedor del título con un gradiente de fondo */}
          <h5 className="text-lg md:text-2xl font-bold tracking-tight text-white z-10"> {/* Título de la tarjeta */}
            {title} {/* Muestra el título pasado como propiedad */}
          </h5>
        </div>
      </Card>
    </section>
  );
}
