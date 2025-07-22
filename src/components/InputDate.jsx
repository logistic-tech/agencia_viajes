import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

export default function InputDate({ value, onChange }) {
  const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);

  const handleChange = (date) => {
    setSelectedDate(date);

    if (onChange && date instanceof Date && !isNaN(date)) {
      onChange({
        date,
        formattedDate: format(date, "MMMM d, yyyy"), // Ejemplo: July 22, 2025
      });
    }
  };

  return (
    <div className="w-full">
      <label className=" text-sm font-medium text-gray-700 ">Fecha</label>
      <DatePicker
        selected={selectedDate}
        onChange={handleChange}
        dateFormat="MMMM d, yyyy"
        placeholderText="Selecciona una fecha"
        className="w-full border border-gray-300 rounded-md p-2 text-sm"
      />
    </div>
  );
}
