import React, { useState } from 'react'
import Input from '../Inputs/Input';

const AddTripForm = ({ handleAddTrip }) => {
  const [tripData, setTripData] = useState({
    tripName: "",
    startDate: "",
    endDate: "",
    park: "",
  });

  const handleChange = (key, value) => setTripData({ ...tripData, [key]: value });

  return (
    <div>
      <form>
        <Input
          value={tripData.location}
          onChange={({ target }) => handleChange("tripName", target.value)}
          label="Trip Name"
          placeholder="Enter name for trip"
          type="text"
        />

        {/* TailwindCSS Dropdown */}
        <label className="text-[16px] text-slate-800">
          Park
        </label>
        <select
          value={tripData.park}
          onChange={e => handleChange("park", e.target.value)}
          className="input-box block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-gray-900"
        >
          <option value="">Select a park</option>
          <option value="Magic Kingdom">Magic Kingdom</option>
          <option value="Epcot">Epcot</option>
          <option value="Animal Kingdom">Animal Kingdom</option>
          <option value="Hollywood Studios">Hollywood Studios</option>
          <option value="Disneyland">Disneyland</option>
          <option value="California Adventure">California Adventure</option>
        </select>

        <Input
          value={tripData.startDate}
          onChange={({ target }) => handleChange("startDate", target.value)}
          label="Start Date"
          placeholder=""
          type="date"
        />

        <Input
          value={tripData.endDate}
          onChange={({ target }) => handleChange("endDate", target.value)}
          label="End Date"
          placeholder=""
          type="date"
        />

         <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add btn-fill"
          onClick={() => handleAddTrip(tripData)}
        >
          Add Trip
        </button>
      </div>
      </form>
    </div>
  )
}

export default AddTripForm
