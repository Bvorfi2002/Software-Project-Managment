const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    profession: { type: String, required: true },
    phone: { type: String, required: true },
    comments: String,
    warranty: { type: Boolean, default: true },
    buying_date: { type: Date, default: ()=>new Date()},
    p_agent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PhoneAgent' },
    s_agent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesAgent' },
    sale: { type: mongoose.Schema.Types.ObjectId, ref: 'Sale' },
    debt: { type: mongoose.Schema.Types.ObjectId, ref: 'Debt' }
})

const buyer = mongoose.model('Buyer', buyerSchema);

module.exports = buyer;