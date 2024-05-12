const mongoose = require('mongoose');
const Client = require('./client.js');
const Refusal = require('./refusal.js');
const Buyer = require('./buyer.js');

const referenceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    profession: { type: String, required: true },
    comments: String,
    qualified: { type: Boolean, default: false },
    referralName: { type: String, required: false },
    phone: { type: String, required: true, unique: true },
    called: {type: Boolean, required: true, default: false},
    added_by: { type: mongoose.Schema.Types.ObjectId, ref: "SalesAgent"},
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: false }
});

referenceSchema.methods.toClient = async function (sales_agent_id, p_agent_id){
    const new_client = new Client({
        name: this.name,
        surname: this.surname,
        address: this.address,
        city: this.city,
        profession: this.profession,
        comments: this.comments,
        phone: this.phone,
        p_agent_id: p_agent_id,
        s_agent_id: sales_agent_id
    });
    await new_client.save();
}

const Reference = mongoose.model('Reference', referenceSchema);

module.exports = Reference;