import React from "react";
import {
  Button,
  Checkbox,
  Label,
  Radio,
  Select,
  TextInput,
  Datepicker,
} from "flowbite-react";
import { FiMapPin, FiCalendar, FiUser } from "react-icons/fi";

export default function Search() {
  return (
    <div className="bg-gray-50 py-16 px-4 md:px-12 lg:px-20 flex flex-col items-center">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-10 max-w-2xl">
        Cheap Flights — Compare & Pay Less
      </h1>

      <div className="relative z-10 bg-white w-full max-w-6xl rounded-3xl shadow-xl p-8 md:p-10 space-y-8">
        {/* Trip type */}
        <div className="flex flex-wrap justify-center gap-6">
          <Label className="flex items-center gap-2 text-gray-700 font-medium cursor-pointer">
            <Radio name="tripType" value="round-trip" defaultChecked />
            Round-trip
          </Label>
          <Label className="flex items-center gap-2 text-gray-700 font-medium cursor-pointer">
            <Radio name="tripType" value="one-way" />
            One-way
          </Label>
          <Label className="flex items-center gap-2 text-gray-700 font-medium cursor-pointer">
            <Radio name="tripType" value="multi-destination" />
            Multi-destination
          </Label>
        </div>

        {/* Form fields */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
          <div className="relative w-full">
            <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <TextInput
              placeholder="From"
              className="pl-10"
            />
          </div>

          <div className="relative w-full">
            <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <TextInput
              placeholder="To (e.g. New York)"
              className="pl-10"
            />
          </div>
<div className="w-full z-30">
  <Datepicker
    placeholder="Departure"
    className="w-full"
    language="en"
  />
</div>


          <div className="relative w-full z-30">
             <Datepicker
              placeholder="Return"
              className="pl-10 w-full"
              language="en"
            />
          </div>

          <div className="relative w-full">
            <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Select className="pl-10 w-full text-sm">
              <option>1 passenger, Economy</option>
              <option>2 passengers, Economy</option>
              <option>1 passenger, Business</option>
              <option>2 passengers, Business</option>
            </Select>
          </div>

          <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-xl shadow-md transition-all">
            Search
          </Button>
        </div>
      </div>

      {/* Cheapest dates checkbox */}
      <div className="mt-6 flex items-center gap-3 text-sm text-gray-600">
        <Checkbox id="cheapest" />
        <Label htmlFor="cheapest">Show cheapest dates</Label>
      </div>
    </div>
  );
}
