const { FinishedCall, ReservedCall, RedListCall } = require('../models/contact/call.js');
const Reference = require('../models/contact/reference.js');
const Client = require('../models/contact/client.js')
const mongoose = require('mongoose');
const Meeting = require('../models/contact/meeting.js');
const meetingManager = require('../controllers/meeting-manager.js');

const create_finished_call = async (call)=>{
    try {
        const finishedCall = new FinishedCall({
            ...call
        });
        const savedCall = await finishedCall.save();
        if(outcome === 'excessive argument')
            await create_red_list_call({ date: call.date, reference_id: call.reference_id, p_ag_id: call.p_ag_id });
        await Reference.findByIdAndUpdate(call.reference_id, {called: true});
        return { result: true, message: "created successfully" };
    } catch (error) {
        return {result: false, message: error.message }
    }
}

const create_finished_call_by_reserved_call = async (reserved_call_id, outcome)=>{
    try {
        const reservedCall = await ReservedCall.findById(reserved_call_id);
        if (!reservedCall) {
            throw new Error('Reserved call not found');
        }
        if(outcome === 'excessive argument')
            await create_red_list_call_by_reserved(reserved_call_id);
        const finishedCall = await reservedCall.toFinished(outcome);
        await Reference.findByIdAndUpdate(reservedCall.reference_id, {called: true});
        return { result: true, message: "created successfully" };
    } catch (error) {
        console.log(error);
        return { result: false, message: error.message }
    }
}

const reserved_call_to_meeting = async (reserved_call_id, p_ag_id, s_ag_id, date, time)=>{
    const session = await mongoose.startSession();
    try{
        session.startTransaction();
        const reservedCall = await ReservedCall.findById(reserved_call_id);
        if (!reservedCall) {
            throw new Error('Reserved call not found');
        }
        const finishedCall = await reservedCall.toFinished("successful");
        const reference = await Reference.findByIdAndUpdate(reservedCall.reference_id, {called: true});
        await meetingManager.add_meeting(reference._id, date, time, s_ag_id, p_ag_id);
        session.endSession();
        return { result: true, message: "created successfully" };
    } catch(err){
        console.log(err);
        await session.abortTransaction();
        return { result: false, message: err.message }
    }
}

const reschedule_reserved_call = async (call_id, newDate)=>{
    try {
        const reservedCall = await ReservedCall.findById(call_id);
        const newReservedCall = new ReservedCall({reference_id: reservedCall.reference_id, p_ag_id: reservedCall.p_ag_id, reserved_date: newDate});
        await newReservedCall.save();
        reservedCall.toFinished("rescheduled");
        return { result: true, message: "rescheduling complete" }
    } catch(error) {
        return {result: false, message: "An unexpected error occurred"};
    }
}

const create_red_list_call = async (call)=>{
    const red_list_call = new RedListCall({
        ...call
    });
    return await red_list_call.save();
}

const create_red_list_call_by_reserved = async (reserved_call_id)=>{
    const reserved_call = await ReservedCall.findById(reserved_call_id);
    return await reserved_call.toRedList();
}   

const create_reserved_call = async (call)=>{
    try {
        const mayExist = await ReservedCall.findOne({reference_id: call.reference_id});
        if(mayExist){
            throw new Error("This reference is already contacted!")
        }
        const reservedCall = new ReservedCall({
            ...call
        });
        const savedCall = await reservedCall.save();
        return { result: true, message: "Created successfully!" };
    } catch (error) {
        console.log(error)
        return { result: false, message: error.message }
    }
}

const create_many_reserved_calls = async (references, call_details)=>{
    try {
        let calls = []
        for(let i=0; i<references.length; i++){
            calls.push({ ...call_details, reference_id: references[i] });
        }
        const results = await ReservedCall.insertMany(calls);
        await RedListCall.deleteMany({ reference_id: { $in: references } });
        return { result: true, message: "Calls scheduled" };
    } catch(error) {
        return { result: false, message: error.message };
    }
}

