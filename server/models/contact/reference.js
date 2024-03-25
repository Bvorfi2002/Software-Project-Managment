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
    referralName: { type: String, required: true }, //What does this mean denis?
    phone: { type: String, required: true },
    freeTime: {
        start: {
            type: Date,
            required: false //It is not required by default. The idea is that you put the free time after you call them
        },
        end: {
            type: Date,
            required: false
        }
    },
    called: {type: Boolean, required: true, default: false},
    added_by: { type: mongoose.Schema.Types.ObjectId, ref: "SalesAgent"}
});

referenceSchema.methods.toClient = async (availability, sales_agent_id, p_agent_id)=>{
    const new_client = new Client({
        name: this.name,
        surname: this.surname,
        address: this.address,
        city: this.city,
        profession: this.profession,
        comments: this.comments,
        phone: this.phone,
        availability: availability,
        p_agent_id: p_agent_id,
        s_agent_id: sales_agent_id
    });
    await new_client.save();
}

const Reference = mongoose.model('Reference', referenceSchema);

module.exports = Reference;