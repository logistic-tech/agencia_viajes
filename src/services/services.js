

const BASE_URL = import.meta.env.VITE_API_URL;

export const obtenerDestinos = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/destinos`);
    if (!response.ok) {
      throw new Error('No se pudieron obtener los destinos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener destinos:', error);
    throw error;
  }
};

export const obtenerPaquetes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/paquetes`);
    if (!response.ok) {
      throw new Error('No se pudieron obtener los paquetes');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener paquetes:', error);
    throw error;
  }
};

// También puedes agregar este si vas a consultar paquetes por destino:
export const obtenerPaquetesPorDestino = async (destinoId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/paquetes/destino/${destinoId}`);
    if (!response.ok) {
      throw new Error('No se pudieron obtener los paquetes para este destino');
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener paquetes por destino:', error);
    throw error;
  }
};