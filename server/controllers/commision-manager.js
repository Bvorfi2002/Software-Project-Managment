const express = require("express");
const router = express.Router();

const {
  commissionSalesAgentModel,
  commissionPhoneAgentModel,
} = require("../models/financial/commission.js");
const MonthlyCommission = require("../models/financial/monthly_commission.js");
const Sale = require("../models/financial/sale.js");
const SalesAgent = require("../models/users/sales_agent.js");
const PhoneAgent = require("../models/users/phone_agent.js");

// Import the commission calculation functions
const {
  calculateSpifCommission,
  calculateTieredCommission,
  calculatePhoneAgentCommission,
} = require("../utils/commissionCalculator.js");

const get_all_commissions = async () => {
  const commissions = await Commission.find({});
  return await commissions;
};

const create_spif_commission_phone_agent = async (sale) => {
  let calculatedAmount = 1.5;
  if (sale.amount > 50) {
    calculatedAmount += 5;
  }
  const commission = new commissionPhoneAgentModel({
    agent_id: sale.p_ag_id,
    amount: calculatedAmount,
    commission_type: "spif",
    date: Date.now(),
  });

  await commission.save();
  await update_monthly_commission_phone(commission);
};

const create_spif_commission_installation_phone_agent = async (id) => {
  const commission = new commissionPhoneAgentModel({
    agent_id: id,
    amount: 10,
    commission_type: "spif",
    date: Date.now(),
  });

  await commission.save();
  await update_monthly_commission_phone(commission);
};

const create_spif_commission_sales_agent = async (sale) => {
  let calculatedAmount = 0;
  const hasTenNames = (sale.ref_count >= 10);
  const saleAmount = sale.amount;
  if (saleAmount >= 295) {
    calculatedAmount = hasTenNames ? 25 : 20;
  } else if (saleAmount >= 200) {
    calculatedAmount = hasTenNames ? 20 : 15;
  } else if (saleAmount >= 100) {
    calculatedAmount = hasTenNames ? 15 : 10;
  } else if (saleAmount >= 50) {
    calculatedAmount = hasTenNames ? 10 : 5;
  }

  const commission = new commissionSalesAgentModel({
    agent_id: sale.s_ag_id,
    commission_type: "spif",
    amount: calculatedAmount,
    date: Date.now(),
  });

  await commission.save();
  await update_monthly_commission(commission);
};

const create_tiered_commission_sales_agent = async (sale) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const calculatedAmount = 0.5 * refCount;
    const commission = new commissionSalesAgentModel({
      agent_id: sale.s_ag_id,
      commission_type: "tiered",
      amount: calculatedAmount,
      date: new Date(sale.date),
    });
    await commission.save();
    await update_monthly_commission(commission);
    session.commitTransaction();
    session.endSession();
  } catch (error) {
    session.abortTransaction();
    session.endSession();
  }
};

const create_all_monthly_commissions = async (agents) => {
  const commissions = [];

  for (const agent of agents) {
    if (agent.sales_agent_id !== undefined) {
      const monthly_commission = new MonthlyCommission({
        agent_id: agent.sales_agent_id,
        amount: 0,
        start_date: Date(),
      });

      commissions.push(monthly_commission);
    } else {
      const monthly_commission = new MonthlyCommission({
        agent_id: agent.phone_agent_id,
        amount: 0,
        start_date: Date(),
      });

      commissions.push(monthly_commission);
    }
  }

  await MonthlyCommission.insertMany(commissions);
};

const create_monthly_commission = async (agentId) => {
  const currentDate = new Date();
  const monthly_commission = new MonthlyCommission({
    agent_id: agentId,
    amount: 0,
    start_date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
  });
  return await monthly_commission.save();
};

const findAmountBasedOnSales = (salesThisMonth)=>{
  if (salesThisMonth > 7) {
    return parseFloat(salesThisMonth * 160);
  } else if (salesThisMonth > 5) {
    return parseFloat(salesThisMonth * 150);
  } else {
    return parseFloat(salesThisMonth * 140);
  }
}

const update_monthly_commission = async (commission) => {
  const monthly_commission = await MonthlyCommission.findOne({
    agent_id: commission.agent_id,
  });
  const currentDate = new Date();
  const salesThisMonth = await Sale.countDocuments({
    s_ag_id: commission.agent_id,
    date: {
      $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      $lt: new Date(currentDate.getFullYear(), currentDate.getMonth(),  30)
    },
    approved: true
  });
  let newAmount = parseFloat(commission.amount) + findAmountBasedOnSales(salesThisMonth);
  monthly_commission.amount = parseFloat(monthly_commission.amount) + parseFloat(newAmount) - findAmountBasedOnSales(salesThisMonth - 1);
  await monthly_commission.save();
};

const update_monthly_commission_phone = async (commission)=>{
  const monthly_commission = await MonthlyCommission.findOne({
    agent_id: commission.agent_id,
  });
  let newAmount = commission.amount;
  monthly_commission.amount = parseFloat(monthly_commission.amount) + parseFloat(newAmount);
  await monthly_commission.save();
}

const retrieve_monthly_commission = async (month, year)=>{
  try{
    const start_date = new Date(year, month, 1);
    const monthlyCommissions = await MonthlyCommission.find({ start_date: { $gte: start_date } }).populate('agent_id');
    return { result: true, commissions: monthlyCommissions }
  } catch(error) {
    return { result: false, message: error.message }
  }
}

const retrieve_commissions_of_sales_agent = async (agentId, month, year)=>{
  try{
    const monthlyCommissions = await commissionSalesAgentModel.find({ agent_id: agentId, date: { $gte: new Date(year, month, 1), $lt: new Date(year, month, 30) }});
    return { result: true, commissions: monthlyCommissions }
  } catch(error) {
    return { result: false, message: error.message }
  }
}

const retrieve_commissions_of_phone_agent = async (agentId, month, year)=>{
  try{
    const monthlyCommissions = await commissionPhoneAgentModel.find({ agent_id: agentId, date: { $gte: new Date(year, month, 1), $lt: new Date(year, month, 30) }});
    return { result: true, commissions: monthlyCommissions }
  } catch(error) {
    return { result: false, message: error.message }
  }
}

const release_commission = async (commissionId)=>{
  try{
    const commission = await MonthlyCommission.findById(commissionId);
    await commission.releaseCommission();
    return { result: true, message: "Commission released" }
  } catch(error){
    return { result: false, message: error.message }
  }
}

module.exports = {
  create_spif_commission_phone_agent,
  create_tiered_commission_sales_agent,
  create_spif_commission_sales_agent,
  create_monthly_commission,
  retrieve_commissions_of_sales_agent,
  retrieve_monthly_commission,
  retrieve_commissions_of_phone_agent,
  release_commission
};
