const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
    isActive: {type: Boolean, required: true},
    generationDate: {type: Date, required: true},
    warrantyEndDate: {type: Date, required: true},
    paymentMethod: {
        type: String,
        enum: ["Full", "Monthly"],
        required: true
    },
    discount: {type: Number, required: true},
});

const Contract = mongoose.model('Contract', contractSchema);

module.exports = Contract;