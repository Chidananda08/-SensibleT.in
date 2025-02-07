const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  transaction_type: {
    type: String,
    enum: ['DEPOSIT', 'WITHDRAWAL'],
    required: true,
  },
  user: {
    type: String, // Assuming user IDs are strings (e.g., UUID or MongoDB IDs)
    required: true,
  },
  status: {
    type: String,
    enum: ['PENDING', 'COMPLETED', 'FAILED'],
    default: 'PENDING',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Transaction', transactionSchema);
