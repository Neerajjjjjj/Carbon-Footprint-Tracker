const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Import routes
const calculateRoutes = require("./routes/calculate");
const savingsRoutes = require("./routes/savings");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/calculate", calculateRoutes);
app.use("/api/savings", savingsRoutes);

// New route to handle trip data and calculate emissions
app.post("/api/trip", (req, res) => {
  const {
    distance,
    fuelType,
    transportMode,
    riders,
    traffic,
    idleTime,
    nighttime,
  } = req.body;

  // Simple validation
  if (
    !distance ||
    !fuelType ||
    !transportMode ||
    !riders ||
    !traffic ||
    idleTime === undefined ||
    nighttime === undefined
  ) {
    return res
      .status(400)
      .send(
        "All fields (distance, fuelType, transportMode, riders, traffic, idleTime, nighttime) are required."
      );
  }

  // Calculate emissions
  const emissions = calculateEmissions(
    distance,
    fuelType,
    transportMode,
    riders,
    traffic,
    idleTime,
    nighttime
  );

  // Respond with emissions data
  res.json({ emissions });
});

// Function to calculate emissions based on trip data
function calculateEmissions(
  distance,
  fuelType,
  transportMode,
  riders,
  traffic,
  idleTime,
  nighttime
) {
  let emissionsFactor = 0;

  // Emission factors based on fuel type (grams of CO2 per liter or km)
  const fuelEmissionFactors = {
    Petrol: 2.31, // Petrol CO2 emission per liter
    Diesel: 2.68, // Diesel CO2 emission per liter
    Electric: 0.0, // Assuming no emissions for electric vehicles
  };

  emissionsFactor = fuelEmissionFactors[fuelType] || 0;

  // Additional factors based on traffic and nighttime
  const trafficMultiplier = {
    Low: 1.0,
    Medium: 1.2,
    High: 1.5,
  };

  const nighttimeMultiplier = nighttime ? 1.1 : 1.0; // 10% more emissions at night
  const idleMultiplier = 0.01 * idleTime; // 1% additional emissions per minute of idle time

  // Base emissions calculation
  let emissions = distance * emissionsFactor;

  // Adjust emissions for traffic, idle time, and nighttime
  emissions *= trafficMultiplier[traffic] || 1.0;
  emissions *= nighttimeMultiplier;
  emissions += emissions * idleMultiplier;

  // Divide emissions equally among riders if applicable
  if (riders > 1) {
    emissions = emissions / riders;
  }

  return emissions.toFixed(2); // Return emissions rounded to 2 decimal places
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});