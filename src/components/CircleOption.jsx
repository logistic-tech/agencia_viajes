import React, { useState, useEffect } from "react";

export default function CircleOption({ onChange }) {
  const [contadores, setContadores] = useState({
    adult: 0,
    children: 0,
  });

  // useEffect que solo se ejecutará cuando el estado 'contadores' cambie
  useEffect(() => {
    // Solo se llama a onChange si 'contadores' ha cambiado
    onChange(contadores);
  }, [contadores]); // Solo depende de 'contadores', no de 'onChange'

  const aumentarContador = (tipo) => {
    setContadores((prev) => ({
      ...prev,
      [tipo]: prev[tipo] + 1,
    }));
  };

  const disminuirContador = (tipo) => {
    setContadores((prev) => ({
      ...prev,
      [tipo]: Math.max(prev[tipo] - 1, 0),
    }));
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Select the number of people
      </h2>
      {Object.entries(contadores).map(([tipo, valor]) => (
        <div key={tipo} className="flex items-center justify-between mb-4">
          <h3 className="text-lg capitalize">
            {tipo.replace("adultoMayor", "adulto mayor")}
          </h3>
          <div className="flex items-center">
            <button
              onClick={() => disminuirContador(tipo)}
              className="px-3 py-1 bg-blue-500 text-white rounded-l hover:bg-blue-600 transition"
            >
              -
            </button>
            <span className="px-4">{valor}</span>
            <button
              onClick={() => aumentarContador(tipo)}
              className="px-3 py-1 bg-blue-500 text-white rounded-r hover:bg-blue-600 transition"
            >
              +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
