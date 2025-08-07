import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import { obtenerPaquetes } from '../../../services/services';

export default function Paquetes() {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      const data = await obtenerPaquetes();
      console.log(data);
      setPackages(data);
    };
    fetchPackages();
  }, []);

  const onAddClick = () => {
    navigate('/setting/paquetes/nuevo');
  };

  const onEditClick = (paquete) => {
    navigate(`/setting/paquetes/editar/${paquete.id}`);
  };

  return (
    <section className="p-6">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Paquetes turísticos</h1>
        <button onClick={onAddClick}>
          <FaPlus className="mr-2" /> Agregar paquete
        </button>
      </header>

      <div className="overflow-x-auto rounded-lg border border-gray-100">
        <table role="table" className="min-w-full divide-y divide-gray-100 text-sm">
          <caption className="text-left text-sm text-gray-500 p-2">
            Lista de paquetes turísticos disponibles
          </caption>
          <thead className="bg-blue-50 text-gray-700">
            <tr>
              <th scope="col" className="px-4 py-3 text-left font-medium">Nombre</th>
              <th scope="col" className="px-4 py-3 text-left font-medium">Destino</th>
              <th scope="col" className="px-4 py-3 text-left font-medium">Duración</th>
              <th scope="col" className="px-4 py-3 text-left font-medium">Precio</th>
              <th scope="col" className="px-4 py-3 text-left font-medium">Cupos</th>
              <th scope="col" className="px-4 py-3 text-left font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {packages.map((paquete) => (
              <tr key={paquete.id} className="even:bg-blue-50">
                <td className="px-4 py-3 text-gray-800">{paquete.nombre}</td>
                <td className="px-4 py-3 text-gray-800">{paquete.destino}</td>
                <td className="px-4 py-3 text-gray-800">
                  {paquete.fecha_inicio} al {paquete.fecha_fin}
                </td>
                <td className="px-4 py-3 text-gray-800">${paquete.precio}</td>
                <td className="px-4 py-3 text-gray-800">{paquete.cupos_disponibles}</td>
                <td className="px-4 py-3">
  <button
    onClick={() => onEditClick(paquete)}
    className="px-2 py-1 text-sm rounded border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
  >
    Editar
  </button>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
