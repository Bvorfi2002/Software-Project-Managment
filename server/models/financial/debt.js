const mongoose = require('mongoose');

const debtSchema = new mongoose.Schema({
    client_id: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
    amount: mongoose.Schema.Types.Decimal128,
    monthly_pay: mongoose.Schema.Types.Decimal128,
    next_date: Date,
    sales_agent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    phone_agent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    nr_months: Number,
    confirmed: { type: Boolean, required: true, default: false }
})

debtSchema.methods.generateCollectionTask = ()=>{
    //Implementation to be decided later
}

debtSchema.methods.updateDebt = (amountPaid) => {
    this.amount -= amountPaid;
    this.nr_months -= 1;
    const next_date = new Date(this.next_date.getFullYear(), currentDate.getMonth() + 1, 1);
    let message = "Monthly payment was successful!"
    if (this.nr_months !== 0) {
        this.monthly_pay = this.amount / this.nr_months
        this.next_date = next_date
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