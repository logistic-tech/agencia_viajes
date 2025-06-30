// src/pages/PaymentOption.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import Layout from "../layout/Layout";

export default function PaymentOption() {
  const { purchaseId } = useParams();
  const navigate = useNavigate();

  const [paymentType, setPaymentType] = useState("");
  const [installmentFrequency, setInstallmentFrequency] = useState("");
  const [installmentCount, setInstallmentCount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !paymentType ||
      !paymentMethod ||
      (paymentType === "installments" && (!installmentFrequency || !installmentCount))
    ) {
      alert("Please complete all required fields.");
      return;
    }

    try {
      const billRef = collection(db, "bill");

      await addDoc(billRef, {
        purchaseId,
        createdAt: serverTimestamp(),
        paymentType,
        installmentFrequency: paymentType === "installments" ? installmentFrequency : null,
        installmentCount: paymentType === "installments" ? Number(installmentCount) : null,
        paymentMethod,
      });

      navigate(`/invoice/${purchaseId}`);
    } catch (err) {
      console.error("Error saving bill:", err);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen p-6 bg-white">
        <h1 className="text-3xl font-bold mb-6 text-center">Payment Options</h1>

        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
          {/* Tipo de pago */}
          <div className="space-y-3">
            <label className="font-semibold">How would you like to pay?</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="full"
                  checked={paymentType === "full"}
                  onChange={(e) => setPaymentType(e.target.value)}
                  className="mr-2"
                />
                Full Payment
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="installments"
                  checked={paymentType === "installments"}
                  onChange={(e) => setPaymentType(e.target.value)}
                  className="mr-2"
                />
                Installments
              </label>
            </div>
          </div>

          {/* Frecuencia de cuotas */}
          {paymentType === "installments" && (
            <div className="space-y-3">
              <label className="font-semibold">Installment Frequency</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="biweekly"
                    checked={installmentFrequency === "biweekly"}
                    onChange={(e) => setInstallmentFrequency(e.target.value)}
                    className="mr-2"
                  />
                  Biweekly
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="monthly"
                    checked={installmentFrequency === "monthly"}
                    onChange={(e) => setInstallmentFrequency(e.target.value)}
                    className="mr-2"
                  />
                  Monthly
                </label>
              </div>
            </div>
          )}

          {/* Número de cuotas */}
          {paymentType === "installments" && (
            <div className="space-y-3">
              <label className="font-semibold">Number of Installments</label>
              <input
                type="number"
                min="1"
                value={installmentCount}
                onChange={(e) => setInstallmentCount(e.target.value)}
                className="w-full p-3 border rounded"
                placeholder="Enter number of installments"
                required
              />
              {/* Mostrar valor actual de número de cuotas */}
              {installmentCount && (
                <p className="text-gray-600 text-sm">
                  <strong>Number of Installments Selected:</strong> {installmentCount}
                </p>
              )}
            </div>
          )}

          {/* Método de pago */}
          <div className="space-y-3">
            <label className="font-semibold">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-3 border rounded"
              required
            >
              <option value="">Select an option</option>
              <option value="cash">Cash</option>
              <option value="credit-card">Credit or Debit Card</option>
              <option value="western-union">Western Union</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600"
          >
            Confirm Payment Method
          </button>
        </form>
      </div>
    </Layout>
  );
}
