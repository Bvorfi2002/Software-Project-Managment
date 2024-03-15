const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
    s_ag_id: String, //These 2 lines might be subject to changes 
    p_ag_id: String, // I might use ref here for faster search but this is to be decided after performance check
    date: Date,
    amount: Schema.Types.Decimal128,
    sale_type: String,
    client_id: String,
    ref_count: Number,
    approved: Boolean
});

const sale_model = mongoose.model('Sale', saleSchema);

module.exports = sale_model