const create_many_reserved_calls_from_redlist = async (redlistcalls, chosenDate)=>{
    try {
        const calls = await RedListCall.find({ _id: { $in: redlistcalls } });
        for(let i=0; i<calls.length; i++)
            await calls[i].toReserved(chosenDate);
        return { result: true, message: "Reserved successfully" };
    } catch(error) {
        console.log(error);
        return { result: false, message: "Could not reserve the calls!" };
    }
}

const create_reserved_call_by_red_list = async (red_list_call_id)=>{
    const red_list_call = await RedListCall.findById(red_list_call_id);
    return await red_list_call.toReserved();
}

const get_reserved_calls = async (page_indexes)=>{
    const reserved = await ReservedCall.find({});
    if(!reserved.length)
        return reserved;
    const reserved_calls = await Promise.all(reserved.map(async (call) => {
        const reference = await Reference.findById(call.reference_id);
        return { _id: call._id, ref_id: reference._id, p_ag_id: call.p_ag_id, comments: reference.comments, profession: reference.profession, name: reference.name, surname: reference.surname, phone: reference.phone, address: reference.address, city: reference.city, date: call.reserved_date };
    }));
    return page_indexes.length ? reserved_calls.slice(page_indexes[0], page_indexes[1]) : reserved_calls;
}

const get_reserved_calls_by_interval = async (start_date, end_date, page_indexes)=>{
    const reserved_calls = await ReservedCall.find({
        reserved_date: { $gte: start_date, $lte: end_date }
    })
    return page_indexes.length ? reserved_calls.slice(page_indexes[0], page_indexes[1]) : reserved_calls;
}

const get_reserved_calls_by_agent = async (agent_id, page_indexes)=>{
    const reserved = await ReservedCall.find({p_ag_id: agent_id});
    if(!reserved.length)
        return reserved;
    const reserved_calls = await Promise.all(reserved.map(async (call) => {
        const reference = await Reference.findById(call.reference_id);
        return { _id: call._id, ref_id: reference._id, p_ag_id: call.p_ag_id, comments: reference.comments, profession: reference.profession, name: reference.name, surname: reference.surname, phone: reference.phone, address: reference.address, city: reference.city, date: call.reserved_date };
    }));
    return page_indexes.length ? reserved_calls.slice(page_indexes[0], page_indexes[1]) : reserved_calls;
}

const get_reserved_calls_by_agent_by_interval = async (agent_id, start_date, end_date, page_indexes)=>{
    const reserved_calls = await ReservedCall.find({
        p_ag_id: agent_id,
        reserved_date: { $gte: start_date, $lte: end_date }
    })
    return page_indexes.length ? reserved_calls.slice(page_indexes[0], page_indexes[1]) : reserved_calls;
}

const get_finished_calls = async (page_indexes)=>{
    const finished = await FinishedCall.find({}).populate('p_ag_id');
    if(!finished.length)
        return finished;
    const finished_calls = await Promise.all(finished.map(async (call) => {
        const reference = await Reference.findById(call.reference_id);
        return { _id: call._id, ref_id: reference._id, phone_agent: call.p_ag_id.name + call.p_ag_id.surname, comments: reference.comments, profession: reference.profession, name: reference.name, surname: reference.surname, phone: reference.phone, address: reference.address, city: reference.city, date: call.date, outcome: call.outcome };
    }));
    return page_indexes.length ? finished_calls.slice(page_indexes[0], page_indexes[1]) : finished_calls;
}

const get_finished_calls_by_interval = async (start_date, end_date, page_indexes)=>{
    const finished_calls = await FinishedCall.find({
        date: { $gte: start_date, $lte: end_date }
    });
    return page_indexes.length ? finished_calls.slice(page_indexes[0], page_indexes[1]) : finished_calls;
}

const get_finished_calls_by_agent = async (agent_id, page_indexes)=>{
    const finished = await FinishedCall.find({p_ag_id: agent_id});
    if(!finished.length)
        return finished;
    const finished_calls = await Promise.all(finished.map(async (call) => {
        const reference = await Reference.findById(call.reference_id); 
        return { _id: call._id, ref_id: reference._id, p_ag_id: call.p_ag_id, comments: reference.comments, profession: reference.profession, name: reference.name, surname: reference.surname, phone: reference.phone, address: reference.address, city: reference.city, date: call.date, outcome: call.outcome };
    }));
    return page_indexes.length ? finished_calls.slice(page_indexes[0], page_indexes[1]) : finished_calls;
}

