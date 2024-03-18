const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    agent: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesAgent' },
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
