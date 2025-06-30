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
import { FaPen, FaSave, FaRegTimesCircle } from "react-icons/fa";
import { Tabs } from "flowbite-react";
import {
  HiOutlineCube,
  HiOutlineGlobeAlt,
  HiOutlineDocumentText,
  HiOutlineUserCircle,
  HiOutlineTicket
} from "react-icons/hi";

export default function Profile() {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({ name: "", lastName: "", email: "" });
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
          setEditedData({ name: data.name || "", lastName: data.lastName || "", email: data.email || "" });
        }

        const qSnap = await getDocs(query(collection(db, "quotations"), where("userId", "==", user.uid)));
        setQuotations(qSnap.docs.map(d => ({ id: d.id, ...d.data() })));

        const bSnap = await getDocs(query(collection(db, "bill"), where("userId", "==", user.uid)));
        setBills(bSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (err) {
        console.error(err);
        setError("Error loading data.");
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
      setSuccessMessage("Profile updated!");
    } catch (err) {
      console.error(err);
      setError("Update failed.");
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    if (userData) {
      setEditedData({ name: userData.name, lastName: userData.lastName, email: userData.email });
    }
  };

  return (
    <Layout>
      {/* Perfil */}
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-semibold mb-4">Account</h1>
        {user ? (
          <div className="bg-white p-6 rounded-lg shadow max-w-lg mx-auto">
            {["email", "name", "lastName"].map(field => (
              <div className="mb-3" key={field}>
                <label className="font-medium block capitalize mb-1">{field}:</label>
                {editMode ? (
                  <input
                    type={field === "email" ? "email" : "text"}
                    value={editedData[field]}
                    onChange={e => setEditedData({ ...editedData, [field]: e.target.value })}
                    className="w-full px-3 py-2 border rounded focus:outline-none"
                  />
                ) : (
                  <p className="text-gray-700">{userData?.[field]}</p>
                )}
              </div>
            ))}
            <div className="flex space-x-4">
              {editMode ? (
                <>
                  <button onClick={handleSave} className="bg-blue-500 px-4 py-2 text-white rounded">Save</button>
                  <button onClick={handleCancel} className="bg-red-500 px-4 py-2 text-white rounded">Cancel</button>
                </>
              ) : (
                <button onClick={() => setEditMode(true)} className="bg-green-500 px-4 py-2 text-white rounded">Edit</button>
              )}
            </div>
            {error && <p className="mt-2 text-red-500">{error}</p>}
            {successMessage && <p className="mt-2 text-green-500">{successMessage}</p>}
          </div>
        ) : (
          <p className="text-gray-600">You are not logged in.</p>
        )}
      </div>


      {/* Tabla Cotizaciones */}
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">My Quotations</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="px-4 py-2">Package</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {quotations.length ? (
                quotations.map(q => (
                  <tr key={q.id} className="border-t">
                    <td className="px-4 py-2">{q.package}</td>
                    <td className="px-4 py-2">${q.price}</td>
                    <td className="px-4 py-2">{q.quantity}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="3" className="text-center py-4">No quotations found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabla Facturas */}
      <div className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">My Bills</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="px-4 py-2">Invoice #</th>
                <th className="px-4 py-2">Total</th>
                <th className="px-4 py-2">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {bills.length ? (
                bills.map(b => (
                  <tr key={b.id} className="border-t">
                    <td className="px-4 py-2">{b.invoiceNumber || b.id}</td>
                    <td className="px-4 py-2">${b.total}</td>
                    <td className="px-4 py-2">{b.quantity}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="3" className="text-center py-4">No bills found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