const get_finished_calls_by_agent_by_interval = async (agent_id, start_date, end_date, page_indexes)=>{
    const finished_calls = await FinishedCall.find({
        p_ag_id: agent_id,
        date: { $gte: start_date, $lte: end_date }
    });
    return page_indexes.length ? finished_calls.slice(page_indexes[0], page_indexes[1]) : finished_calls;
}

const get_red_list_calls = async (page_indexes)=>{
    const red_list_calls = await RedListCall.find({}).populate('reference_id').populate('p_ag_id').exec();
    return page_indexes.length ? red_list_calls.slice(page_indexes[0], page_indexes[1]) : red_list_calls;
}

const get_red_list_calls_by_interval = async (start_date, end_date, page_indexes)=>{
    const red_list_calls = await RedListCall.find({
        date: { $gte: start_date, $lte: end_date }
    });
    return page_indexes.length ? red_list_calls.slice(page_indexes[0], page_indexes[1]) : red_list_calls;
}

const get_red_list_calls_by_agent = async (agent_id, page_indexes)=>{
    const red_list_calls = await RedListCall.find({p_ag_id: agent_id});
    return page_indexes.length ? red_list_calls.slice(page_indexes[0], page_indexes[1]) : red_list_calls;
}

const get_red_list_calls_by_agent_by_interval = async (agent_id, start_date, end_date, page_indexes)=>{
    const red_list_calls = await RedListCall.find({
        p_ag_id: agent_id,
        date: { $gte: start_date, $lte: end_date }
    });
    return page_indexes.length ? red_list_calls.slice(page_indexes[0], page_indexes[1]) : red_list_calls;
}

const reference_to_meeting = async (reference_id, s_ag_id, p_ag_id, date, time)=>{
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        await create_finished_call({date: new Date(), outcome: "successful", reference_id: reference_id, p_ag_id: p_ag_id});
        await meetingManager.add_meeting(reference_id, date, time, s_ag_id, p_ag_id);
        const reference = await Reference.findByIdAndUpdate(reference_id, {called: true});
        session.endSession();
        return { result: true, message: "Added successfully!" }
    } catch(err) {
        console.log(err);
        await session.abortTransaction();
        return { result: false, message: err.message }
    }
}

const reference_to_outcome = async (reference_id, p_ag_id, outcome)=>{
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        await create_finished_call({date: new Date(), outcome: outcome, reference_id: reference_id, p_ag_id: p_ag_id});
        const reference = await Reference.findByIdAndUpdate(reference_id, {called: true});
        session.endSession();
        return { result: true, message: "Added successfully!" }
    } catch(err) {
        await session.abortTransaction();
        return { result: false, message: err.message }
    }
}

const reference_to_reschedule = async (reference_id, p_ag_id, newDate)=>{
    try {
        const newReservedCall = new ReservedCall({reference_id: reference_id, p_ag_id: p_ag_id, reserved_date: newDate});
        await newReservedCall.save();
        await Reference.findByIdAndUpdate(reference_id, {called: true});
        return { result: true, message: "rescheduling complete" }
    } catch(error) {
        return {result: false, message: "An unexpected error occurred"};
    }
}

module.exports = {
    create_finished_call,
    create_finished_call_by_reserved_call,
    create_red_list_call,
    create_red_list_call_by_reserved,
    create_reserved_call,
    create_reserved_call_by_red_list,
    get_reserved_calls,
    get_reserved_calls_by_agent,
    get_reserved_calls_by_agent_by_interval,
    get_reserved_calls_by_interval,
    get_finished_calls,
    get_finished_calls_by_agent,
    get_finished_calls_by_agent_by_interval,
    get_finished_calls_by_interval,
    get_red_list_calls,
    get_red_list_calls_by_agent,
    get_red_list_calls_by_agent_by_interval,
    get_red_list_calls_by_interval,
    reserved_call_to_meeting,
    reschedule_reserved_call,
    reference_to_meeting,
    reference_to_outcome,
    reference_to_reschedule,
    create_many_reserved_calls,
    create_many_reserved_calls_from_redlist
}