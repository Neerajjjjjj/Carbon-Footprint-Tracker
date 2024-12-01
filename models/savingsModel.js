const mongoose = require('mongoose');

const savingsSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    totalSavings: { type: Number, required: true },
}, { timestamps: true });

const Savings = mongoose.model('Savings', savingsSchema);

module.exports = Savings;