const express = require('express');
const router = express.Router();

const { commissionSalesAgentModel, commissionPhoneAgentModel } = require('../models/financial/commission.js');
const MonthlyCommission = require('../models/financial/monthly_commission.js');
const Sale = require('../models/financial/sale.js');
const SalesAgent = require('../models/users/sales_agent.js');
const PhoneAgent = require('../models/users/phone_agent.js');
const {commissionSalesAgentModel, commissionPhoneAgentModel} = require('../models/financial/commission.js')

// Import the commission calculation functions
const { 
    calculateSpifCommission, 
    calculateTieredCommission, 
    calculatePhoneAgentCommission 
} = require('../utils/commissionCalculator.js');

const get_all_commissions = async () => {
    const commissions = await Commission.find({});
    return await commissions;
}

const create_spif_commission_phone_agent = async (saleObj) => {
    const sale = new Sale({
        ...saleObj
    })

    let calculatedAmount = 1.5;
    if(sale.amount > 50) {
        calculatedAmount += 5;
    }

    const commission = new commissionPhoneAgentModel({
        agent_id: sale.p_ag_id,
        amount: calculatedAmount,
        commission_type: 'spif',
        date: Date.now()
    });

    await commission.save();
}

const create_spif_commission_installation_phone_agent = async (id) => {
    const commission = new commissionPhoneAgentModel({
        agent_id: id,
        amount: 10,
        commission_type: 'spif',
        date: Date.now()
    });

    await commission.save();
}

const create_spif_commission_sales_agent = async (saleObj) => {
    try {
        const sale = new Sale({
            ...saleObj
        })

        let calculatedAmount;

        const hasTenNames = sale.ref_count >= 10 ? true : false;
        const saleAmount = sale.amount;
    
        if(saleAmount >= 295) {
            calculatedAmount = hasTenNames ? 25 : 20;
        }
        else if (saleAmount >= 200 ) {
            calculatedAmount = hasTenNames ? 20 : 15;
        }
        else if (saleAmount >= 100) {
            calculatedAmount = hasTenNames ? 15 : 10;
        }
        else if (saleAmount >= 50) {
            calculatedAmount = hasTenNames ? 10 : 5;
        }

        const commission = new commissionSalesAgentModel({
            agent_id: sale.s_ag_id,
            commission_type: 'spif',
            amount: calculatedAmount,
            date: Date.now(),
        });

        await commission.save();
    }
    catch (error) {
        return `Error creating commission record: ${error.message}`;
    }
}

const create_tiered_commission_sales_agent = async (saleObj) => {
    try {
        const sale = new Sale({
            ...saleObj
        })

        const today = new Date();
        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

        const salesCount = await Sale.countDocuments({
            s_ag_id: sale.s_ag_id,
            date: {$gte: firstDayOfMonth},
            approved: true
        });

        let calculatedAmount;

        if(salesCount <= 3) {
            calculatedAmount = 140;
        }
        else if(salesCount === 5) {
            // 150 for each of the last two sales + 10 for each of the first three sales.
            calculatedAmount = 330; 
        }
        else if(salesCount === 7) {
            // 160 for each of the last two sales + 10 for each of the previous five sales.
            calculatedAmount = 370;
        }

        const commission = new commissionSalesAgentModel({
            agent_id: sale.s_ag_id,
            commission_type: 'tiered',
            amount: calculatedAmount,
            date: Date.now(),
        });

        await commission.save();
    }
    catch(error) {
        return `Error creating commission record: ${error.message}`;
    }
}

const create_all_monthly_commissions = async (sales_agents) => {
    const commissions = [];
    
    for(const agent of sales_agents) {
        const monthly_commission = new MonthlyCommission({
            agent_id: agent.sales_agent_id,
            amount: 0,
            start_date: Date()
        });

        commissions.push(monthly_commission);
    }

    await MonthlyCommission.insertMany(commissions);
}

const create_monthly_commission = async (sales_agent) => {
    const monthly_commission = new MonthlyCommission({
        agent_id: sales_agent.sales_agent_id,
        amount: 0,
        start_date: Date()
    });

    await monthly_commission.save();
}

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
