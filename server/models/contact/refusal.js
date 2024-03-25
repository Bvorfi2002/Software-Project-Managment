const mongoose = require('mongoose');

const refusalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    profession: { type: String, required: true },
    phone: { type: String, required: true },
    comments: String,
    p_agent_id: {type: mongoose.Schema.Types.ObjectId, ref: 'PhoneAgent'},
    s_agent_id: {type: mongoose.Schema.Types.ObjectId, ref: 'SalesAgent'}
})

const refusal = mongoose.model('Refusal', refusalSchema);

module.exports = refusal;