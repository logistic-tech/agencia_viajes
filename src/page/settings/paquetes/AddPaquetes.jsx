import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FiImage } from 'react-icons/fi';
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
  const [selectedImage, setSelectedImage] = useState(null); // NUEVO
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
    setSelectedImage(file); // Guardamos el archivo
    setPreview(URL.createObjectURL(file)); // Mostramos preview
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.destinoRef || !form.fecha_inicio || !form.fecha_fin) {
      alert('Por favor completa los campos obligatorios');
      return;
    }

    setLoading(true);
    try {
      let paqueteId = id;

      if (id) {
        await actualizarPaquete(id, form);
      } else {
        // Crear paquete sin imagen primero
        const newId = await crearPaquete({ ...form, imagen_url: '' });
        paqueteId = newId;
      }

      // Si hay imagen seleccionada, subirla con el UID
      if (selectedImage && paqueteId) {
        const url = await subirImagen(selectedImage, paqueteId);
        console.log('Imagen subida:', url);
        await actualizarPaquete(paqueteId, { imagen_url: url });
      }

      alert(id ? 'Paquete actualizado correctamente' : 'Paquete creado correctamente');
      navigate('/setting/paquete');

    } catch (error) {
      console.error(error);
      alert('Error guardando el paquete');
    } finally {
      setLoading(false);
    }
  };

  return (
     <section className="max-w-4xl mx-auto px-4 py-8 bg-white dark:bg-white text text-gray-800">
      <h1 className="text-3xl font-bold mb-6">{id ? 'Editar Paquete' : 'Crear Paquete'}</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        {/* Nombre */}
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

        {/* Descripción */}
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

        {/* Fechas */}
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

        {/* Precio y cupos */}
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

        {/* Incluye */}
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

        {/* Destino */}
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

        {/* Imagen */}
        <div>
          <label className="block mb-2 font-semibold">Imagen</label>

          <div className="flex items-center gap-4">
            <label htmlFor="imagen" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700">
              <FiImage className="text-xl" />
              <span>Seleccionar Imagen</span>
            </label>
{/*             <span className="text-sm text-gray-600 truncate max-w-[200px]">
              {form.imagen?.name || 'Ninguna imagen seleccionada'}
            </span> */}
          </div>

          <input
            type="file"
            id="imagen"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 w-80 h-auto rounded shadow border"
            />
          )}
        </div>

        {/* Botón submit */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded text-white font-medium transition ${
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
