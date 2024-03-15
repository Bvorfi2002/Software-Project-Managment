const mongoose = require('mongoose');
const user = require('./user.js');

const adminSchema = new mongoose.Schema({
    admin_id: String
})

const admin = user.discriminator('admin', adminSchema);

module.exports = admin;