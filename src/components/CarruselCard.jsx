import React from 'react';
import Carousel from 'react-multi-carousel'; // Importa el componente Carousel para carruseles
import 'react-multi-carousel/lib/styles.css'; // Importa los estilos de Carousel

export default function CarruselCard({ data = [], title }) {
  // Configuración de los puntos de ruptura para el carrusel
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 }, // Pantallas super grandes (más de 1024px)
      items: 3, // Muestra 3 ítems
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 }, // Pantallas de escritorio (768px a 1024px)
      items: 3, // Muestra 3 ítems
    },
    tablet: {
      breakpoint: { max: 768, min: 640 }, // Pantallas de tabletas (640px a 768px)
      items: 2, // Muestra 2 ítems
    },
    mobile: {
      breakpoint: { max: 640, min: 0 }, // Pantallas móviles (menos de 640px)
      items: 1, // Muestra 1 ítem
    },
  };

  return (
    <section className="w-full overflow-hidden"> {/* Contenedor del carrusel con ocultación de desbordamiento */}
      {title && <h2 className="text-xl font-bold md:mb-3 mb-1 text-center">{title}</h2>} {/* Título opcional del carrusel */}
      <Carousel
        responsive={responsive} // Configuración de puntos de ruptura
        draggable // Permite arrastrar para cambiar el ítem
        swipeable // Permite deslizar para cambiar el ítem
        infinite // El carrusel se mueve infinitamente
        autoPlay // Reproduce automáticamente
        keyBoardControl // Controlado con el teclado
        containerClass="carousel-container" // Clase CSS para el contenedor del carrusel
        itemClass="px-1" // Clase CSS para los ítems del carrusel
        autoPlaySpeed={2000} // Velocidad de reproducción automática (2 segundos)
        className="w-full" // Clase CSS para el carrusel
      >
        {data.map((item, index) => (
          <div key={index} className="w-full"> {/* Contenedor de cada ítem del carrusel */}
            <div className="h-60 md:h-80 rounded-2xl overflow-hidden shadow-lg relative"> {/* Tarjeta con imagen */}
              <img
                src={item.img} // URL de la imagen
                alt={item.title} // Texto alternativo para la imagen
                className="w-full h-full object-cover absolute inset-0 z-0" // Estilos para la imagen
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"> {/* Contenedor del texto sobre la imagen */}
                <div className="text-white text-center p-4"> {/* Estilos para el texto */}
                  <h5 className="text-lg font-bold">{item.title}</h5> {/* Título de la tarjeta */}
                </div> 
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </section>
  );
}
