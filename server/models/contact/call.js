const mongoose = require('mongoose');

const callSchema = new mongoose.Schema({
    //If date is not null, the call is added to "Reserved Calls"
    scheduledDate: {type: Date, required: false},
    phoneNumber: {type: String, required: true},
    //If true the reference will be put into "Latest References" list 
    contacted: { type: Boolean, default: false },
    callOutcome: {
        type: String,
        enum: ['No Answer', 'Another Outcome', 'Excessive Argument', 'Successful Call', 'Not Updated'],
        default: 'Not Updated'
    },
    //Is the number in the "Red List"? If false the number is in "Reserved Calls"
    isRed: {type: Boolean, default: false}
});

const Call = mongoose.model('Call', callSchema);

module.exports = Call;