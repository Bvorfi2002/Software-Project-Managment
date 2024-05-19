const Sale = require("../models/financial/sale");
const Client = require("../models/contact/client.js");
const Reference = require("../models/contact/reference.js");
const debtManager = require("./debt-manager.js");
const commissionManager = require('./commision-manager.js');
const mongoose = require('mongoose')

// Get all sales
const get_all_sales = async () => {
  try {
    const sales = await Sale.find({}).populate("client_id").populate("s_ag_id");
    return { result: true, sales: sales };
  } catch (error) {
    console.log(error);
    return { result: false, message: error.message };
  }
};

const get_client_from_ref = async (ref_id) => {
  const reference = await Reference.findById(ref_id);
  const client = await Client.findOne({ phone: reference.phone });
  return client;
};

// Create new sale
const create_new_sale = async (new_sale, remain_amount, nr_of_months) => {
  const client = await get_client_from_ref(new_sale.client_id);
  const newSale = new Sale({ ...new_sale, client_id: client._id });
  try {
    const savedSale = await newSale.save();
    let debt_id;
    if (remain_amount > 0) {
      const payment = remain_amount / nr_of_months;
      const debt = await debtManager.generate_debt(
        remain_amount,
        payment,
        newSale.client_id,
        newSale.s_ag_id,
        newSale.p_ag_id,
        nr_of_months
      );
      const savedDebt = await debt.save();
      debt_id = savedDebt._id;
    }
    await client.toBuyer(savedSale._id, debt_id);
    return { result: true, message: "added successfully" };
  } catch (err) {
    console.log(err);
    return { result: false, message: err.message };
  }
};

const confirm_sale = async (sale_id) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const sale = await Sale.findById(sale_id).exec();
    sale.set('approved', true);
    await sale.save();
    await commissionManager.create_spif_commission_phone_agent(sale);
    await commissionManager.create_spif_commission_sales_agent(sale);
    session.commitTransaction();
    session.endSession();
    return { result: true, message: "Approved successfully" };
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    console.log(error)
    return { result: false, message: error.message }
  }
};

async function getSale(sales_id) {
  try {
    const sale = await Sale.findById(sales_id).exec();
    if (sale == null) {
      throw Error("Could not find the sale");
    }
    return sale;
  } catch (err) {
    return { result: false, message: err.message };
  }
}

const getSalesCountByMonth = async (agentId, month, year)=>{
  try{
    const nrOfSales = await Sale.countDocuments({ s_ag_id: agentId, date: { $gte: new Date(year,month,1), $lt: new Date(year, month, 30) }, approved: true});
    return { result: true, count: nrOfSales };
  } catch(error) {
    return { result: false }
  }
}

module.exports = {
  create_new_sale,
  getSale,
  get_all_sales,
  confirm_sale,
  getSalesCountByMonth
};
