import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "../../firebase/auth";
import PurchaseForm from "./PurchaseForm"; // importa el componente

export default function BuyTours() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [passengers, setPassengers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [residence, setResidence] = useState("");
  const [paymentInfo, setPaymentInfo] = useState("");
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

  // Actualiza el array passengers según la cantidad de adultos y niños
  useEffect(() => {
    const total = adults + children;
    setPassengers((oldPassengers) => {
      const newPassengers = [...oldPassengers];
      if (newPassengers.length < total) {
        // Agrega objetos vacíos si falta
        for (let i = newPassengers.length; i < total; i++) {
          newPassengers.push({
            name: "",
            idNumber: "",
            dob: "",
            phone: "",
            email: "",
            dir: "",
          });
        }
      } else if (newPassengers.length > total) {
        // Recorta si sobran
        newPassengers.splice(total);
      }
      return newPassengers;
    });
  }, [adults, children]);

  // Guardar la compra
  const savePurchase = async () => {
    const quotationsRef = collection(db, "quotations");

    const newPurchase = {
      userId: user.uid,
      createdAt: serverTimestamp(),
      tourId: id,
      numAdults: adults,
      numChildren: children,
      passengers,
      buyerName: name,
      buyerEmail: email,
      buyerResidence: residence,
      paymentInfo,
    };

    const docRef = await addDoc(quotationsRef, newPurchase);
    return docRef.id;
  };

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
    <div className="min-h-screen flex flex-col justify-start bg-white p-6">
      <button
        onClick={() => navigate("/tours")}
        className="bg-transparent text-black font-semibold hover:text-blue-500 flex items-center mb-4"
      >
        {/* Icono Back */}
        <span className="mr-2 h-5 w-5">&#8592;</span> Back
      </button>

      <section className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{pack.title}</h1>
        <p className="text-gray-600 text-sm mb-2">{pack.description}</p>
        <p className="text-xl font-semibold text-blue-600">{pack.price}</p>
      </section>

      <PurchaseForm
        adults={adults}
        children={children}
        setAdults={setAdults}
        setChildren={setChildren}
        passengers={passengers}
        setPassengers={setPassengers}
        name={name}
        email={email}
        residence={residence}
        paymentInfo={paymentInfo}
        setName={setName}
        setEmail={setEmail}
        setResidence={setResidence}
        setPaymentInfo={setPaymentInfo}
        handlePurchase={handlePurchase}
      />

      {message && <p className="mt-4 text-center text-blue-600">{message}</p>}
    </div>
  );
}
