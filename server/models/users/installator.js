const mongoose = require('mongoose');
const user = require('./user.js');
const options = { discriminatorKey: 'kind' };

const installatorSchema = new mongoose.Schema({
    installator_id: String
},options)

const installator = user.discriminator('installator', installatorSchema);

module.exports = installator;