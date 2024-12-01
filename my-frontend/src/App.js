import React, { useState } from 'react';
import './App.css';

function App() {
  const [distance, setDistance] = useState('');
  const [fuelType, setFuelType] = useState('Petrol');
  const [mode, setMode] = useState('Car');
  const [riders, setRiders] = useState('');
  const [traffic, setTraffic] = useState('Low');
  const [idleTime, setIdleTime] = useState('');
  const [nighttime, setNighttime] = useState('No');
  const [result, setResult] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const emissionFactor = fuelType === 'Petrol' ? 2.3 : fuelType === 'Diesel' ? 2.7 : 0;
    const trafficMultiplier = traffic === 'High' ? 1.5 : traffic === 'Medium' ? 1.2 : 1;
    const nighttimeMultiplier = nighttime === 'Yes' ? 0.8 : 1;

    const totalEmission =
      (distance * emissionFactor * trafficMultiplier * nighttimeMultiplier) /
      (riders || 1);

    setResult(`Estimated Emissions: ${totalEmission.toFixed(2)} kg CO₂`);
  };

  return (
    <div className="container">
      <h1 className="title">Eco-Friendly Ride Calculator</h1>
      <form className="form" onSubmit={handleSubmit}>
        <label className="label">
          Distance (km):
          <input
            type="number"
            className="input"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            required
          />
        </label>
        <label className="label">
          Fuel Type:
          <select
            className="select"
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
          >
            <option>Petrol</option>
            <option>Diesel</option>
            <option>Electric</option>
          </select>
        </label>
        <label className="label">
          Mode of Transport:
          <select
            className="select"
            value={mode}
            onChange={(e) => setMode(e.target.value)}
          >
            <option>Car</option>
            <option>Bike</option>
            <option>Bus</option>
          </select>
        </label>
        <label className="label">
          Riders:
          <input
            type="number"
            className="input"
            value={riders}
            onChange={(e) => setRiders(e.target.value)}
          />
        </label>
        <label className="label">
          Traffic:
          <select
            className="select"
            value={traffic}
            onChange={(e) => setTraffic(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </label>
        <label className="label">
          Idle Time (minutes):
          <input
            type="number"
            className="input"
            value={idleTime}
            onChange={(e) => setIdleTime(e.target.value)}
          />
        </label>
        <label className="label">
          Nighttime (Yes/No):
          <select
            className="select"
            value={nighttime}
            onChange={(e) => setNighttime(e.target.value)}
          >
            <option>No</option>
            <option>Yes</option>
          </select>
        </label>
        <button type="submit" className="button">Submit</button>
      </form>

      {result && <div className="result">{result}</div>}
    </div>
  );
}

export default App;

