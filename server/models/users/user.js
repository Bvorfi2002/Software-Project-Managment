const mongoose = require('mongoose');
const options = { discriminatorKey: 'kind' };
const { verifyEmail, verify_phone_number, passwordHasher } = require('../../utils/security-ground');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true}, 
    email: {type: String, required: true, validate: { validator: verifyEmail, message: "Invalid email entered!" }},
    username: {type: String, required: true},
    password: {type: String, required: true, set: function(password){
        return passwordHasher(password)
    }},
    phone: {type: String, required: true, validate: { validator: verify_phone_number, message: "Wrong phone number format!" }},
    multifactor: {type: Boolean, default: true}
}, options)

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;