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
    enum: ['Completed', 'Agent Cancellation', 'Client Cancellation', 'Unsuccessful', 'Not Updated'],
    default: 'Not Updated'
    },
    isBuyerConverted: { type: Boolean, default: false }
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
