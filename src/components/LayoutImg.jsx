import React from 'react'; // Importa la biblioteca de React para usar componentes.
import CardImg from './CardImg'; // Importa el componente CardImg desde el archivo local './CardImg'.

// Definición del componente LayoutImg
export default function LayoutImg({ data, title }) {
  return (
    <div className="justify-center p-4 items-center text-center">
      {/* Muestra el título solo si se proporciona */}
      {title && (
        <h2 className="text-xl font-bold mb-1 flex justify-center items-center">
          {title}
        </h2>
      )}

      {/* Sección que muestra las primeras 4 imágenes */}
      <section className='md:mb-12 mb-1 grid h-60 p-0 md:p-1 grid-cols-2 md:grid-cols-4 gap-1 md:gap-1 sm:h-80 xl:h-80 2xl:h-96'>
        {/* Itera sobre los primeros 4 elementos de 'data' y renderiza un CardImg para cada uno */}
        {data.slice(0, 4).map((item, index) => (
          <CardImg key={index} img={item.img} title={item.title} />
        ))}
      </section>

      {/* Sección que muestra el resto de las imágenes */}
      <section className='mb-2 grid h-56 p-0 md:p-1 grid-cols-2 md:grid-cols-4 gap-1 md:gap-1 sm:h-64 xl:h-80 2xl:h-96 md:-mt-10'>
        {/* Itera sobre los elementos restantes de 'data' y renderiza un CardImg para cada uno */}
        {data.slice(4).map((item, index) => (
          <CardImg key={index} img={item.img} title={item.title} />
        ))}
      </section>
    </div>
  );
}
