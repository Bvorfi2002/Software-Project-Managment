const Client = require('../models/contact/client.js');
const Refusal = require('../models/contact/refusal.js');
const Buyer = require('../models/contact/buyer.js');
const Reference = require('../models/contact/reference.js');

const create_client = async (ref_id, availability, sales_agent_id, phone_agent_id) => {
    try {
        const reference = await Reference.findById(ref_id).exec();
        if (!reference) {
            throw new Error(`Reference not found with ID ${ref_id}`);
        }
        return await reference.toClient(availability, sales_agent_id, phone_agent_id);
    } catch (error) {
        console.error('Error creating client:', error.message);
        throw error;
    }
};

const delete_client = async (client_id) => {
    try {
        const result = await Client.deleteOne({ _id: client_id });
        if (result.deletedCount === 0) {
            throw new Error(`Client not found with ID ${client_id}`);
        }
        return result;
    } catch (error) {
        console.error('Error deleting client:', error.message);
        throw error;
    }
};

const client_to_buyer = async (client_id) => {
    try {
        const client = await Client.findById(client_id).exec();
        if (!client) {
            throw new Error(`Client not found with ID ${client_id}`);
        }
        return await client.toBuyer();
    } catch (error) {
        console.error('Error converting client to buyer:', error.message);
        throw error;
    }
};

const client_to_refusal = async (client_id) => {
    try {
        const client = await Client.findById(client_id).exec();
        if (!client) {
            throw new Error(`Client not found with ID ${client_id}`);
        }
        return await client.toRefusal();
    } catch (error) {
        console.error('Error converting client to refusal:', error.message);
        throw error;
    }
};

const get_phone_agents_clients = async (agent_id) => {
    try {
        const clients = await Client.find({ p_agent_id: agent_id });
        return clients;
    } catch (error) {
        console.error('Error fetching phone agent clients:', error.message);
        throw error;
    }
};

const get_all_client = async () => {
    try {
        const clients = await Client.find({});
        return clients;
    } catch (error) {
        console.error('Error fetching all clients:', error.message);
        throw error;
    }
};

const get_all_buyers = async () => {
    try {
        const buyers = await Buyer.find({}).populate('sale').populate('debt');
        return buyers;
    } catch (error) {
        console.error('Error fetching all buyers:', error.message);
        throw error;
    }
};

const get_buyers_by_phone_agent = async (agent_id) => {
    try {
        const buyers = await Buyer.find({ p_agent_id: agent_id });
        return buyers;
    } catch (error) {
        console.error(`Error fetching buyers for phone agent ${agent_id}:`, error.message);
        throw error;
    }
};

const get_buyers_by_sales_agent = async (agent_id) => {
    try {
        const buyers = await Buyer.find({ s_agent_id: agent_id });
        return buyers;
    } catch (error) {
        console.error(`Error fetching buyers for sales agent ${agent_id}:`, error.message);
        throw error;
    }
};

const get_all_refusals = async () => {
    try {
        const refusals = await Refusal.find({});
        return refusals;
    } catch (error) {
        console.error('Error fetching all refusals:', error.message);
        throw error;
    }
};

const get_refusals_by_phone_agent = async (agent_id) => {
    try {
        const refusals = await Refusal.find({ p_agent_id: agent_id });
        return refusals;
    } catch (error) {
        console.error(`Error fetching refusals for phone agent ${agent_id}:`, error.message);
        throw error;
    }
};

const get_refusals_by_sales_agent = async (agent_id) => {
    try {
        const refusals = await Refusal.find({ s_agent_id: agent_id });
        return refusals;
    } catch (error) {
        console.error(`Error fetching refusals for sales agent ${agent_id}:`, error.message);
        throw error;
    }
};

module.exports = {
    create_client,
    get_phone_agents_clients,
    get_all_buyers,
    get_all_client,
    get_all_refusals,
    get_buyers_by_phone_agent,
    get_buyers_by_sales_agent,
    get_refusals_by_phone_agent,
    get_refusals_by_sales_agent,
    // refusal_to_reference,
    client_to_refusal,
    client_to_buyer,
    delete_client
}

