const express = require('express');
const {
  createTransaction,
  getTransactionsByUser,
  getTransactionById,
  updateTransactionStatus,
} = require('../controllers/transactionController');

const router = express.Router();

// POST /api/transactions/
router.post('/', createTransaction);

// GET /api/transactions/?user_id=1
router.get('/', getTransactionsByUser);

// GET /api/transactions/:transaction_id
router.get('/:transaction_id', getTransactionById);

// PUT /api/transactions/:transaction_id
router.put('/:transaction_id', updateTransactionStatus);

module.exports = router;
