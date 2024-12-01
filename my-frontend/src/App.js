import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "./api"; // Import the backend URL
import ResultsPage from "./ResultsPage"; // New ResultsPage component to display emissions
import EcoImpact from "./EcoImpact"; // New EcoImpact component to show milestones and savings

const App = () => {
  const [distance, setDistance] = useState("");
  const [fuelType, setFuelType] = useState("Petrol");
  const [transportMode, setTransportMode] = useState("Car");
  const [riders, setRiders] = useState("");
  const [traffic, setTraffic] = useState("Low");
  const [idleTime, setIdleTime] = useState("");
  const [nighttime, setNighttime] = useState(false);
  const [emissions, setEmissions] = useState(null);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send trip data to the backend
      const response = await axios.post(`${API_BASE_URL}/api/trip`, {
        distance,
        fuelType,
        transportMode,
        riders,
        traffic,
        idleTime,
        nighttime,
      });

      // Set emissions from the backend response
      setEmissions(response.data.emissions);
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  return (
    <div>
      <h1>Eco-Friendly Ride Calculator</h1>
      
      {/* TripForm: Collect trip details */}
      <form onSubmit={handleSubmit}>
        <label>
          Distance (km):
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          Fuel Type:
          <select
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
          >
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>
        </label>
        <br />

        <label>
          Mode of Transport:
          <select
            value={transportMode}
            onChange={(e) => setTransportMode(e.target.value)}
          >
            <option value="Car">Car</option>
            <option value="Bike">Bike</option>
            {/* Add more transport modes as required */}
          </select>
        </label>
        <br />

        <label>
          Riders:
          <input
            type="number"
            value={riders}
            onChange={(e) => setRiders(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          Traffic:
          <select
            value={traffic}
            onChange={(e) => setTraffic(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
        <br />

        <label>
          Idle Time (minutes):
          <input
            type="number"
            value={idleTime}
            onChange={(e) => setIdleTime(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          Nighttime (Yes/No):
          <select
            value={nighttime ? "Yes" : "No"}
            onChange={(e) => setNighttime(e.target.value === "Yes")}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        <br />

        <button type="submit">Submit</button>
      </form>

      {/* Display results and eco-impact after emissions are calculated */}
      {emissions && (
        <div>
          <ResultsPage emissions={emissions} />
          <EcoImpact emissions={emissions} />
        </div>
      )}
    </div>
  );
};

export default App;
