const mongoose = require('mongoose');

const commissionSchemaSalesAgent = new mongoose.Schema({
    agent_id: {type: mongoose.Schema.Types.ObjectId, ref: "SalesAgent"},
    commission_type: {
        type: String,
        enum: ['spif', 'tiered']
    },
    amount: {type: mongoose.Schema.Types.Decimal128, required: true},
    date: {type: Date, required: true}
});

const commissionSchemaPhoneAgent = new mongoose.Schema({
    agent_id: {type: mongoose.Schema.Types.ObjectId, ref: "PhoneAgent"},
    commission_type: {
        type: String,
        enum: ['spif', 'tiered']
    },
    amount: {type: mongoose.Schema.Types.Decimal128, required: true},
    date: {type: Date, required: true}
})

const commissionSalesAgentModel = mongoose.model('SalesAgentComission', commissionSchemaSalesAgent);
const commissionPhoneAgentModel = mongoose.model("PhoneAgentCommission", commissionSchemaPhoneAgent);

module.exports = {
    commissionSalesAgentModel,
    commissionPhoneAgentModel
};