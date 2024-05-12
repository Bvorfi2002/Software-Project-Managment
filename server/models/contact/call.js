const mongoose = require('mongoose');

const finishedCallSchema = new mongoose.Schema({
    date: {type: Date, default: ()=>new Date()},
    outcome: {
        type: String,
        enum: ['no answer', 'another outcome', 'excessive argument', 'successful', 'rescheduled'],
        default: 'no answer'
    },
    reference_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Reference'},
    p_ag_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

const redListCallSchema = new mongoose.Schema({
    date: {type: Date, default: ()=>new Date()},
    reference_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Reference'},
    p_ag_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

const reservedCallSchema = new mongoose.Schema({
    reserved_date: {type: Date, required: true},
    reserved_time: {type: Number, required: false},
    reference_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Reference', unique: true},
    p_ag_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
})

reservedCallSchema.methods.toFinished = async function (outcome){
    const finished_call = FinishedCall({
        outcome: outcome,
        reference_id: this.reference_id,
        p_ag_id: this.p_ag_id
    })
    await finished_call.save();
    await this.deleteOne();
}

reservedCallSchema.methods.toRedList = async function(){
    const red_list_call = new RedListCall({
        reference_id: this.reference_id,
        p_ag_id: this.p_ag_id
    })
    await red_list_call.save();
}

redListCallSchema.methods.toReserved = async function (chosen_date){
    const reserved_date = chosen_date ? new Date(chosen_date) : new Date();
    const reserved_call = new ReservedCall({
        reserved_date: reserved_date,
        reference_id: this.reference_id,
        p_ag_id: this.p_ag_id
    })
    await reserved_call.save();
    await this.deleteOne();
}

const ReservedCall = mongoose.model("ReservedCall", reservedCallSchema);
const RedListCall = mongoose.model("RedListCall", redListCallSchema);
const FinishedCall = mongoose.model("FinishedCall", finishedCallSchema);

module.exports = {
    FinishedCall,
    ReservedCall,
    RedListCall
};