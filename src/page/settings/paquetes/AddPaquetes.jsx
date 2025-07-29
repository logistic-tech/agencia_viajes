import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'flowbite-react';
import { crearPaquete, actualizarPaquete, subirImagen, obtenerPaquetePorId, obtenerDestinos } from '../../../services/services';

export default function AddPaquetes() {
  const { id } = useParams(); // Si existe, estamos editando
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [destinos, setDestinos] = useState([]);
  const [preview, setPreview] = useState('');
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    fecha_inicio: '',
    fecha_fin: '',
    precio: '',
    cupos_disponibles: '',
    incluye: '',
    destinoRef: '', // id del destino seleccionado
    imagen_url: '',
  });

  // Carga destinos para el select
  useEffect(() => {
    const fetchDestinos = async () => {
      const data = await obtenerDestinos();
      setDestinos(data);
    };
    fetchDestinos();
  }, []);

  // Si estamos editando, cargar datos
  useEffect(() => {
    if (id) {
      const fetchPaquete = async () => {
        setLoading(true);
        const data = await obtenerPaquetePorId(id);
        setForm({
          nombre: data.nombre || '',
          descripcion: data.descripcion || '',
          fecha_inicio: data.fecha_inicio || '',
          fecha_fin: data.fecha_fin || '',
          precio: data.precio || '',
          cupos_disponibles: data.cupos_disponibles || '',
          incluye: data.incluye || '',
          destinoRef: data.destinoRef?.id || '',
          imagen_url: data.imagen_url || '',
        });
        setPreview(data.imagen_url || '');
        setLoading(false);
      };
      fetchPaquete();
    }
  }, [id]);

  // Maneja cambio de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // Maneja subida y preview de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview local
    setPreview(URL.createObjectURL(file));

    // Subir imagen y guardar url en form
    subirImagen(file).then(url => {
      setForm(prev => ({ ...prev, imagen_url: url }));
    }).catch(() => {
      alert('Error subiendo la imagen');
    });
  };

  // Guardar paquete (crear o actualizar)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación simple
    if (!form.nombre || !form.destinoRef || !form.fecha_inicio || !form.fecha_fin) {
      alert('Por favor completa los campos obligatorios');
      return;
    }

    setLoading(true);

    try {
      if (id) {
        await actualizarPaquete(id, form);
        alert('Paquete actualizado correctamente');
      } else {
        await crearPaquete(form);
        alert('Paquete creado correctamente');
      }
      navigate('/paquetes');
    } catch (error) {
      alert('Error guardando el paquete');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{id ? 'Editar Paquete' : 'Crear Paquete'}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1" htmlFor="nombre">Nombre *</label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            className="w-full border border-gray-300 rounded p-2"
            value={form.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            className="w-full border border-gray-300 rounded p-2"
            value={form.descripcion}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1" htmlFor="fecha_inicio">Fecha Inicio *</label>
            <input
              id="fecha_inicio"
              name="fecha_inicio"
              type="date"
              className="w-full border border-gray-300 rounded p-2"
              value={form.fecha_inicio}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1" htmlFor="fecha_fin">Fecha Fin *</label>
            <input
              id="fecha_fin"
              name="fecha_fin"
              type="date"
              className="w-full border border-gray-300 rounded p-2"
              value={form.fecha_fin}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="precio">Precio *</label>
          <input
            id="precio"
            name="precio"
            type="number"
            min="0"
            className="w-full border border-gray-300 rounded p-2"
            value={form.precio}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="cupos_disponibles">Cupos disponibles</label>
          <input
            id="cupos_disponibles"
            name="cupos_disponibles"
            type="number"
            min="0"
            className="w-full border border-gray-300 rounded p-2"
            value={form.cupos_disponibles}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="incluye">Incluye</label>
          <textarea
            id="incluye"
            name="incluye"
            className="w-full border border-gray-300 rounded p-2"
            value={form.incluye}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="destinoRef">Destino *</label>
          <select
            id="destinoRef"
            name="destinoRef"
            className="w-full border border-gray-300 rounded p-2"
            value={form.destinoRef}
            onChange={handleChange}
            required
          >
            <option value="">-- Seleccione un destino --</option>
            {destinos.map(d => (
              <option key={d.id} value={d.id}>{d.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">Imagen</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-48 h-auto rounded shadow"
            />
          )}
        </div>

        <Button type="submit" disabled={loading} color="blue">
          {loading ? 'Guardando...' : (id ? 'Actualizar Paquete' : 'Crear Paquete')}
        </Button>
      </form>
    </section>
  );
}
