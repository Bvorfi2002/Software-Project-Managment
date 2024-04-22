const express = require('express');
const router = express.Router();

const { commissionSalesAgentModel, commissionPhoneAgentModel } = require('../models/financial/commission.js');
const Sale = require('../models/financial/sale.js');
const SalesAgent = require('../models/users/sales_agent.js');
const PhoneAgent = require('../models/users/phone_agent.js');

// Import the commission calculation functions
const { 
    calculateSpifCommission, 
    calculateTieredCommission, 
    calculatePhoneAgentCommission 
} = require('../utils/commissionCalculator.js');

// Get all commissions
router.get('/', async (req, res) => {
    try {
        const salesAgentCommissions = await commissionSalesAgentModel.find();
        const phoneAgentCommissions = await commissionPhoneAgentModel.find();
        res.json({salesAgentCommissions, phoneAgentCommissions});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create new commission
router.post('/', async (req, res) => {
    const { agentType, agent_id, commission_type, amount, date, contractValue, namesCount, salesCount, saleValue, installationCompleted } = req.body;

    // Calculate the commission based on the type
    let calculatedAmount;
    if (commission_type === 'spif') {
        calculatedAmount = calculateSpifCommission(contractValue, namesCount);
    } else if (commission_type === 'tiered') {
        calculatedAmount = calculateTieredCommission(salesCount);
    } else if (agentType === 'PhoneAgent') {
        calculatedAmount = calculatePhoneAgentCommission(saleValue, installationCompleted);
    }

    let CommissionModel = agentType === 'SalesAgent' ? commissionSalesAgentModel : commissionPhoneAgentModel;
    const newCommission = new CommissionModel({
        agent_id,
        commission_type,
        amount: calculatedAmount,
        date
    });

    try {
        const savedCommission = await newCommission.save();
        res.status(201).json(savedCommission);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Approve commission
router.patch('/:id', getCommission, async (req, res) => {
    if (req.body.approved != null) {
        res.commission.approved = req.body.approved;
    }

    try {
        const updatedCommission = await res.commission.save();
        res.json(updatedCommission);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

async function getCommission(req, res, next) {
    let commission;
    try {
        commission = await commissionSalesAgentModel.findById(req.params.id);
        if (commission == null) {
            commission = await commissionPhoneAgentModel.findById(req.params.id);
        }
        if (commission == null) {
            return res.status(404).json({ message: 'Cannot find commission' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.commission = commission;
    next();
}

module.exports = router;
