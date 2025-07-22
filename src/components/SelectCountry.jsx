import { useState, useEffect } from "react";
import Select from "react-select";
import countries from "../utils/data/Countries.json";
export default function SelectCountry({ value, onChange }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const formatted = countries.map((c) => ({
      value: c.Id,
      label: c.CountryName,
      // flag queda, pero no se usa en render
      flag: c.Flag,
    }));
    setOptions(formatted);
  }, []);

  const handleChange = (selected) => {
    if (onChange) {
      onChange({ id: selected.value, name: selected.label });
    }
  };

  // Ya no se usan estos componentes para imagen, puedes eliminar si quieres
  /*
  const customSingleValue = ({ data }) => (
    <div className="flex items-center gap-2">
      <span>{data.label}</span>
    </div>
  );

  const customOption = (props) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div ref={innerRef} {...innerProps} className="p-2 hover:bg-gray-100">
        <span>{data.label}</span>
      </div>
    );
  };
  */

  const customStyles = {
    control: (base, state) => ({
      ...base,
      backgroundColor: "#f9fafb",
      borderColor: state.isFocused ? "#fb923c" : "#d1d5db",
      boxShadow: state.isFocused ? "0 0 0 1px #fb923c" : "none",
      "&:hover": {
        borderColor: "#fb923c",
      },
      paddingLeft: "0.5rem",
      fontSize: "0.875rem",
      height: "2.25rem",
      minHeight: "2.25rem",
      borderRadius: "0.375rem",
    }),
    valueContainer: (base) => ({
      ...base,
      padding: "0 0.25rem",
      height: "2.25rem",
    }),
    indicatorsContainer: (base) => ({
      ...base,
      height: "2.25rem",
    }),
    input: (base) => ({
      ...base,
      margin: 0,
      padding: 0,
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? "#fb923c"
        : state.isFocused
        ? "#fcd34d"
        : "white",
      color: state.isSelected ? "white" : "black",
      fontSize: "0.875rem",
      padding: "0.375rem 0.75rem",
    }),
    singleValue: (base) => ({
      ...base,
      fontSize: "0.875rem",
      color: "#111827",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#9ca3af",
      fontSize: "0.875rem",
    }),
  };

  return (
    <Select
      options={options}
      onChange={handleChange}
      placeholder="país"
      className="w-full"
      classNamePrefix="react-select"
      styles={customStyles}
      // quitar componentes personalizados para no mostrar imagenes
      // components={{ SingleValue: customSingleValue, Option: customOption }}
      defaultValue={
        value
          ? options.find(
              (opt) =>
                opt.value === value ||
                opt.label.toLowerCase() === value?.toLowerCase()
            )
          : null
      }
      isSearchable
    />
  );
}
