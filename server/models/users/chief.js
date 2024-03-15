const mongoose = require('mongoose');
const user = require('./user.js');
const options = { discriminatorKey: 'kind' };

const chiefSchema = new mongoose.Schema({
    chief_id: String
}, options)

const chief = user.discriminator('chief', chiefSchema);

module.exports = chief;