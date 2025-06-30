import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import Layout from "../layout/Layout";

export default function ProfileAdmin() {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [packages, setPackages] = useState([]);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Cargar datos del usuario (incluido su rol)
  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUserData(data);

            if (data.role === "admin") {
              await fetchData(); // Cargar datos solo si es admin
            } else {
              setError("No tienes permisos para ver este contenido.");
            }
          } else {
            setError("No se encontró la información del usuario.");
          }
        } catch (err) {
          console.error(err);
          setError("Error cargando datos del usuario.");
        } finally {
          setLoading(false);
        }
      }
    };

    const fetchData = async () => {
      try {
        const pkgSnap = await getDocs(collection(db, "packages"));
        const tourSnap = await getDocs(collection(db, "tours"));

        setPackages(pkgSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        setTours(tourSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error(err);
        setError("Error cargando paquetes o tours.");
      }
    };

    fetchUserData();
  }, [user]);

  if (loading) return <Layout><p className="p-6">Cargando...</p></Layout>;
  if (!user) return <Layout><p className="p-6">Debes iniciar sesión.</p></Layout>;
  if (error) return <Layout><p className="p-6 text-red-500">{error}</p></Layout>;

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        {/* TABLA DE PAQUETES */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Packages</h2>
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="min-w-full divide-y">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Duration</th>
                </tr>
              </thead>
              <tbody>
                {packages.length ? (
                  packages.map((pkg) => (
                    <tr key={pkg.id} className="border-t">
                      <td className="px-4 py-2">{pkg.id}</td>
                      <td className="px-4 py-2">{pkg.name}</td>
                      <td className="px-4 py-2">${pkg.price?.toFixed(2)}</td>
                      <td className="px-4 py-2">{pkg.duration}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      No packages found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* TABLA DE TOURS */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Tours</h2>
          <div className="overflow-x-auto bg-white rounded shadow">
            <table className="min-w-full divide-y">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Location</th>
                  <th className="px-4 py-2 text-left">Price</th>
                </tr>
              </thead>
              <tbody>
                {tours.length ? (
                  tours.map((t) => (
                    <tr key={t.id} className="border-t">
                      <td className="px-4 py-2">{t.id}</td>
                      <td className="px-4 py-2">{t.title}</td>
                      <td className="px-4 py-2">{t.location}</td>
                      <td className="px-4 py-2">${t.price?.toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      No tours found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Layout>
  );
}
