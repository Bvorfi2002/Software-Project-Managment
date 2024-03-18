const mongoose = require('mongoose');

const referenceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    profession: { type: String, required: true },
    comments: String,
    qualified: { type: Boolean, default: false },
    referralName: { type: String, required: true }, //What does this mean denis?
    freeTime: {
        start: {
            type: Date,
            required: false //It is not required by default. The idea is that you put the free time after you call them
        },
        end: {
            type: Date,
            required: false
        }
    },
    called: {type: Boolean, required: true, default: false}
});

const Reference = mongoose.model('Reference', referenceSchema);

module.exports = Reference;