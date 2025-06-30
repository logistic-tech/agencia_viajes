import { useState, useEffect } from "react";
import { HiOutlineX } from "react-icons/hi";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import IconWord from "../assets/iconWord.svg";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export function ViewAttach({ file, closeView, typeDocument }) {
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar, renderDefaultToolbar } = toolbarPluginInstance;
  const [pdfUrl, setPdfUrl] = useState(null);
  const transform = (slot) => {
    const { Open, ...restSlot } = slot;

    // Return the slot without the "Open" component
    return {
      ...restSlot,
      Open: () => null, // Renders nothing, effectively hiding the "Open" component
    };
  };
  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPdfUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div className="rounded-lg bg-slate-200 p-4 relative w-full h-full ">
        <button
          className="absolute top-3 right-3 p-2 bg-gray-600 text-white rounded"
          onClick={closeView}
        >
          <HiOutlineX />
        </button>
        {typeDocument === "pdf" ? (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.js">
            <div className="w-full h-full overflow-hidden">
              {" "}
              {pdfUrl && (
                <>
                  <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
                  <Viewer
                    fileUrl={pdfUrl}
                    plugins={[toolbarPluginInstance]}
                    defaultScale={1}
                  />
                </>
              )}
            </div>
          </Worker>
        ) : (
          <div className="flex flex-col items-center">
            <img src={IconWord} alt="document" className="w-20 h-20" />
            <p className="text-lg font-bold">{file.name}</p>
            <a
              href={URL.createObjectURL(file)}
              download={file.name}
              className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
            >
              Descargar
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
