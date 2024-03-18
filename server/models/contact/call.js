const mongoose = require('mongoose');

const finishedCallSchema = new mongoose.Schema({
    date: {type: Date, required: true},
    outcome: {
        type: String,
        enum: ['No Answer', 'Another Outcome', 'Excessive Argument', 'Successful Call'],
        default: 'No Answer'
    },
    reference_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Reference'},
    p_ag_id: {type: mongoose.Schema.Types.ObjectId, ref: 'PhoneAgent'}
})

const redListCallSchema = new mongoose.Schema({
    date: {type: Date, required: true},
    reference_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Reference'},
    p_ag_id: {type: mongoose.Schema.Types.ObjectId, ref: 'PhoneAgent'}
})

const reservedCallSchema = new mongoose.Schema({
    reserved_date: {type: Date, required: true},
    reserved_time: {type: Number, required: false},
    reference_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Reference'},
    p_ag_id: {type: mongoose.Schema.Types.ObjectId, ref: 'PhoneAgent'}
})

const reservedCall = mongoose.model("ReservedCall", reservedCallSchema);
const redListCall = mongoose.model("RedListCall", redListCallSchema);
const finishedCall = mongoose.model("FinishedCall", finishedCallSchema);

module.exports = {
    finishedCall,
    reservedCall,
    redListCall
};