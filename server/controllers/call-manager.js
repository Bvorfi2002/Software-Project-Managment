const { FinishedCall, ReservedCall, RedListCall } = require('../models/contact/call.js');

const create_finished_call = async (call)=>{
    try {
        const finishedCall = new FinishedCall({
            ...call
        });
        const savedCall = await finishedCall.save();
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
        const finishedCall = await reservedCall.toFinished(outcome);
        return { result: true, message: "created successfully" };
    } catch (error) {
        return { result: true, message: error.message }
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
        const reservedCall = new ReservedCall({
            ...call
        });
        const savedCall = await reservedCall.save();
        return { result: true, message: error.message };
    } catch (error) {
        return { result: false, message: error.message }
    }
}

const create_reserved_call_by_red_list = async (red_list_call_id)=>{
    const red_list_call = await RedListCall.findById(red_list_call_id);
    return await red_list_call.toReserved();
}

const get_reserved_calls = async (page_indexes)=>{
    const reserved_calls = await ReservedCall.find({});
    return page_indexes.length ? reserved_calls.slice(page_indexes[0], page_indexes[1]) : reserved_calls;
}

const get_reserved_calls_by_interval = async (start_date, end_date, page_indexes)=>{
    const reserved_calls = await ReservedCall.find({
        reserved_date: { $gte: start_date, $lte: end_date }
    })
    return page_indexes.length ? reserved_calls.slice(page_indexes[0], page_indexes[1]) : reserved_calls;
}

const get_reserved_calls_by_agent = async (agent_id, page_indexes)=>{
    const reserved_calls = await ReservedCall.find({p_ag_id: agent_id});
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
    const finished_calls = FinishedCall.find({});
    return page_indexes.length ? finished_calls.slice(page_indexes[0], page_indexes[1]) : finished_calls;
}

const get_finished_calls_by_interval = async (start_date, end_date, page_indexes)=>{
    const finished_calls = await FinishedCall.find({
        date: { $gte: start_date, $lte: end_date }
    });
    return page_indexes.length ? finished_calls.slice(page_indexes[0], page_indexes[1]) : finished_calls;
}

const get_finished_calls_by_agent = async (agent_id, page_indexes)=>{
    const finished_calls = FinishedCall.find({p_ag_id: agent_id});
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
    const red_list_calls = await RedListCall.find({});
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
    get_red_list_calls_by_interval
}