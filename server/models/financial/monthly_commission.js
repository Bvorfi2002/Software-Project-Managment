const mongoose = require('mongoose');
const transaction = require('./transaction.js');

const generate_transaction = async (monthly_commission_amount)=>{
    const new_transaction = new transaction({
        transaction_type: "commission_release",
        incoming: false,
        date: new Date(),
        comments: "This transaction was generated as a result of the release of a commission!",
        amount: monthly_commission_amount,
    })
    new_transaction.save();
}

const monthly_commission_schema = new mongoose.Schema({
    agent_id: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    approved: {type: Boolean, required: true, default: false},
    amount: {type: mongoose.Schema.Types.Decimal128, required: true},
    start_date: {type: Date, required: true},
    released: {type: Boolean, required: true, default: false}
})

monthly_commission_schema.methods.releaseCommission = async function(){
    await generate_transaction(this.amount);
    const first_day = new Date(this.start_date);
    const last_day = new Date();
    if (last_day.getMonth() - first_day.getMonth() === 1){
        const model = this.constructor;
        const new_commission = new model({
            agent_id: this.agent_id,
            approved: false,
            amount: 0,
            start_date: new Date()
        });
        await new_commission.save();
        await this.deleteOne();
    } else {
        this.amount = 0;
        await this.save();
    }
}

const monthly_commission_model = mongoose.model('MonthlyCommission', monthly_commission_schema);

module.exports = monthly_commission_model;