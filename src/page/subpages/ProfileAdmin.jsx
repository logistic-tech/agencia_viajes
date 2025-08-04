// src/page/subpages/ProfileAdmin.jsx

import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import {
  collection,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  FiUsers,
  FiFileText,
  FiFile,
  FiBox,
  FiMap,
  FiCheckSquare,
  FiBriefcase,
} from "react-icons/fi";
import AdminCreateUser from "./AdminCreateUser";
import PurchaseForm from "./PurchaseForm"; // importa el componente
import Modal from "../../components/Modal";

export default function ProfileAdmin({ onNewUserClick }) { 
  const [adults, setAdults] = useState(1);
const [children, setChildren] = useState(0);
const [passengers, setPassengers] = useState([]);
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [residence, setResidence] = useState("");
const [paymentInfo, setPaymentInfo] = useState("");
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("users");
 const [showUserModal, setShowUserModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [packages, setPackages] = useState([]);
  const [tours, setTours] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [services, setServices] = useState([]);
const [showModal, setShowModal] = useState(false);
const [modalType, setModalType] = useState(null); 
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllData = async () => {
      if (!user) return;

      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          setError("Usuario no encontrado.");
          setLoading(false);
          return;
        }

        const currentUser = userSnap.data();
        setUserData(currentUser);

        if (currentUser.role !== "admin") {
          setError("No tienes permisos para ver este contenido.");
          setLoading(false);
          return;
        }

        const [
          usersSnap,
          quotationsSnap,
          invoicesSnap,
          packagesSnap,
          toursSnap,
          ticketsSnap,
          servicesSnap,
        ] = await Promise.all([
          getDocs(collection(db, "users")),
          getDocs(collection(db, "quotations")),
          getDocs(collection(db, "bill")),
          getDocs(collection(db, "packages")),
          getDocs(collection(db, "tours")),
          getDocs(collection(db, "tickets")),
          getDocs(collection(db, "services")),
        ]);

        setUsers(usersSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setQuotations(
          quotationsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        setInvoices(
          invoicesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        setPackages(
          packagesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        setTours(toursSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setTickets(
          ticketsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        setServices(
          servicesSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (err) {
        console.error("❌ Error cargando datos:", err);
        setError("Error cargando datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [user]);

  const filteredData = (data) =>
    data.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  const renderTable = (data) => {
    const keysToShow = data.length
      ? Object.keys(data[0]).filter((key) => key !== "id" && key !== "userId")
      : [];
  const handlePurchase = async (e) => {
    e.preventDefault();
    try {
      const purchaseId = await savePurchase();
      setMessage(`✅ Compra guardada con ID: ${purchaseId}`);
      setTimeout(() => {
        navigate(`/payment-option/${purchaseId}`);
      }, 1000);
    } catch (error) {
      console.error("Error al guardar la compra:", error);
      setMessage("❌ Error al guardar la compra. Intenta de nuevo.");
    }
  };
    return (
      <div className="overflow-auto max-h-[520px] border rounded p-4 bg-white shadow">
        <Modal
  isOpen={showModal}
  onClose={() => {
    setShowModal(false);
    setModalType(null);
  }}
>
  {modalType === "user" && (
    <AdminCreateUser onClose={() => setShowModal(false)} />
  )}

  {modalType === "quotation" && (
    <PurchaseForm
      /* aquí pasas tus props: adults, children, name, email… */
      adults={adults}
      children={children}
      setAdults={setAdults}
      setChildren={setChildren}
      name={name}
      email={email}
      residence={residence}
      paymentInfo={paymentInfo}
      setName={setName}
      setEmail={setEmail}
      setResidence={setResidence}
      setPaymentInfo={setPaymentInfo}
      handlePurchase={handlePurchase}
      onClose={() => setShowModal(false)}
    />
  )}

  {modalType === "package" && (
    <PurchaseForm
      /* o tu `<PackageForm />`, con las props que necesites */
      /* ... */
      onClose={() => setShowModal(false)}
    />
  )}

  {/* repite para tours, tickets, services… */}
</Modal>
        <div className="flex flex-wrap items-center gap-3 mb-5">
           <AdminCreateUser isOpen={showUserModal} onClose={() => setShowUserModal(false)} />
          <input
            type="text"
            placeholder="Buscar..."
            className="border border-gray-300 focus:border-blue-600 focus:ring focus:ring-blue-200 rounded-md px-3 py-2 w-full sm:w-64 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={() => window.print()}
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Generate Report
          </button>
         {activeTab === "users" && (
        <button
          onClick={() => setShowUserModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
       New User
        </button>
      )}
 {activeTab === "quotations" && (
  <button
    onClick={() => {
      setModalType("quotation");
      setShowModal(true);
    }}
    className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
  >
    ➕ New Quotation
  </button>
)}
   {activeTab === "invoices" && (
    <button
      onClick={() => alert("Aquí va la lógica para crear un nuevo curso")}
      className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
    > 
      New Invoices
    </button>
  )}
  {activeTab === "packages" && (
    <button
      onClick={() => alert("Aquí va la lógica para crear un nuevo curso")}
      className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
    > 
      New Packages
    </button>
  )}
{activeTab === "tours" && (
    <button
      onClick={() => alert("Aquí va la lógica para crear un nuevo curso")}
      className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
    > 
      New Tours
    </button>
  )}
  {activeTab === "tickets" && (
    <button
      onClick={() => alert("Aquí va la lógica para crear un nuevo curso")}
      className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
    > 
      New Tickets
    </button>
  )}
   {activeTab === "services" && (
    <button
      onClick={() => alert("Aquí va la lógica para crear un nuevo curso")}
      className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700 transition"
    > 
      New Services
    </button>
  )}
        </div>
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-blue-600 sticky top-0 z-10">
            <tr>
              {keysToShow.map((key) => (
                <th
                  key={key}
                  className="px-5 py-3 border border-blue-700 text-white text-left text-sm font-semibold uppercase whitespace-nowrap"
                >
                  {key === "createdAt" ? "Fecha" : key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredData(data).map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className={`border border-gray-300 hover:bg-blue-50 transition`}
              >
                {keysToShow.map((key, idx) => (
                  <td
                    key={idx}
                    className="px-5 py-3 border border-gray-300 whitespace-nowrap text-sm text-gray-700"
                  >
                    {key === "createdAt" && item[key]?.seconds
                      ? new Date(item[key].seconds * 1000).toLocaleDateString()
                      : typeof item[key] === "object" && item[key] !== null
                      ? Array.isArray(item[key])
                        ? item[key].join(", ")
                        : Object.values(item[key]).join(" ")
                      : item[key]?.toString()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  if (loading)
    return (
      <section>
        <p className="p-6 text-center text-gray-600 text-lg">Cargando...</p>
      </section>
    );
  if (!user)
    return (
      <section>
        <p className="p-6 text-center text-gray-600 text-lg">
          You must be logged in.
        </p>
      </section>
    );
  if (error)
    return (
      <section>
        <p className="p-6 text-center text-red-600 text-lg">{error}</p>
      </section>
    );

  return (
    <section>
      <div className="flex min-h-screen bg-gray-50">
        <aside className="w-64 bg-blue-900 text-white p-6 sticky top-0 h-screen overflow-auto shadow-lg">
          <h2 className="text-2xl font-bold mb-8 tracking-wide">Admin Panel</h2>
          <ul className="space-y-4">
            <MenuButton
              icon={<FiUsers size={20} />}
              label="Usuarios"
              tab="users"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <MenuButton
              icon={<FiFileText size={20} />}
              label="Cotizaciones"
              tab="quotations"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <MenuButton
              icon={<FiFile size={20} />}
              label="Facturas"
              tab="invoices"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <MenuButton
              icon={<FiBox size={20} />}
              label="Paquetes"
              tab="packages"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <MenuButton
              icon={<FiMap size={20} />}
              label="Tours"
              tab="tours"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <MenuButton
              icon={<FiCheckSquare size={20} />}
              label="Tickets"
              tab="tickets"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            <MenuButton
              icon={<FiBriefcase size={20} />}
              label="Servicios"
              tab="services"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </ul>
        </aside>

        <main className="flex-1 p-10 overflow-auto">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-8 capitalize">
            {activeTab}
          </h1>
          {renderTable(getDataByTab())}
        </main>
      </div>
    </section>
  );

  function getDataByTab() {
    switch (activeTab) {
      case "users":
        return users;
      case "quotations":
        return quotations;
      case "invoices":
        return invoices;
      case "packages":
        return packages;
      case "tours":
        return tours;
      case "tickets":
        return tickets;
      case "services":
        return services;
      default:
        return [];
    }
  }
}

function MenuButton({ icon, label, tab, activeTab, setActiveTab }) {
  const isActive = activeTab === tab;
  return (
    <li>
      <button
        onClick={() => setActiveTab(tab)}
        className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-md font-semibold transition-colors duration-200 ${
          isActive
            ? "bg-white text-blue-900 shadow-lg"
            : "hover:bg-blue-800 hover:text-white text-blue-300"
        }`}
      >
        {icon}
        <span>{label}</span>
      </button>
    </li>
  );
}
