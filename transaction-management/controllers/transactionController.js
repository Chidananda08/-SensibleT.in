const Transaction = require('../models/transactionModel');

// Create a new transaction
exports.createTransaction = async (req, res) => {
  const { amount, transaction_type, user } = req.body;
  try {
    const transaction = await Transaction.create({ amount, transaction_type, user });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Retrieve transactions for a specific user
exports.getTransactionsByUser = async (req, res) => {
  const { user_id } = req.query;
  try {
    const transactions = await Transaction.find({ user: user_id });
    res.status(200).json({ transactions });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Retrieve a specific transaction by ID
exports.getTransactionById = async (req, res) => {
  const { transaction_id } = req.params;
  try {
    const transaction = await Transaction.findById(transaction_id);
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    res.status(200).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update transaction status
exports.updateTransactionStatus = async (req, res) => {
  const { transaction_id } = req.params;
  const { status } = req.body;

  if (!['COMPLETED', 'FAILED'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    const transaction = await Transaction.findByIdAndUpdate(
      transaction_id,
      { status },
      { new: true }
    );
    if (!transaction) return res.status(404).json({ message: 'Transaction not found' });
    res.status(200).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
