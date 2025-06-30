import React from 'react'

export default function FormData() {
  return (
   <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: clientes.adult }).map((_, index) => (
                <div
                  key={`adult-${index}`}
                  className="space-y-4 mb-5 bg-slate-200 p-5 rounded-xl border-2 border-slate-300"
                >
                  <h3 className="text-xl font-semibold text-gray-800">
                    Datos Adulto {index + 1}
                  </h3>
                  <div className="grid grid-cols-2 gap-4 relative">
                    {/* Nombre Completo */}
                    <div className="relative">
                      <input
                        type="text"
                        id={`adult-${index}-name`}
                        placeholder=" "
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                        onChange={(e) =>
                          handleNameChange(index, e.target.value, "name")
                        }
                      />
                      <label
                        htmlFor={`adult-${index}-name`}
                        className="absolute left-4 top-0 text-sm text-gray-600 peer-focus:top-0 peer-focus:text-blue-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-blue-500"
                      >
                        Nombre Completo
                      </label>
                    </div>
                    {/* Número de Pasaporte o ID */}
                    <div className="relative">
                      <input
                        type="text"
                        id={`adult-${index}-idNumber`}
                        placeholder=" "
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                        onChange={(e) =>
                          handleNameChange(index, e.target.value, "idNumber")
                        }
                      />
                      <label
                        htmlFor={`adult-${index}-idNumber`}
                        className="absolute left-4 top-0 text-sm text-gray-600 peer-focus:top-0 peer-focus:text-blue-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-blue-500"
                      >
                        Número de Pasaporte o ID
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 relative">
                    {/* Fecha de Nacimiento */}
                    <div className="relative">
                      <input
                        type="date"
                        id={`adult-${index}-dob`}
                        placeholder=" "
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                        onChange={(e) =>
                          handleNameChange(index, e.target.value, "dob")
                        }
                      />
                      <label
                        htmlFor={`adult-${index}-dob`}
                        className="absolute left-4 -top-0 text-sm text-gray-600 peer-focus:top-0 peer-focus:text-blue-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-blue-500"
                      >
                        Fecha de Nacimiento
                      </label>
                    </div>

                    {/* Teléfono */}
                    <div className="relative">
                      <input
                        type="tel"
                        id={`adult-${index}-phone`}
                        placeholder=" "
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                        onChange={(e) =>
                          handleNameChange(index, e.target.value, "phone")
                        }
                      />
                      <label
                        htmlFor={`adult-${index}-phone`}
                        className="absolute left-4 -top-0 text-sm text-gray-600 peer-focus:top-0 peer-focus:text-blue-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-blue-500"
                      >
                        Número de Teléfono
                      </label>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 relative">
                    {/* Correo Electrónico */}
                    <div className="relative">
                      <input
                        type="email"
                        id={`adult-${index}-email`}
                        placeholder=" "
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                        onChange={(e) =>
                          handleNameChange(index, e.target.value, "email")
                        }
                      />
                      <label
                        htmlFor={`adult-${index}-email`}
                        className="absolute left-4 -top-0 text-sm text-gray-600 peer-focus:top-0 peer-focus:text-blue-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-blue-500"
                      >
                        Correo Electrónico
                      </label>
                    </div>

                    {/* Dirección */}
                    <div className="relative">
                      <input
                        type="text"
                        id={`adult-${index}-dir`}
                        placeholder=" "
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                        onChange={(e) =>
                          handleNameChange(index, e.target.value, "dir")
                        }
                      />
                      <label
                        htmlFor={`adult-${index}-dir`}
                        className="absolute left-4 -top-0 text-sm text-gray-600 peer-focus:top-0 peer-focus:text-blue-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-blue-500"
                      >
                        Dirección
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* 
                  <div className="grid grid-cols-1 gap-4">
                    <Attachment
                      name={`adult-${index}`}
                      nameComplete={
                        nameCompletes[index] || `Adulto ${index + 1}`
                      }
                      onFileChange={(file) => handleFileUpload(file, index)}
                    />
                  </div>
                </div>
              ))}
            </div> */}

            {clientes.children > 0 && (
              <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: clientes.children }).map((_, index) => (
                  <div
                    key={`child-${index}`}
                    className="space-y-4 mb-5 bg-slate-200 p-5 rounded-xl border-2 border-slate-300"
                  >
                    <h3 className="text-xl font-semibold text-gray-800">
                      Datos Niño {index + 1}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 relative">
                      {/* Nombre Completo */}
                      <div className="relative">
                        <input
                          type="text"
                          id={`child-${index}-name`}
                          placeholder=" "
                          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                          onChange={(e) =>
                            handleNameChange(
                              index + clientes.adult,
                              e.target.value,
                              "name"
                            )
                          }
                        />
                        <label
                          htmlFor={`child-${index}-name`}
                          className="absolute left-4 top-0 text-sm text-gray-600 peer-focus:top-0 peer-focus:text-blue-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-blue-500"
                        >
                          Nombre Completo
                        </label>
                      </div>

                      {/* Número de Pasaporte o ID */}
                      <div className="relative">
                        <input
                          type="text"
                          id={`child-${index}-idNumber`}
                          placeholder=" "
                          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                          onChange={(e) =>
                            handleNameChange(
                              index + clientes.adult,
                              e.target.value,
                              "idNumber"
                            )
                          }
                        />
                        <label
                          htmlFor={`child-${index}-idNumber`}
                          className="absolute left-4 top-0 text-sm text-gray-600 peer-focus:top-0 peer-focus:text-blue-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-blue-500"
                        >
                          Número de Pasaporte o ID
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 relative">
                      {/* Fecha de Nacimiento */}
                      <div className="relative">
                        <input
                          type="date"
                          id={`child-${index}-dob`}
                          placeholder=" "
                          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                          onChange={(e) =>
                            handleNameChange(
                              index + clientes.adult,
                              e.target.value,
                              "dob"
                            )
                          }
                        />
                        <label
                          htmlFor={`child-${index}-dob`}
                          className="absolute left-4 top-0 text-sm text-gray-600 peer-focus:top-0 peer-focus:text-blue-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-blue-500"
                        >
                          Fecha de Nacimiento
                        </label>
                      </div>

                      {/* Teléfono */}
                      <div className="relative">
                        <input
                          type="tel"
                          id={`child-${index}-phone`}
                          placeholder=" "
                          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                          onChange={(e) =>
                            handleNameChange(
                              index + clientes.adult,
                              e.target.value,
                              "phone"
                            )
                          }
                        />
                        <label
                          htmlFor={`child-${index}-phone`}
                          className="absolute left-4 top-0 text-sm text-gray-600 peer-focus:top-0 peer-focus:text-blue-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-blue-500"
                        >
                          Número de Teléfono
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 relative">
                      {/* Correo Electrónico */}
                      <div className="relative">
                        <input
                          type="email"
                          id={`child-${index}-email`}
                          placeholder=" "
                          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                          onChange={(e) =>
                            handleNameChange(
                              index + clientes.adult,
                              e.target.value,
                              "email"
                            )
                          }
                        />
                        <label
                          htmlFor={`child-${index}-email`}
                          className="absolute left-4 top-0 text-sm text-gray-600 peer-focus:top-0 peer-focus:text-blue-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-blue-500"
                        >
                          Correo Electrónico
                        </label>
                      </div>

                      {/* Dirección */}
                      <div className="relative">
                        <input
                          type="text"
                          id={`child-${index}-dir`}
                          placeholder=" "
                          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                          onChange={(e) =>
                            handleNameChange(
                              index + clientes.adult,
                              e.target.value,
                              "dir"
                            )
                          }
                        />
                        <label
                          htmlFor={`child-${index}-dir`}
                          className="absolute left-4 top-0 text-sm text-gray-600 peer-focus:top-0 peer-focus:text-blue-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-blue-500"
                        >
                          Dirección
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <button
              type="submit"
              className="  bg-yellow-500 w-44 items-center justify-center text-white font-semibold py-3 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              Confirm Purchase
            </button>
          </form>
        </div>
  )
}
/* 
  import React, { useState } from "react";

export default function FormData({
  clientes = { adult: 0, children: 0 },
  handleNameChange,
  handleSubmit,
}) {
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Datos de los Adultos */}
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: clientes.adult }).map((_, index) => (
            <div
              key={`adult-${index}`}
              className="space-y-4 mb-5 bg-slate-200 p-5 rounded-xl border-2 border-slate-300"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                Datos Adulto {index + 1}
              </h3>

              {/* Sección de campos del adulto */}
              <div className="grid grid-cols-2 gap-4 relative">
                {/* Nombre Completo */}
                <div className="relative">
                  <input
                    type="text"
                    id={`adult-${index}-name`}
                    placeholder=" "
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                    onChange={(e) =>
                      handleNameChange(index, e.target.value, "name", "adult")
                    }
                  />
                  <label
                    htmlFor={`adult-${index}-name`}
                    className="absolute left-4 top-0 text-sm text-gray-600 peer-focus:top-0 peer-focus:text-blue-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-blue-500"
                  >
                    Nombre Completo
                  </label>
                </div>

                {/* Número de Pasaporte o ID */}
                <div className="relative">
                  <input
                    type="text"
                    id={`adult-${index}-idNumber`}
                    placeholder=" "
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                    onChange={(e) =>
                      handleNameChange(
                        index,
                        e.target.value,
                        "idNumber",
                        "adult"
                      )
                    }
                  />
                  <label
                    htmlFor={`adult-${index}-idNumber`}
                    className="absolute left-4 top-0 text-sm text-gray-600 peer-focus:top-0 peer-focus:text-blue-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-blue-500"
                  >
                    Número de Pasaporte o ID
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 relative">
                {/* Fecha de Nacimiento */}
                <div className="relative">
                  <input
                    type="date"
                    id={`adult-${index}-dob`}
                    placeholder=" "
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                    onChange={(e) =>
                      handleNameChange(index, e.target.value, "dob", "adult")
                    }
                  />
                  <label
                    htmlFor={`adult-${index}-dob`}
                    className="absolute left-4 -top-0 text-sm text-gray-600 peer-focus:top-0 peer-focus:text-blue-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-blue-500"
                  >
                    Fecha de Nacimiento
                  </label>
                </div>

                {/* Teléfono */}
                <div className="relative">
                  <input
                    type="tel"
                    id={`adult-${index}-phone`}
                    placeholder=" "
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                    onChange={(e) =>
                      handleNameChange(index, e.target.value, "phone", "adult")
                    }
                  />
                  <label
                    htmlFor={`adult-${index}-phone`}
                    className="absolute left-4 -top-0 text-sm text-gray-600 peer-focus:top-0 peer-focus:text-blue-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-blue-500"
                  >
                    Número de Teléfono
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 relative">
                {/* Correo Electrónico */}
                <div className="relative">
                  <input
                    type="email"
                    id={`adult-${index}-email`}
                    placeholder=" "
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                    onChange={(e) =>
                      handleNameChange(index, e.target.value, "email", "adult")
                    }
                  />
                  <label
                    htmlFor={`adult-${index}-email`}
                    className="absolute left-4 -top-0 text-sm text-gray-600 peer-focus:top-0 peer-focus:text-blue-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-blue-500"
                  >
                    Correo Electrónico
                  </label>
                </div>

                {/* Dirección */}
                <div className="relative">
                  <input
                    type="text"
                    id={`adult-${index}-dir`}
                    placeholder=" "
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                    onChange={(e) =>
                      handleNameChange(index, e.target.value, "dir", "adult")
                    }
                  />
                  <label
                    htmlFor={`adult-${index}-dir`}
                    className="absolute left-4 -top-0 text-sm text-gray-600 peer-focus:top-0 peer-focus:text-blue-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-blue-500"
                  >
                    Dirección
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Datos de los Niños */}
        {clientes.children > 0 && (
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: clientes.children }).map((_, index) => (
              <div
                key={`child-${index}`}
                className="space-y-4 mb-5 bg-slate-200 p-5 rounded-xl border-2 border-slate-300"
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  Datos Niño {index + 1}
                </h3>

                {/* Sección de campos del niño */}
                <div className="grid grid-cols-2 gap-4 relative">
                  {/* Nombre Completo Niño */}
                  <div className="relative">
                    <input
                      type="text"
                      id={`child-${index}-name`}
                      placeholder=" "
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                      onChange={(e) =>
                        handleNameChange(
                          index + clientes.adult,
                          e.target.value,
                          "name",
                          "child"
                        )
                      }
                    />
                    <label
                      htmlFor={`child-${index}-name`}
                      className="absolute left-4 top-0 text-sm text-gray-600 peer-focus:top-0 peer-focus:text-blue-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-blue-500"
                    >
                      Nombre Completo
                    </label>
                  </div>

                  {/* Número de Pasaporte o ID Niño */}
                  <div className="relative">
                    <input
                      type="text"
                      id={`child-${index}-idNumber`}
                      placeholder=" "
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                      onChange={(e) =>
                        handleNameChange(
                          index + clientes.adult,
                          e.target.value,
                          "idNumber",
                          "child"
                        )
                      }
                    />
                    <label
                      htmlFor={`child-${index}-idNumber`}
                      className="absolute left-4 top-0 text-sm text-gray-600 peer-focus:top-0 peer-focus:text-blue-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-blue-500"
                    >
                      Número de Pasaporte o ID
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 relative">
                  {/* Fecha de Nacimiento Niño */}
                  <div className="relative">
                    <input
                      type="date"
                      id={`child-${index}-dob`}
                      placeholder=" "
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                      onChange={(e) =>
                        handleNameChange(
                          index + clientes.adult,
                          e.target.value,
                          "dob",
                          "child"
                        )
                      }
                    />
                    <label
                      htmlFor={`child-${index}-dob`}
                      className="absolute left-4 top-0 text-sm text-gray-600 peer-focus:top-0 peer-focus:text-blue-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-blue-500"
                    >
                      Fecha de Nacimiento
                    </label>
                  </div>

                  {/* Teléfono Niño */}
                  <div className="relative">
                    <input
                      type="tel"
                      id={`child-${index}-phone`}
                      placeholder=" "
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                      onChange={(e) =>
                        handleNameChange(
                          index + clientes.adult,
                          e.target.value,
                          "phone",
                          "child"
                        )
                      }
                    />
                    <label
                      htmlFor={`child-${index}-phone`}
                      className="absolute left-4 -top-0 text-sm text-gray-600 peer-focus:top-0 peer-focus:text-blue-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-blue-500"
                    >
                      Número de Teléfono
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 relative">
                  {/* Correo Electrónico Niño */}
                  <div className="relative">
                    <input
                      type="email"
                      id={`child-${index}-email`}
                      placeholder=" "
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                      onChange={(e) =>
                        handleNameChange(
                          index + clientes.adult,
                          e.target.value,
                          "email",
                          "child"
                        )
                      }
                    />
                    <label
                      htmlFor={`child-${index}-email`}
                      className="absolute left-4 top-0 text-sm text-gray-600 peer-focus:top-0 peer-focus:text-blue-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-blue-500"
                    >
                      Correo Electrónico
                    </label>
                  </div>

                  {/* Dirección Niño */}
                  <div className="relative">
                    <input
                      type="text"
                      id={`child-${index}-dir`}
                      placeholder=" "
                      className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 peer"
                      onChange={(e) =>
                        handleNameChange(
                          index + clientes.adult,
                          e.target.value,
                          "dir",
                          "child"
                        )
                      }
                    />
                    <label
                      htmlFor={`child-${index}-dir`}
                      className="absolute left-4 top-0 text-sm text-gray-600 peer-focus:top-0 peer-focus:text-blue-500 transition-all duration-200 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-600 peer-not-placeholder-shown:top-0 peer-not-placeholder-shown:text-blue-500"
                    >
                      Dirección
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="bg-yellow-500 w-44 items-center justify-center text-white font-semibold py-3 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          Confirmar Compra
        </button>
      </form>
    </div>
  );
}  
 */