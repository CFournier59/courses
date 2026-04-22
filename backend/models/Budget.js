const mongoose = require('mongoose');
const auth = require('../middleware/auth');

const budgetSchema = mongoose.Schema({
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    classified: { type: Boolean, required: true, default: false },

});

module.exports = mongoose.model('Budget', budgetSchema);