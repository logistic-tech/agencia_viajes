import { useState, useEffect } from "react";
import { MdOutlineDeleteForever } from "react-icons/md";
import { GrView } from "react-icons/gr";
import IconPdf from "../assets/iconPdf.svg";
import IconWord from "../assets/iconWord.svg";
import { ViewAttach } from "./ViewAttach";

export function Attachment({
  DataDocument,
  name,
  maxFileSize = 5,
  onFileChange,
  className = "",
  label = true,
  labelText = "Attach",
  disabled = false,
  disableDelte = false,
  nameComplete, // Recibimos el nombre completo
}) {
  const [showPdf, setShowPdf] = useState(false);
  const closeView = () => setShowPdf(false);
  const [typeDocument, setTypeDocument] = useState();
  const [data, setData] = useState(null);
  const [validation, setValidation] = useState({ isValid: false, message: "" });
  console.log(nameComplete);
  useEffect(() => {
    if (DataDocument) {
      changeDocument(DataDocument);
    }
  }, [DataDocument]);

  const verifyTypeDocument = (fileName) => {
    const fileExtension = fileName.split(".").pop().toLowerCase();
    return ["pdf", "doc", "docx"].includes(fileExtension);
  };

  const [customFileName, setCustomFileName] = useState(""); // Estado para el nombre personalizado

  const changeDocument = (file) => {
    const MAX_FILE_SIZE = maxFileSize * 1024 * 1024;
    if (file.size <= MAX_FILE_SIZE) {
      if (verifyTypeDocument(file.name)) {
        setData(file);
        setTypeDocument(file.name.split(".").pop().toLowerCase());

        // Asigna un nombre personalizado basado en el nombre completo
        setCustomFileName(`Archivo de ${nameComplete}`); // Usamos el nameComplete que se pasa como prop

        onFileChange(file);
        setValidation({ isValid: false, message: "" });
      } else {
        setValidation({
          isValid: true,
          message: "Solo se admite PDF, DOC, DOCX",
        });
      }
    } else {
      setValidation({ isValid: true, message: "El archivo excede los 5 MB." });
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation(); // Evitar la propagación
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      changeDocument(droppedFiles[0]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const ViewFiles = (e) => {
    e.preventDefault();
    setShowPdf(true);
  };

  const deleteData = (e) => {
    e.preventDefault();
    onFileChange(null);
    setData(null);
    setShowPdf(false);
    setCustomFileName(""); // Limpiar el nombre personalizado
    setValidation({ isValid: false, message: "" });
  };

  return (
    <>
     <div onDrop={handleDrop} onDragOver={handleDragOver}>
  {label && <p className="text-base md:pb-3 pt-2">{labelText}</p>}
  <label
    htmlFor={name}
    className={`flex pt-2 h-48 md:h-72 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 ${
      data ? "" : "border-dashed"
    } ${
      validation.isValid ? "border-red-600" : "border-gray-300"
    } bg-white hover:bg-white dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
  >
    <div className="flex flex-col items-center justify-center pb-2 pt-1">
      {data ? (
        <>
          <img
            src={typeDocument === "pdf" ? IconPdf : IconWord}
            alt="document"
            className="w-10 h-10"
          />
          <p className="text-sm text-gray-700 dark:text-gray-300 pt-2 text-center max-w-96">
            {customFileName || data.name}
          </p>
          <div className="flex md:flex-col gap-3 py-3">
            <button
              onClick={ViewFiles}
              className="bg-[#1976d2] hover:bg-blue-500 text-white flex rounded justify-center items-center h-10 w-24"
            >
              {typeDocument === "pdf" ? "View" : "Download"}
              <GrView className="pl-1 w-5 h-5" />
            </button>
            <button
              disabled={disabled}
              onClick={deleteData}
              className={`${
                disableDelte ? "hidden" : ""
              } bg-red-600 hover:bg-red-500 text-white flex rounded justify-center items-center h-10 w-24`}
            >
              Delete <MdOutlineDeleteForever className="pl-1 w-6 h-5" />
            </button>
          </div>
        </>
      ) : (
        <>
          <svg
            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400 px-1 text-center">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            DOC,DOCX,PDF (MAX. 5MB)
          </p>
        </>
      )}
      {validation.isValid && (
        <p className="text-red-600">{validation.message}</p>
      )}
    </div>
    <input
      type="file"
      id={name}
      className="hidden"
      accept=".doc,.docx,.pdf"
      onChange={(e) => changeDocument(e.target.files[0])}
    />
  </label>
</div>


      {showPdf && (
        <ViewAttach
          closeView={closeView}
          file={data}
          typeDocument={typeDocument}
        />
      )}
    </>
  );
}
