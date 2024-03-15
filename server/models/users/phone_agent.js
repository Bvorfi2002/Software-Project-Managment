const mongoose = require('mongoose');
const user = require('./user.js');
const options = { discriminatorKey: 'kind' };

const phone_agentSchema = new mongoose.Schema({
    phone_agent_id: String
}, options)

const phone_agent = user.discriminator('phone_agent', phone_agentSchema);

module.exports = phone_agent;