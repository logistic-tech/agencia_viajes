import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  crearPaquete,
  actualizarPaquete,
  subirImagen,
  obtenerPaquetePorId,
  obtenerDestinos
} from '../../../services/services';

export default function AddPaquetes() {
  const { id } = useParams();
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
    destinoRef: '',
    imagen_url: '',
  });

  useEffect(() => {
    const fetchDestinos = async () => {
      const data = await obtenerDestinos();
      setDestinos(data);
    };
    fetchDestinos();
  }, []);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!id) {
      alert('Primero guarda el paquete para subir la imagen');
      return;
    }

    setPreview(URL.createObjectURL(file));

    subirImagen(file, id)
      .then((url) => {
        setForm((prev) => ({ ...prev, imagen_url: url }));
      })
      .catch(() => {
        alert('Error subiendo la imagen');
      });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

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
        navigate('/setting/paquete');
      } catch (error) {
        console.error(error);
        alert('Error guardando el paquete');
      } finally {
        setLoading(false);
      }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{id ? 'Editar Paquete' : 'Crear Paquete'}</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <div>
          <label htmlFor="nombre" className="block mb-1 font-semibold">Nombre *</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 p-2"
          />
        </div>

        <div>
          <label htmlFor="descripcion" className="block mb-1 font-semibold">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 p-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="fecha_inicio" className="block mb-1 font-semibold">Fecha Inicio *</label>
            <input
              type="date"
              id="fecha_inicio"
              name="fecha_inicio"
              value={form.fecha_inicio}
              onChange={handleChange}
              required
              className="w-full rounded border border-gray-300 p-2"
            />
          </div>
          <div>
            <label htmlFor="fecha_fin" className="block mb-1 font-semibold">Fecha Fin *</label>
            <input
              type="date"
              id="fecha_fin"
              name="fecha_fin"
              value={form.fecha_fin}
              onChange={handleChange}
              required
              className="w-full rounded border border-gray-300 p-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="precio" className="block mb-1 font-semibold">Precio *</label>
            <input
              type="number"
              id="precio"
              name="precio"
              value={form.precio}
              onChange={handleChange}
              required
              className="w-full rounded border border-gray-300 p-2"
            />
          </div>
          <div>
            <label htmlFor="cupos_disponibles" className="block mb-1 font-semibold">Cupos disponibles</label>
            <input
              type="number"
              id="cupos_disponibles"
              name="cupos_disponibles"
              value={form.cupos_disponibles}
              onChange={handleChange}
              className="w-full rounded border border-gray-300 p-2"
            />
          </div>
        </div>

        <div>
          <label htmlFor="incluye" className="block mb-1 font-semibold">Incluye</label>
          <textarea
            id="incluye"
            name="incluye"
            value={form.incluye}
            onChange={handleChange}
            className="w-full rounded border border-gray-300 p-2"
          />
        </div>

        <div>
          <label htmlFor="destinoRef" className="block mb-1 font-semibold">Destino *</label>
          <select
            id="destinoRef"
            name="destinoRef"
            value={form.destinoRef}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 p-2"
          >
            <option value="">-- Seleccione un destino --</option>
            {destinos.map(dest => (
              <option key={dest.id} value={dest.id}>{dest.nombre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Imagen</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mb-2"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-48 h-auto rounded shadow"
            />
          )}
        </div>

       <div>
  <button
    type="submit"
    disabled={loading}
    className={`px-4 py-2 rounded text-white font-medium ${
      loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
    }`}
  >
    {loading ? 'Guardando...' : id ? 'Actualizar Paquete' : 'Crear Paquete'}
  </button>
</div>

      </form>
    </section>
  );
}
