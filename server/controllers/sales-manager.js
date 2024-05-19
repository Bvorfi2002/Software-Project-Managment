const Sale = require('../models/financial/sale');
const Client = require('../models/contact/client.js');
const Reference = require('../models/contact/reference.js');
const debtManager = require('./debt-manager.js');

// Get all sales
const get_all_sales = async ()=>{
    try{
        const sales = await Sale.find({});
        if(sales.length !== 0){
            throw Error("Couldn't retrieve the data");
        }
        return sales;
    } catch(error) {
        return { result: true, message: error.message };
    }
}

const get_client_from_ref = async (ref_id)=>{
    const reference = await Reference.findById(ref_id);
    const client = await Client.findOne({phone: reference.phone})
    return client;
}

// Create new sale
const create_new_sale = async (new_sale, remain_amount, nr_of_months)=>{
    const client = await get_client_from_ref(new_sale.client_id);
    const newSale = new Sale({...new_sale, client_id: client._id});
    try {
        const savedSale = await newSale.save();
        let debt_id;
        if(remain_amount > 0){
            const payment = remain_amount / nr_of_months;
            const debt = await debtManager.generate_debt(remain_amount, payment, newSale.client_id, newSale.s_ag_id, newSale.p_ag_id, nr_of_months)
            const savedDebt = await debt.save();
            debt_id = savedDebt._id;
        }
        await client.toBuyer(savedSale._id, debt_id);
        return { result: true, message: "added successfully" }
    } catch (err) {
        console.log(err);
        return { result: false, message: err.message}
    }
}

const confirm_sale = async (sale_id)=>{
    const response = { result: true, message: "Approved successfully" }
    Sale.findOneAndUpdate({_id: sale_id}, { approved: true }, (err)=>{
        response['result'] = false;
        response['message'] = err.message;
    })
    //here the code to update commissions
    return response
}

async function getSale(sales_id) {
    try {
        const sale = await Sale.findById(sales_id).exec();
        if (sale == null) {
            throw Error("Could not find the sale")
        }
        return sale;
    } catch (err) {
        return { result: false, message: err.message }
    }
}

module.exports = {
    create_new_sale,
    getSale,
    get_all_sales,
    confirm_sale
};
