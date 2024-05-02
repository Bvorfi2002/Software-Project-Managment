const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    time: { type: String, required: true},
    sales_agent: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesAgent' },
    phone_agent: { type: mongoose.Schema.Types.ObjectId, ref: 'PhoneAgent' },
    referral: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Reference',
        required: true
    },
    outcome: {
        type: String,
        enum: ['Successful', 'Agent Cancellation', 'Client Cancellation', 'Unsuccessful', 'Not Updated'],
        default: 'Not Updated'
    },
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
