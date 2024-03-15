const mongoose = require('mongoose');
const options = { discriminatorKey: 'kind' };

const userSchema = new mongoose.Schema({
    name: String,
    surname: String, 
    email: String,
    username: String,
    password: String,
    phone: String,
    multifactor: Boolean
}, options)

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;