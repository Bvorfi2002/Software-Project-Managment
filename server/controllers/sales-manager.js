const express = require('express');
const router = express.Router();

const Sale = require('../models/financial/sale');
const SalesAgent = require('../models/users/sales_agent.js');

// Get all sales
router.get('/', async (req, res) => {
    try {
        const sales = await Sale.find().populate('s_ag_id p_ag_id client_id');
        res.json(sales);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new sale
router.post('/', async (req, res) => {
    const { s_ag_id, p_ag_id, date, amount, sale_type, client_id, ref_count, approved, contract_path } = req.body;
    const newSale = new Sale({
        s_ag_id,
        p_ag_id,
        date,
        amount,
        sale_type,
        client_id,
        ref_count,
        approved,
        contract_path
    });

    try {
        const savedSale = await newSale.save();
        res.status(201).json(savedSale);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get a specific sale
router.get('/:id', getSale, (req, res) => {
    res.json(res.sale);
});

// Update a sale
router.patch('/:id', getSale, async (req, res) => {
    if (req.body.approved != null) {
        res.sale.approved = req.body.approved;
    }

    try {
        const updatedSale = await res.sale.save();
        res.json(updatedSale);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Middleware function for getting a sale by ID
async function getSale(req, res, next) {
    let sale;
    try {
        sale = await Sale.findById(req.params.id).populate('s_ag_id p_ag_id client_id');
        if (sale == null) {
            return res.status(404).json({ message: 'Cannot find sale' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.sale = sale;
    next();
}

// Get all sales agents
router.get('/salesagents', async (req, res) => {
    try {
        const salesAgents = await SalesAgent.find();
        res.json(salesAgents);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific sales agent
router.get('/salesagents/:id', getSalesAgent, (req, res) => {
    res.json(res.salesAgent);
});

// Middleware function for getting a sales agent by ID
async function getSalesAgent(req, res, next) {
    let salesAgent;
    try {
        salesAgent = await SalesAgent.findById(req.params.id);
        if (salesAgent == null) {
            return res.status(404).json({ message: 'Cannot find sales agent' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.salesAgent = salesAgent;
    next();
}

module.exports = router;
