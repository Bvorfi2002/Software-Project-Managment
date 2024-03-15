const mongoose = require('mongoose');
const user = require('./user.js');
const options = { discriminatorKey: 'kind' };

const marketing_managerSchema = new mongoose.Schema({
    marketing_manager_id: String
}, options)

const marketing_manager = user.discriminator('marketing_manager', marketing_managerSchema);

module.exports = marketing_manager;