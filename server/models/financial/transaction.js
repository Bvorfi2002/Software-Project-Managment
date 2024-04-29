const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    transaction_type: {type: String, required: true, default: "default"}, //this should be an enum but we will decide it with the client to have accurate types
    incoming: {type: Boolean, required: true},
    date: {type: Date, required: true},
    comments: {type: String, required: false},
    amount: {type: mongoose.Schema.Types.Decimal128, required: true}
});

const transactionModel = mongoose.model("Transaction", transactionSchema);

module.exports = transactionModel;