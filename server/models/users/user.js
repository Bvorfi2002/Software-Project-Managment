const mongoose = require('mongoose');
const options = { discriminatorKey: 'kind' };

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true}, 
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    phone: {type: String, required: true},
    multifactor: {type: Boolean, default: true}
}, options)

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;