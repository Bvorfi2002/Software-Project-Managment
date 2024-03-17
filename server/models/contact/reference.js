const mongoose = require('mongoose');

const referenceSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    callInfo: {type: mongoose.Schema.Types.ObjectId, ref: 'Call'},
    address: { type: String, required: true },
    city: { type: String, required: true },
    profession: { type: String, required: true },
    comments: String,
    qualified: { type: Boolean, default: false },
    referralName: { type: String, required: true },
    commission: { type: Number, default: 0.5 },
    isBuyer: {type: Boolean, default: false},
    contracts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Contract'}],
    freeTime: {
        start: {
            type: Date,
            required: true
        },
        end: {
            type: Date,
            required: true
        }
    }
});

const Reference = mongoose.model('Reference', referenceSchema);

module.exports = Reference;