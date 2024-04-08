const express = require('express');
const router = express.Router();

const { commissionSalesAgentModel, commissionPhoneAgentModel } = require('../models/financial/commission');

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
    const { agentType, agent_id, commission_type, amount, date } = req.body;
    let CommissionModel = agentType === 'SalesAgent' ? commissionSalesAgentModel : commissionPhoneAgentModel;
    const newCommission = new CommissionModel({
        agent_id,
        commission_type,
        amount,
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
