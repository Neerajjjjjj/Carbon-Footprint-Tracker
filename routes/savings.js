// routes/savings.js
const express = require('express');
const router = express.Router();
const Savings = require('../models/savingsModel');  // Import the model

// Endpoint to save savings data
router.post('/', (req, res) => {
    const { userId, totalSavings } = req.body;

    const newSavings = new Savings({
        userId,
        totalSavings,
    });

    newSavings.save()
        .then(result => {
            res.json({ message: 'Savings data saved successfully', result });
        })
        .catch(err => {
            res.status(500).json({ error: 'Error saving data to the database' });
        });
});

// Endpoint to get savings data
router.get('/:userId', (req, res) => {
    const { userId } = req.params;

    Savings.find({ userId })  // Use the model's find method
        .then(results => {
            res.json(results);
        })
        .catch(err => {
            res.status(500).json({ error: 'Error retrieving data from the database' });
        });
});

module.exports = router;