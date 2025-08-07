
import Menu from './Menu';
import { PiePagina } from './PiePagina';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Encabezado principal de la página */}
      <header className="w-full">
        <Menu />
      </header>

      {/* Contenido principal de la página */}
      <main className="flex-grow overflow-y-auto bg-white dark:bg-white" >
        <Outlet />
      </main>

      {/* Pie de página */}
      <footer className="w-full">
        <PiePagina />
      </footer>
    </div>
  );
}
