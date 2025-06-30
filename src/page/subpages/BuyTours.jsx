import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../firebase/auth";

import { FaArrowLeft } from "react-icons/fa";
import CircleOption from "../../components/CircleOption";
import Layout from "../layout/Layout";

export default function BuyTours() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [clientes, setClientes] = useState({ adult: 0, children: 0 });
  const [passengers, setPassengers] = useState([]);
  const [message, setMessage] = useState("");

  const tourDetails = {
    1: {
      title: "Tropical Beach Adventure",
      description:
        "Enjoy a relaxing beach vacation with crystal-clear waters and sandy shores.",
      price: "$499",
    },
    2: {
      title: "Mountain Hiking Expedition",
      description:
        "Experience the thrill of hiking through rugged mountain trails with breathtaking views.",
      price: "$699",
    },
  };

  const pack = tourDetails[id] || { title: "Tour not found", description: "", price: "" };

  // Maneja cambios en número de adultos y niños
  const manejarCambioContadores = (nuevosContadores) => {
    setClientes(nuevosContadores);
    // Inicializa el arreglo passengers con la longitud total (adultos + niños)
    const total = nuevosContadores.adult + nuevosContadores.children;
    const nuevosPasajeros = Array(total).fill(null).map(() => ({
      name: "",
      idNumber: "",
      dob: "",
      phone: "",
      email: "",
      dir: "",
    }));
    setPassengers(nuevosPasajeros);
  };

  // Maneja cambios en los datos de cada pasajero
  const handleNameChange = (index, value, field) => {
    setPassengers((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // Guarda la compra directamente en 'quotations' colección
  const savePurchase = async (passengers, numAdults, numChildren) => {
    const quotationsRef = collection(db, "quotations");

    const newPurchase = {
      userId: user.uid,
      createdAt: serverTimestamp(),
      tourId: id,
      numAdults,
      numChildren,
      passengers,
    };

    const docRef = await addDoc(quotationsRef, newPurchase);
    return docRef.id;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const purchaseId = await savePurchase(passengers, clientes.adult, clientes.children);
    setMessage(`✅ Compra guardada con ID: ${purchaseId}`);
    
    // Espera 1 segundo para que el usuario vea el mensaje (opcional)
   setTimeout(() => {
  navigate(`/payment-option/${purchaseId}`);
}, 1000);// puedes ajustar el tiempo o eliminar este delay

  } catch (error) {
    console.error("Error al guardar la compra:", error);
    setMessage("❌ Error al guardar la compra. Intenta de nuevo.");
  }
};


  return (
    <Layout>
      <div className="min-h-screen flex flex-col justify-start bg-white p-6">
        <button
          onClick={() => navigate("/tours")}
          className="bg-transparent text-black font-semibold hover:text-blue-500 flex items-center mb-4"
        >
          <FaArrowLeft className="mr-2 h-5 w-5" />
          Back
        </button>

        <section className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{pack.title}</h1>
          <p className="text-gray-600 text-sm mb-2">{pack.description}</p>
          <p className="text-xl font-semibold text-blue-600">{pack.price}</p>
        </section>

        <div className="flex justify-center items-center mb-4 max-w-lg">
          <CircleOption onChange={manejarCambioContadores} className="w-48 h-48" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: clientes.adult }).map((_, index) => (
              <div
                key={`adult-${index}`}
                className="space-y-4 mb-5 bg-slate-200 p-5 rounded-xl border-2 border-slate-300"
              >
                <h3 className="text-xl font-semibold text-gray-800">Adult Data {index + 1}</h3>
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  onChange={(e) => handleNameChange(index, e.target.value, "name")}
                  className="w-full p-3 border rounded"
                />
                <input
                  type="text"
                  placeholder="Passport Number or ID"
                  required
                  onChange={(e) => handleNameChange(index, e.target.value, "idNumber")}
                  className="w-full p-3 border rounded"
                />
                <input
                  type="date"
                  required
                  onChange={(e) => handleNameChange(index, e.target.value, "dob")}
                  className="w-full p-3 border rounded"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  required
                  onChange={(e) => handleNameChange(index, e.target.value, "phone")}
                  className="w-full p-3 border rounded"
                />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  onChange={(e) => handleNameChange(index, e.target.value, "email")}
                  className="w-full p-3 border rounded"
                />
                <input
                  type="text"
                  placeholder="Address"
                  required
                  onChange={(e) => handleNameChange(index, e.target.value, "dir")}
                  className="w-full p-3 border rounded"
                />
              </div>
            ))}
          </div>

          {clientes.children > 0 && (
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: clientes.children }).map((_, index) => (
                <div
                  key={`child-${index}`}
                  className="space-y-4 mb-5 bg-slate-200 p-5 rounded-xl border-2 border-slate-300"
                >
                  <h3 className="text-xl font-semibold text-gray-800">Child Data {index + 1}</h3>
                  <input
                    type="text"
                    placeholder="Full Name"
                    required
                    onChange={(e) =>
                      handleNameChange(index + clientes.adult, e.target.value, "name")
                    }
                    className="w-full p-3 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Passport Number or ID"
                    required
                    onChange={(e) =>
                      handleNameChange(index + clientes.adult, e.target.value, "idNumber")
                    }
                    className="w-full p-3 border rounded"
                  />
                  <input
                    type="date"
                    required
                    onChange={(e) =>
                      handleNameChange(index + clientes.adult, e.target.value, "dob")
                    }
                    className="w-full p-3 border rounded"
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    required
                    onChange={(e) =>
                      handleNameChange(index + clientes.adult, e.target.value, "phone")
                    }
                    className="w-full p-3 border rounded"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    onChange={(e) =>
                      handleNameChange(index + clientes.adult, e.target.value, "email")
                    }
                    className="w-full p-3 border rounded"
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    required
                    onChange={(e) =>
                      handleNameChange(index + clientes.adult, e.target.value, "dir")
                    }
                    className="w-full p-3 border rounded"
                  />
                </div>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="bg-yellow-500 w-44 text-white font-semibold py-3 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            Confirm Purchase
          </button>

          {message && <p className="mt-4 text-center text-blue-600">{message}</p>}
        </form>
      </div>
    </Layout>
  );
}
