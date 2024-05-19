const mongoose = require('mongoose');
const Buyer = require('./buyer')

const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    profession: { type: String, required: true },
    comments: String,
    phone: { type: String, required: true },
    scheduled: { type: Boolean, default: true },
    p_agent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'PhoneAgent' },
    s_agent_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesAgent' }
})

clientSchema.methods.toRefusal = async function(){
    const new_refusal = new Refusal({
        name: this.name,
        surname: this.surname,
        address: this.address,
        city: this.city,
        profession: this.profession,
        phone: this.phone,
        comments: this.comments,
        p_agent_id: this.p_agent_id,
        s_agent_id: this.s_agent_id
    });
    await new_refusal.save();
}

clientSchema.methods.toBuyer = async function(sale_id, debt_id){
    const new_buyer = new Buyer({
        name: this.name,
        surname: this.surname,
        address: this.address,
        city: this.city,
        profession: this.profession,
        phone: this.phone,
        comments: this.comments,
        p_agent_id: this.p_agent_id,
        s_agent_id: this.s_agent_id,
        sale: sale_id,
        debt: debt_id
    });
    await new_buyer.save();
}

const client = mongoose.model('Client', clientSchema);

module.exports = client;