import React from "react";
/* import {
  Button,
  Checkbox,
  Label,
  Radio,

} from "flowbite-react"; */
import { FiMapPin,FiUser } from "react-icons/fi";
import SelectCountry from "./SelectCountry";
import InputDate from "./InputDate";

export default function Search() {
  return (
    <div className="bg-gray-50 py-16 px-4 md:px-12 lg:px-20 flex flex-col items-center text-gray-400">
      {/* <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-10 max-w-2xl">
        Cheap Flights — Compare & Pay Less
      </h1>

      <div className="relative z-10 bg-white w-full max-w-6xl rounded-3xl shadow-xl p-8 md:p-10 space-y-8 text-gray-400">
        <div className="flex  flex-wrap justify-center gap-6">
          <Label color="gray" className="flex items-center gap-2 text-gray-700 font-medium cursor-pointer">
            <Radio className="bg-white dark:bg-white" name="tripType" value="round-trip" defaultChecked />
            Round-trip
          </Label>
          <Label  className="flex items-center gap-2 text-gray-700 dark:text-gray-700 font-medium cursor-pointer">
            <Radio className="bg-white dark:bg-white" name="tripType" value="one-way" />
            One-way
          </Label>
          <Label color="gray" className="flex items-center gap-2 text-gray-700 font-medium cursor-pointer">
            <Radio className="bg-white dark:bg-white" name="tripType" value="multi-destination" />
            Multi-destination
          </Label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">

  <div className="w-full mb-4">
  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
    From
  </label>
  <SelectCountry  value={"2"} // o "Afghanistan"
  onChange={(pais) => {
    console.log("Seleccionado:", pais); // { id: "2", name: "Afghanistan" }
  }}/>
</div>


      <div className="w-full mb-4">
  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
    To
  </label>
  <SelectCountry  value={"2"} 
  onChange={(pais) => {
    console.log("Seleccionado:", pais);
  }}/>
</div>

      <div className="w-full mb-4">
      <InputDate onChange={(pais) => {
    console.log("Seleccionado:", pais)}} />
</div>
<div className="w-full mb-4">
      <InputDate onChange={(pais) => {
    console.log("Seleccionado:", pais)}} />
</div>

      <div className="relative w-full mb-4">
  <label htmlFor="passenger-class" className="block text-sm font-medium text-gray-700 mb-1">
    Pasajeros y clase
  </label>
  <select
    id="passenger-class"
    name="passenger-class"
    className="block w-full  p-2 text-sm border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none"
  >
    <option>1 passenger, Economy</option>
    <option>2 passengers, Economy</option>
    <option>1 passenger, Business</option>
    <option>2 passengers, Business</option>
  </select>


  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
    <svg
      className="h-4 w-4 text-gray-400"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.355a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  </div>
</div>


      <Button
        color="orange"
        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-xl shadow-md transition-all"
      >
        Search
      </Button>
    </div>
      </div>


      <div className="mt-6 flex items-center gap-3 text-sm text-gray-600 dark:text-gray-600">
        <Checkbox className="bg-white dark:bg-white" id="cheapest" />
        <Label color="gray"  htmlFor="cheapest">Show cheapest dates</Label>
      </div> */}
    </div>
  );
}
