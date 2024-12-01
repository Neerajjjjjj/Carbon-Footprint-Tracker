import React, { useState } from "react";
import "./Calculate.css"; // Ensure this CSS file exists for custom styling

const Calculate = () => {
  const [formData, setFormData] = useState({
    distance: 0,
    fuelType: "Petrol",
    modeOfTransport: "Car",
    riders: 1,
    traffic: "Low",
    idleTime: 0,
    nighttime: "No",
  });

  const [results, setResults] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock calculation for CO2 emissions
    const emissions = (formData.distance * 0.1).toFixed(2); // Example logic
    const savings = (formData.riders * 0.1).toFixed(2); // Example logic
    const impact = (emissions - savings).toFixed(2);

    setResults({
      emissions,
      savings,
      impact,
    });
  };

  return (
    <div className="container">
      <h1 className="title">Eco-Friendly Ride Calculator</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Distance (km):
          <input
            type="number"
            name="distance"
            value={formData.distance}
            onChange={handleChange}
          />
        </label>
        <label>
          Fuel Type:
          <select
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
          >
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
          </select>
        </label>
        <label>
          Mode of Transport:
          <select
            name="modeOfTransport"
            value={formData.modeOfTransport}
            onChange={handleChange}
          >
            <option value="Car">Car</option>
            <option value="Bike">Bike</option>
            <option value="Bus">Bus</option>
          </select>
        </label>
        <label>
          Riders:
          <input
            type="number"
            name="riders"
            value={formData.riders}
            onChange={handleChange}
          />
        </label>
        <label>
          Traffic:
          <select
            name="traffic"
            value={formData.traffic}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
        <label>
          Idle Time (minutes):
          <input
            type="number"
            name="idleTime"
            value={formData.idleTime}
            onChange={handleChange}
          />
        </label>
        <label>
          Nighttime (Yes/No):
          <select
            name="nighttime"
            value={formData.nighttime}
            onChange={handleChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </label>
        <button type="submit">Calculate</button>
      </form>

      {results && (
        <div className="results">
          <h2>Results</h2>
          <p>Emissions: {results.emissions} grams of CO2</p>
          <p>Eco Savings: {results.savings} grams of CO2</p>
          <p>
            You have saved approximately {results.impact} kg of CO2!
          </p>
        </div>
      )}
    </div>
  );
};

export default Calculate; 