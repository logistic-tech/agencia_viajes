import React from "react";

export default function PurchaseForm({
  adults,
  children,
  setAdults,
  setChildren,
  passengers,
  setPassengers,
  name,
  email,
  residence,
  paymentInfo,
  setName,
  setEmail,
  setResidence,
  setPaymentInfo,
  handlePurchase,
}) {
  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  };

  return (
    <form
      onSubmit={handlePurchase}
      className="space-y-4 max-w-3xl mx-auto p-6 bg-white rounded-lg shadow border border-gray-200"
    >
      <h2 className="text-xl font-semibold text-gray-800">Passenger Count</h2>

      {/* Inputs de cantidad de adultos y niños */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Adults</label>
          <input
            type="number"
            min={0}
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            className="mt-1 w-full px-3 py-2 border rounded-md text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Children</label>
          <input
            type="number"
            min={0}
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
            className="mt-1 w-full px-3 py-2 border rounded-md text-sm"
            required
          />
        </div>
      </div>

      {/* Mostrar formularios solo si hay adultos o niños */}
      {(adults > 0 || children > 0) && (
        <>
       

          {/* Formularios para adultos */}
          {adults > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Adult Passengers</h3>
              {Array.from({ length: adults }).map((_, i) => (
                <div key={`adult-${i}`} className="mb-4 p-4 bg-gray-50 rounded border">
                  <h4 className="font-medium mb-2">Adult {i + 1}</h4>
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={passengers[i]?.name || ""}
                    onChange={(e) => handlePassengerChange(i, "name", e.target.value)}
                    className="mb-2 w-full px-3 py-2 border rounded text-sm"
                    required
                  />
                  <input
                    type="text"
                    placeholder="ID or Passport"
                    value={passengers[i]?.idNumber || ""}
                    onChange={(e) => handlePassengerChange(i, "idNumber", e.target.value)}
                    className="mb-2 w-full px-3 py-2 border rounded text-sm"
                    required
                  />
                  <input
                    type="date"
                    value={passengers[i]?.dob || ""}
                    onChange={(e) => handlePassengerChange(i, "dob", e.target.value)}
                    className="mb-2 w-full px-3 py-2 border rounded text-sm"
                    required
                  />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={passengers[i]?.phone || ""}
                    onChange={(e) => handlePassengerChange(i, "phone", e.target.value)}
                    className="mb-2 w-full px-3 py-2 border rounded text-sm"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={passengers[i]?.email || ""}
                    onChange={(e) => handlePassengerChange(i, "email", e.target.value)}
                    className="mb-2 w-full px-3 py-2 border rounded text-sm"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Address"
                    value={passengers[i]?.dir || ""}
                    onChange={(e) => handlePassengerChange(i, "dir", e.target.value)}
                    className="w-full px-3 py-2 border rounded text-sm"
                    required
                  />
                </div>
              ))}
            </div>
          )}

          {/* Formularios para niños */}
          {children > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Child Passengers</h3>
              {Array.from({ length: children }).map((_, i) => {
                const index = adults + i;
                return (
                  <div key={`child-${i}`} className="mb-4 p-4 bg-gray-50 rounded border">
                    <h4 className="font-medium mb-2">Child {i + 1}</h4>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={passengers[index]?.name || ""}
                      onChange={(e) => handlePassengerChange(index, "name", e.target.value)}
                      className="mb-2 w-full px-3 py-2 border rounded text-sm"
                      required
                    />
                    <input
                      type="text"
                      placeholder="ID or Passport"
                      value={passengers[index]?.idNumber || ""}
                      onChange={(e) => handlePassengerChange(index, "idNumber", e.target.value)}
                      className="mb-2 w-full px-3 py-2 border rounded text-sm"
                      required
                    />
                    <input
                      type="date"
                      value={passengers[index]?.dob || ""}
                      onChange={(e) => handlePassengerChange(index, "dob", e.target.value)}
                      className="mb-2 w-full px-3 py-2 border rounded text-sm"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={passengers[index]?.phone || ""}
                      onChange={(e) => handlePassengerChange(index, "phone", e.target.value)}
                      className="mb-2 w-full px-3 py-2 border rounded text-sm"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={passengers[index]?.email || ""}
                      onChange={(e) => handlePassengerChange(index, "email", e.target.value)}
                      className="mb-2 w-full px-3 py-2 border rounded text-sm"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      value={passengers[index]?.dir || ""}
                      onChange={(e) => handlePassengerChange(index, "dir", e.target.value)}
                      className="w-full px-3 py-2 border rounded text-sm"
                      required
                    />
                  </div>
                );
              })}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-yellow-500 text-black font-semibold py-2 px-4 rounded hover:bg-yellow-600 transition duration-300 mt-6"
          >
            Confirm Purchase
          </button>
        </>
      )}
    </form>
  );
}
