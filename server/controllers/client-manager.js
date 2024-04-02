const Client = require('../models/contact/client.js');
const Refusal = require('../models/contact/refusal.js');
const Buyer = require('../models/contact/buyer.js');
const Reference = require('../models/contact/reference.js')

const create_client = async (ref_id, availability, sales_agent_id, phone_agent_id)=>{
    const reference = await Reference.findById(ref_id).exec();
    return await reference.toClient(availability, sales_agent_id, phone_agent_id);
}

const delete_client = async (client_id)=>{
    return await Client.deleteOne({_id: client_id});
}

const client_to_buyer = async (client_id)=>{
    const client = await Client.findById(client_id).exec();
    return await client.toBuyer();
}

const client_to_refusal = async (client_id)=>{
    const client = await Client.findById(client_id).exec();
    return await client.toRefusal();
}

const get_phone_agents_clients = async (agent_id)=>{
    const clients = await Client.find({p_agent_id: agent_id});
    return clients;
}

const get_sales_agent_clients = async (agent_id)=>{
    const clients = await Client.find({s_agent_id: agent_id});
    return clients;
}

const get_all_client = async ()=>{
    const clients = await Client.find({});
    return clients;
}

// const refusal_to_reference = async (refusal_id)=>{

// }

const get_all_buyers = async ()=>{
    const buyers = await Buyer.find({});
    return buyers;
}

const get_buyers_by_phone_agent = async (agent_id)=>{
    const buyers = await Buyer.find({p_agent_id: agent_id});
    return buyers;
}

const get_buyers_by_salse_agent = async (agent_id)=>{
    const buyers = await Buyer.find({s_agent_id: agent_id});
    return buyers;
}

const get_all_refusals = async ()=>{
    const refusals = await Refusal.find({});
    return refusals;
}

const get_refusals_by_phone_agent = async (agent_id)=>{
    const refusals = await Refusal.find({p_agent_id: agent_id});
    return refusals;
}

const get_refusals_by_sales_agent = async (agent_id)=>{
    const refusals = await Refusal.find({s_agent_id: agent_id});
    return refusals;
}

module.exports = {
    create_client,
    get_phone_agents_clients,
    get_sales_agent_clients,
    get_all_buyers,
    get_all_client,
    get_all_refusals,
    get_buyers_by_phone_agent,
    get_buyers_by_salse_agent,
    get_refusals_by_phone_agent,
    get_refusals_by_sales_agent,
    // refusal_to_reference,
    client_to_refusal,
    client_to_buyer,
    delete_client
}

