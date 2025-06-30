// ClientForm.jsx
import React, { useState } from "react";

export default function ClientForm({
  clientIndex,
  clientType,
  onDataChange,
  onDocumentUpload,
}) {
  const [name, setName] = useState(""); // Name
  const [lastname, setLastname] = useState(""); // Lastname
  const [idOrPassport, setIdOrPassport] = useState(""); // Identification or Passport
  const [birthDate, setBirthDate] = useState(""); // Birth Date
  const [file, setFile] = useState(null); // File

  // Handle changes in input fields
  const handleInputChange = (field, value) => {
    // Update the corresponding state field
    switch (field) {
      case "name":
        setName(value);
        break;
      case "lastname":
        setLastname(value);
        break;
      case "idOrPassport":
        setIdOrPassport(value);
        break;
      case "birthDate":
        setBirthDate(value);
        break;
      default:
        break;
    }
    onDataChange(clientIndex, { ...clientData() }); // Pass updated client data to parent component
  };

  // Returns the client data
  const clientData = () => ({
    name,
    lastname,
    idOrPassport,
    birthDate,
  });

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      // Call the file upload function
      onDocumentUpload(selectedFile, clientIndex);
    }
  };

  return (
    <div className="client-form">
      {/* Name field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Full Name 
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          placeholder="Enter full name"
        />
      </div>

      {/* Lastname field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Last Name 
        </label>
        <input
          type="text"
          value={lastname}
          onChange={(e) => handleInputChange("lastname", e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          placeholder="Enter last name"
        />
      </div>

      {/* Identification or Passport field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Identification or Passport 
        </label>
        <input
          type="text"
          value={idOrPassport}
          onChange={(e) => handleInputChange("idOrPassport", e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          placeholder="Enter ID or passport number"
        />
      </div>

      {/* Birth date field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Birth Date   
        </label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => handleInputChange("birthDate", e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      {/* File upload */}
    {/*   <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Document  
        </label>
        <input
          type="file"
          onChange={handleFileChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
      </div> */}
    </div>
  );
}
