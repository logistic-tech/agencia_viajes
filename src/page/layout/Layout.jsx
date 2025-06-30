import React from 'react'
import Menu from './Menu'
import { PiePagina } from './PiePagina';

// Definición del componente Layout que acepta dos props: `children` y `mainBg`.
export default function Layout({ children, mainBg }) {
  return (
    // Se usa un contenedor `section` con la clase `flex flex-col w-screen` para crear una estructura de diseño de columna flexible que ocupa el ancho completo de la pantalla.
    <section className='flex flex-col w-screen'>
      
      {/* 
        El `header` contiene el componente `Menu`. 
        La clase `w-screen` asegura que el encabezado ocupe todo el ancho de la pantalla.
      */}
      <header className="w-screen" >
        <Menu />
      </header>
      
      {/* 
        El `main` es el área principal del contenido. 
        La clase `flex-grow` permite que el `main` crezca para ocupar el espacio restante disponible.
        La clase `p-0` elimina el relleno y `overflow-y-auto` permite el desplazamiento vertical si el contenido excede el área visible.
        El estilo en línea `background: mainBg` establece el color de fondo del área principal basado en el valor pasado como prop `mainBg`.
      */}
      <main className="flex-grow p-0 overflow-y-auto" style={{ background: mainBg }}>
        {children}
      </main>
      
      {/* 
        El `footer` contiene el componente `PiePagina`. 
        La clase `flex-grow` permite que el pie de página también crezca para ocupar el espacio disponible.
        La clase `p-0` elimina el relleno y `overflow-y-auto` permite el desplazamiento vertical si es necesario.
      */}
      <footer className="flex-grow p-0 overflow-y-auto" >
        <PiePagina />
      </footer>
    </section>
  );
}
