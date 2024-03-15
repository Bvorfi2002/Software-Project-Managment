const mongoose = require('mongoose');
const user = require('./user.js');
const options = { discriminatorKey: 'kind' };

const inv_managerSchema = new mongoose.Schema({
    inv_manager_id: String
}, options)

const inv_manager = user.discriminator('inv_manager', inv_managerSchema);

module.exports = inv_manager;