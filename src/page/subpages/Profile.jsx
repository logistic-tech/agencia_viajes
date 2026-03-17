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
import { FaPen, FaSave, FaTimes, FaEnvelope, FaPhone, FaHome, FaBirthdayCake } from "react-icons/fa";

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
    <section className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4 space-y-10">
        {/* PERFIL */}
        <div className="bg-white rounded-2xl shadow-xl p-6 max-w-3xl mx-auto">
          <div className="flex items-center gap-6 mb-6">
            <img
  src={userData?.avatar || "https://i.pravatar.cc/150?img=3"} // Cambiado a dinámico
  alt="Avatar"
  className="w-24 h-24 rounded-full shadow-lg"
/>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {userData?.name} {userData?.lastName}
              </h1>
              <p className="text-gray-500">{userData?.email}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: <FaEnvelope />, label: "Correo electrónico", field: "email", type: "email" },
              { icon: <FaPhone />, label: "Teléfono", field: "phone", type: "tel" },
              { icon: <FaHome />, label: "Dirección", field: "address", type: "text" },
              { icon: <FaBirthdayCake />, label: "Fecha de nacimiento", field: "birthDate", type: "date" }
            ].map(({ icon, label, field, type }) => (
              <div key={field} className="flex flex-col">
                <span className="flex items-center gap-2 text-gray-700 font-semibold mb-1">{icon} {label}</span>
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
          </div>

          <div className="flex justify-end gap-3 mt-6">
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

          {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}
          {successMessage && <p className="text-green-600 mt-3 text-sm">{successMessage}</p>}
        </div>

        {/* COTIZACIONES */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Mis Cotizaciones</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quotations.length ? (
              quotations.map(q => (
                <div key={q.id} className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{q.package}</h3>
                  <p className="text-gray-600"><strong>Precio:</strong> ${q.price}</p>
                  <p className="text-gray-600"><strong>Cantidad:</strong> {q.quantity}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No se encontraron cotizaciones.</p>
            )}
          </div>
        </div>

        {/* FACTURAS */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Mis Facturas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bills.length ? (
              bills.map(b => (
                <div key={b.id} className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Factura #{b.invoiceNumber || b.id}</h3>
                  <p className="text-gray-600"><strong>Total:</strong> ${b.total}</p>
                  <p className="text-gray-600"><strong>Cantidad:</strong> {b.quantity}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No se encontraron facturas.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
