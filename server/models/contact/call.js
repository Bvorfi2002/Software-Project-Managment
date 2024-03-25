const mongoose = require('mongoose');

const finishedCallSchema = new mongoose.Schema({
    date: {type: Date, default: ()=>new Date()},
    outcome: {
        type: String,
        enum: ['No Answer', 'Another Outcome', 'Excessive Argument', 'Successful Call'],
        default: 'No Answer'
    },
    reference_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Reference'},
    p_ag_id: {type: mongoose.Schema.Types.ObjectId, ref: 'PhoneAgent'}
})

const redListCallSchema = new mongoose.Schema({
    date: {type: Date, default: ()=>new Date()},
    reference_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Reference'},
    p_ag_id: {type: mongoose.Schema.Types.ObjectId, ref: 'PhoneAgent'}
})

const reservedCallSchema = new mongoose.Schema({
    reserved_date: {type: Date, required: true},
    reserved_time: {type: Number, required: false},
    reference_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Reference'},
    p_ag_id: {type: mongoose.Schema.Types.ObjectId, ref: 'PhoneAgent'}
})

reservedCallSchema.methods.toFinished = async (outcome)=>{
    const finished_call = FinishedCall({
        outcome: outcome,
        reference_id: this.reference_id,
        p_ag_id: this.p_ag_id
    })
    await finished_call.save();
}

reservedCallSchema.methods.toRedList = async ()=>{
    const red_list_call = RedListCall({
        reference_id: this.reference_id,
        p_ag_id: this.p_ag_id
    })
    await red_list_call.save();
}

redListCallSchema.methods.toReserved = async (chosen_date)=>{
    const reserved_date = chosen_date ? chosen_date : new Date();
    const reserved_call = ReservedCall({
        resreved_date: reserved_date,
        reference_id: this.reference_id,
        p_ag_id: this.p_ag_id
    })
    await reserved_call.save();
}

const ReservedCall = mongoose.model("ReservedCall", reservedCallSchema);
const RedListCall = mongoose.model("RedListCall", redListCallSchema);
const FinishedCall = mongoose.model("FinishedCall", finishedCallSchema);

module.exports = {
    FinishedCall,
    ReservedCall,
    RedListCall
};