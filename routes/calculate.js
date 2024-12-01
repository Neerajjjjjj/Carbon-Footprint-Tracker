const express = require('express');
const router = express.Router();

// Endpoint for calculating carbon savings
router.post('/', (req, res) => {
    const { distance, riders, fuelType, traffic, idleTime, nighttime } = req.body;

    try {
        // Constants
        const baseEmissions = 251; // grams per km
        const fuelAdjustments = { petrol: 1, diesel: 1.15, ev: 0 };
        const trafficAdjustments = { light: 1, moderate: 1.1, heavy: 1.2 };

        // Adjustments
        const fuelAdjustment = fuelAdjustments[fuelType.toLowerCase()] || 1;
        const trafficAdjustment = trafficAdjustments[traffic.toLowerCase()] || 1;
        const idleEmissions = (idleTime || 0) * 10;
        const nighttimeAdjustment = nighttime ? 0.95 : 1;

        // Calculate emissions
        let totalEmissions = distance * baseEmissions * fuelAdjustment * trafficAdjustment * nighttimeAdjustment;
        totalEmissions += idleEmissions;

        // Shared emissions
        const perPersonEmissions = totalEmissions / riders;

        res.json({ totalEmissions, perPersonEmissions });
    } catch (error) {
        res.status(500).json({ error: 'Error calculating emissions' });
    }
});

module.exports=router;