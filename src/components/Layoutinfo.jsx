
import CardInfo from './CardInfo'; // Importa el componente CardInfo para mostrar información en tarjetas


export default function Layoutinfo({ data, title, description }) {
  return (
    <div className="justify-center p-2 items-center text-center"> {/* Contenedor principal con alineación centrada */}
      {title && <h2 className="text-xl font-bold mb-1 flex justify-center items-center">{title}</h2>} {/* Título opcional */}
      
      {/* Sección para mostrar las tarjetas en una cuadrícula */}
      <section className='grid h-full p-0 md:p-1 grid-cols-2 md:grid-cols-4 gap-1 md:gap-4 sm:h-80 xl:h-80 2xl:h-96'>
        {/* Mapea los primeros 4 elementos del array data y muestra una tarjeta para cada uno */}
        {data.slice(0, 4).map((item, index) => (
          <CardInfo 
            key={index} // La propiedad key ayuda a React a identificar elementos únicos
            img={item.img} // Imagen para la tarjeta
            title={item.title} // Título para la tarjeta
            description={item.description} // Descripción para la tarjeta
          /> 
        ))}
      </section>
    </div>
  );
}
