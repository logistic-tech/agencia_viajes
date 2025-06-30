import React from 'react'; // Importa el módulo React para usar JSX y otras funcionalidades de React.
import ReactDOM from 'react-dom/client'; // Importa el método `createRoot` del módulo `react-dom/client` para renderizar el árbol de componentes React en el DOM.
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importa componentes de enrutamiento para gestionar la navegación.
import './index.css'; // Importa el archivo de estilos globales para aplicar estilos a la aplicación.
import App from './App.jsx'; // Importa el componente principal de la aplicación.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);