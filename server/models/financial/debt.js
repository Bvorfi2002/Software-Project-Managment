const mongoose = require('mongoose');

const debtSchema = new mongoose.Schema({
    client_id: { type: String },
    amount: mongoose.Schema.Types.Decimal128,
    monthly_pay: mongoose.Schema.Types.Decimal128,
    next_date: Date,
    sales_agent_id: { type: String },
    phone_agent_id: { type: String },
    nr_months: Number
})

debtSchema.methods.generateCollectionTask = ()=>{
    //Implementation to be decided later
}

debtSchema.methods.updateDebt = (amountPaid) => {
    this.amount -= amountPaid;
    this.nr_months -= 1;
    let message = "Monthly payment was successful!"
    if (this.nr_months !== 0) {
        this.monthly_pay = this.amount / this.nr_months
    } else {
        this.deleteOne().then(() => {
            message = "Debt was completely paid!"
        }).catch(() => {
            message = "Something went wrong with erasing this debt!"
        })
    }
    return message
}

const debtModel = mongoose.model('Debt', debtSchema);

module.exports = debtModel;