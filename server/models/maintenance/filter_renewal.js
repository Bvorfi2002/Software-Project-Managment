const mongoose = require('mongoose');

const filterRenewalSchema = new mongoose.Schema({
    client_id: {type: String},
    renewal_date: Date,
});

const filterRenewalModel = mongoose.model("FilterRenewal", filterRenewalSchema);

module.exports = filterRenewalModel;