import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
  query,
  where
} from "firebase/firestore";
import Layout from "../layout/Layout";
import { FaPen, FaSave, FaTimes } from "react-icons/fa";

export default function Profile() {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    birthDate: ""
  });
  const [quotations, setQuotations] = useState([]);
  const [bills, setBills] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          setEditedData({
            name: data.name || "",
            lastName: data.lastName || "",
            email: data.email || "",
            phone: data.phone || "",
            address: data.address || "",
            birthDate: data.birthDate || ""
          });
        }

        const qSnap = await getDocs(query(collection(db, "quotations"), where("userId", "==", user.uid)));
        setQuotations(qSnap.docs.map(d => ({ id: d.id, ...d.data() })));

        const bSnap = await getDocs(query(collection(db, "bill"), where("userId", "==", user.uid)));
        setBills(bSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error(err);
        setError("Error al cargar los datos.");
      }
    };
    fetchData();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    try {
      await updateDoc(doc(db, "users", user.uid), editedData);
      setUserData({ ...userData, ...editedData });
      setEditMode(false);
      setSuccessMessage("¡Perfil actualizado correctamente!");
      setError("");
    } catch (err) {
      console.error(err);
      setError("No se pudo actualizar el perfil.");
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    if (userData) {
      setEditedData({
        name: userData.name,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone || "",
        address: userData.address || "",
        birthDate: userData.birthDate || ""
      });
    }
  };

  return (
    <Layout>
      {/* Perfil */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Mi Perfil</h1>
        {user ? (
          <div className="bg-white p-6 rounded-2xl shadow-xl max-w-xl mx-auto space-y-4">
            {[
              { label: "Correo electrónico", field: "email", type: "email" },
              { label: "Nombre", field: "name", type: "text" },
              { label: "Apellido", field: "lastName", type: "text" },
              { label: "Teléfono", field: "phone", type: "tel" },
              { label: "Dirección", field: "address", type: "text" },
              { label: "Fecha de nacimiento", field: "birthDate", type: "date" }
            ].map(({ label, field, type }) => (
              <div key={field}>
                <label className="block text-gray-700 font-semibold mb-1">{label}:</label>
                {editMode ? (
                  <input
                    type={type}
                    value={editedData[field]}
                    onChange={e => setEditedData({ ...editedData, [field]: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                ) : (
                  <p className="text-gray-600">
                    {field === "birthDate" && userData?.[field]
                      ? new Date(userData[field]).toLocaleDateString()
                      : userData?.[field] || "No especificado"}
                  </p>
                )}
              </div>
            ))}

            <div className="flex justify-end gap-3 mt-4">
              {editMode ? (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                  >
                    <FaSave /> Guardar
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                  >
                    <FaTimes /> Cancelar
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                >
                  <FaPen /> Editar
                </button>
              )}
            </div>

            {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
            {successMessage && <p className="text-green-600 mt-2 text-sm">{successMessage}</p>}
          </div>
        ) : (
          <p className="text-gray-600">No has iniciado sesión.</p>
        )}
      </div>

      {/* Cotizaciones */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Mis Cotizaciones</h2>
        <div className="overflow-x-auto rounded-lg shadow bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Paquete</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Precio</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Cantidad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {quotations.length ? (
                quotations.map(q => (
                  <tr key={q.id}>
                    <td className="px-6 py-3 text-gray-600">{q.package}</td>
                    <td className="px-6 py-3 text-gray-600">${q.price}</td>
                    <td className="px-6 py-3 text-gray-600">{q.quantity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">No se encontraron cotizaciones.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Facturas */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Mis Facturas</h2>
        <div className="overflow-x-auto rounded-lg shadow bg-white">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Factura #</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Total</th>
                <th className="px-6 py-3 text-left font-semibold text-gray-700">Cantidad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bills.length ? (
                bills.map(b => (
                  <tr key={b.id}>
                    <td className="px-6 py-3 text-gray-600">{b.invoiceNumber || b.id}</td>
                    <td className="px-6 py-3 text-gray-600">${b.total}</td>
                    <td className="px-6 py-3 text-gray-600">{b.quantity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-gray-500">No se encontraron facturas.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
