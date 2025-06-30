import { Button } from "flowbite-react"; // Importa el componente Button de Flowbite
import { Link } from 'react-router-dom'; // Importa el componente Link para la navegación en la aplicación


export function ButtonIcon({ label, icon, classname, link, classnamebtn, left = false, onClick, type, disabled = false }) {
  return (
    <div className={classname}> {/* Contenedor del botón, con una clase CSS opcional */}
      <Link to={link} className="flex"> {/* Envolvente Link para navegación */}
        <Button className={classnamebtn} type={type} onClick={onClick} disabled={disabled}> {/* Botón de Flowbite */}
          {left ? icon : ""} {/* Muestra el ícono a la izquierda si `left` es true */}
          {label} {/* Muestra la etiqueta del botón */}
          {!left ? icon : ""} {/* Muestra el ícono a la derecha si `left` es false */}
        </Button>
      </Link>
    </div>
  );
}