const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    s_ag_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'SalesAgent'},
    p_ag_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'PhoneAgent', default: new mongoose.Types.ObjectId()},
    date: {type: Date, required: true},
    amount: {type: mongoose.Schema.Types.Decimal128, required: true},
    sale_type: {type: String, required: true},
    client_id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Client'},
    ref_count: {type: Number, required: true},
    approved: {type: Boolean, required: true},
    contract_path: { type: String }
});

const sale_model = mongoose.model('Sale', saleSchema);

module.exports = sale_model