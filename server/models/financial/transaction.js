const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    transaction_type: String,
    incoming: Boolean,
    date: Date,
    comments: String,
    amount: Schema.Types.Decimal128
});

const transactionModel = mongoose.model("Transaction", transactionSchema);

module.exports = transactionModel;