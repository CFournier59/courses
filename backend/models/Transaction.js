const mongoose = require('mongoose');
const auth = require('../middleware/auth');

const transactionSchema = mongoose.Schema({
    budgetId: { type: String, required: true },
    userId: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
});

module.exports = mongoose.model('Transaction', transactionSchema);