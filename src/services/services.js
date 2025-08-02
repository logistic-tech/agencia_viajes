const BASE_URL = import.meta.env.VITE_API_URL;


export const subirImagen = async (file, uidPaquete) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('folder', 'paquetes');

  const extension = file.name.split('.').pop();
  const renamedFile = new File([file], `${uidPaquete}.${extension}`, { type: file.type });

  formData.set('image', renamedFile);

  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/images/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Error al subir la imagen');
  }

  const data = await response.json();
  return data.url; // URL pública de Firebase Storage
};

export const obtenerDestinos = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/destinos`);
    if (!response.ok) throw new Error('No se pudieron obtener los destinos');
    return await response.json();
  } catch (error) {
    console.error('Error al obtener destinos:', error);
    throw error;
  }
};

export const obtenerPaquetes = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/paquetes`);
    if (!response.ok) throw new Error('No se pudieron obtener los paquetes');
    return await response.json();
  } catch (error) {
    console.error('Error al obtener paquetes:', error);
    throw error;
  }
};

export const obtenerPaquetesPorDestino = async (destinoId) => {
  try {
    const response = await fetch(`${BASE_URL}/api/paquetes/destino/${destinoId}`);
    if (!response.ok) throw new Error('No se pudieron obtener los paquetes para este destino');
    return await response.json();
  } catch (error) {
    console.error('Error al obtener paquetes por destino:', error);
    throw error;
  }
};

export const crearPaquete = async (datos) => {
  try {
    const response = await fetch(`${BASE_URL}/api/paquetes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });
    if (!response.ok) throw new Error('No se pudo crear el paquete');
    return await response.json();
  } catch (error) {
    console.error('Error al crear paquete:', error);
    throw error;
  }
};

export const actualizarPaquete = async (id, datos) => {
  try {
    const response = await fetch(`${BASE_URL}/api/paquetes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos),
    });
    if (!response.ok) throw new Error('No se pudo actualizar el paquete');
    return await response.json();
  } catch (error) {
    console.error('Error al actualizar paquete:', error);
    throw error;
  }
};

export const obtenerPaquetePorId = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/paquetes/${id}`);
    if (!response.ok) throw new Error('No se pudo obtener el paquete');
    return await response.json();
  } catch (error) {
    console.error('Error al obtener paquete por ID:', error);
    throw error;
  }
};
