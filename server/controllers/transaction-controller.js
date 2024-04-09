const express = require('express');
const router = express.Router();

const Transaction = require('../models/financial/transaction.js');
const SalesAgent = require('../models/users/sales_agent.js');

// Get all transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new transaction
router.post('/', async (req, res) => {
    const { transaction_type, incoming, date, comments, amount } = req.body;
    const newTransaction = new Transaction({
        transaction_type,
        incoming,
        date,
        comments,
        amount
    });

    try {
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get a specific transaction
router.get('/:id', getTransaction, (req, res) => {
    res.json(res.transaction);
});

// Delete a transaction
router.delete('/:id', getTransaction, async (req, res) => {
    try {
        await res.transaction.remove();
        res.json({ message: 'Deleted transaction' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function for getting a transaction by ID
async function getTransaction(req, res, next) {
    let transaction;
    try {
        transaction = await Transaction.findById(req.params.id);
        if (transaction == null) {
            return res.status(404).json({ message: 'Cannot find transaction' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.transaction = transaction;
    next();
}

module.exports = router;
