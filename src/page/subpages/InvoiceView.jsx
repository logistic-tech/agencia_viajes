import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import Layout from "../layout/Layout";

export default function InvoiceView() {
  const { purchaseId } = useParams();
  const navigate = useNavigate();

  const [quotation, setQuotation] = useState(null);
  const [bill, setBill] = useState(null);

  const tourPrices = {
    1: { name: "Tropical Beach Adventure", price: 499 },
    2: { name: "Mountain Hiking Expedition", price: 699 },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Buscar cotización por purchaseId
        const quotationsQuery = query(
          collection(db, "quotations"),
          where("__name__", "==", purchaseId) // esto es si usaste purchaseId como ID
        );
        const quotationsSnapshot = await getDocs(quotationsQuery);
        let quotationData = null;
        quotationsSnapshot.forEach((doc) => {
          quotationData = doc.data();
        });

        // Buscar factura por campo purchaseId
        const billsQuery = query(
          collection(db, "bill"),
          where("purchaseId", "==", purchaseId)
        );
        const billsSnapshot = await getDocs(billsQuery);
        let billData = null;
        billsSnapshot.forEach((doc) => {
          billData = doc.data();
        });

        if (quotationData && billData) {
          setQuotation(quotationData);
          setBill(billData);
        } else {
          console.warn("Quotation or Bill not found.");
        }
      } catch (error) {
        console.error("Error fetching invoice data:", error);
      }
    };

    fetchData();
  }, [purchaseId]);

  if (!quotation || !bill) {
    return (
      <Layout>
        <div className="min-h-screen p-6 text-center">
          <p>Loading invoice...</p>
        </div>
      </Layout>
    );
  }

  const numPeople = quotation.numAdults + quotation.numChildren;
  const tour = tourPrices[quotation.tourId] || { name: "Unknown Tour", price: 0 };
  const totalAmount = numPeople * tour.price;
  const isInstallment = bill.paymentType === "installments";
  const amountPerInstallment = isInstallment && bill.numInstallments
    ? (totalAmount / bill.numInstallments).toFixed(2)
    : null;

  return (
    <section>
      <div className="min-h-screen p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Invoice Summary</h1>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Tour Information</h2>
          <p><strong>Tour:</strong> {tour.name}</p>
          <p><strong>Price per person:</strong> ${tour.price}</p>
          <p><strong>Adults:</strong> {quotation.numAdults}</p>
          <p><strong>Children:</strong> {quotation.numChildren}</p>
          <p><strong>Total People:</strong> {numPeople}</p>
          <p className="mt-2 font-bold text-lg text-blue-600">Total Amount: ${totalAmount}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Payment Details</h2>
          <p><strong>Payment Type:</strong> {bill.paymentType === "full" ? "Full Payment" : "Installments"}</p>
          <p><strong>Payment Method:</strong> {bill.paymentMethod}</p>
          {isInstallment && (
            <>
              <p><strong>Frequency:</strong> {bill.installmentFrequency}</p>
              <p><strong>Number of Installments:</strong> {bill.numInstallments}</p>
              <p><strong>Amount per Installment:</strong> ${amountPerInstallment}</p>
            </>
          )}
        </div>

        <button
          onClick={() => navigate("/tours")}
          className="mt-6 bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600"
        >
          Back to Tours
        </button>
      </div>
    </section>
  );
}
