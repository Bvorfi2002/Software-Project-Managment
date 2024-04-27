const Sale = require('../models/financial/sale');

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

// Create new sale
const create_new_sale = async (new_sale)=>{
    const newSale = new Sale(...new_sale);
    try {
        const savedSale = await newSale.save();
        return { result: true, message: "added successfully" }
    } catch (err) {
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
