const express = require('express');
const router = express.Router();

const { commissionSalesAgentModel, commissionPhoneAgentModel } = require('../models/financial/commission.js');
const MonthlyCommission = require('../models/financial/monthly_commission.js');
const Sale = require('../models/financial/sale.js');
const SalesAgent = require('../models/users/sales_agent.js');
const PhoneAgent = require('../models/users/phone_agent.js');

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
    await update_monthly_commission(commission);
}

const create_spif_commission_installation_phone_agent = async (id) => {
    const commission = new commissionPhoneAgentModel({
        agent_id: id,
        amount: 10,
        commission_type: 'spif',
        date: Date.now()
    });

    await commission.save();
    await update_monthly_commission(commission);
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
        await update_monthly_commission(commission);
    }
    catch (error) {
        return `Error creating commission record: ${error.message}`;
    }
}

const create_tiered_commission_sales_agent = async (s_ag_id, refCount) => {
    try {
        const calculatedAmount = 0.5 * refCount;
        const commission = new commissionSalesAgentModel({
            agent_id: s_ag_id,
            commission_type: 'tiered',
            amount: calculatedAmount,
            date: Date.now(),
        });

        await commission.save();
        return { result: true, message: "Commission correct!" }
        // await update_monthly_commission(commission);
    }
    catch(error) {
        return await create_spif_commission_sales_agent(s_ag_id, refCount);
    }
}

const create_all_monthly_commissions = async (agents) => {
    const commissions = [];
    
    for(const agent of agents) {
        if(agent.sales_agent_id !== undefined) {
            const monthly_commission = new MonthlyCommission({
            agent_id: agent.sales_agent_id,
            amount: 0,
            start_date: Date()
            });

            commissions.push(monthly_commission);
        }
        else {
            const monthly_commission = new MonthlyCommission({
            agent_id: agent.phone_agent_id,
            amount: 0,
            start_date: Date()
            });

            commissions.push(monthly_commission);
        }
    }

    await MonthlyCommission.insertMany(commissions);
}

const create_monthly_commission = async (agent) => {
    if(agent.sales_agent_id !== undefined) {
        const monthly_commission = new MonthlyCommission({
        agent_id: agent.sales_agent_id,
        amount: 0,
        start_date: Date()
        });

        await monthly_commission.save();
    }
    else {
        const monthly_commission = new MonthlyCommission({
        agent_id: agent.phone_agent_id,
        amount: 0,
        start_date: Date()
        });

        await monthly_commission.save();
    }
}

const update_monthly_commission = async (commission) => {
    try {
        const monthly_commission = await MonthlyCommission.findOne({agent_id: commission.agent_id});

        if (!monthly_commission) {
            throw new Error(`Monthly commission record not found for agent ${commission.agent_id}`);
        }

        monthly_commission.amount += commission.amount;

        await monthly_commissions.save();
    }
    catch(error) {
        console.error('Error updating monthly commission:', error.message);
    }
    
}


module.exports = {
    create_tiered_commission_sales_agent
};
