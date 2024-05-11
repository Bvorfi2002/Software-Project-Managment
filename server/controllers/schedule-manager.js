const SalesAgent = require('../models/users/sales_agent.js');

const check_if_in_range = (dateToCheck) => {
    // const startDate = new Date();
    const startDate = new Date("2024-04-09");
    var endDate = new Date();
    endDate.setDate(startDate.getDate() + 2);
    endDate.setMonth(startDate.getMonth());
    return (dateToCheck >= startDate && dateToCheck <= endDate);
}

const change_state = async (s_ag_id, date, slot, new_state) => {
    if (check_if_in_range(date)) {
        return { result: false, message: "You are not allowed to change that day!", code: 403 }
    }
    try {
        const sales_agent = await SalesAgent.findOne({ _id: s_ag_id });
        const schedule = sales_agent.schedule;
        const new_schedule = schedule.map(day => {
            if (day.date.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0)){
                if(day[slot] === 'free' || day[slot] === 'scheduled'){
                    day[slot] = new_state;
                }
            }
            return day;
        })
        sales_agent.schedule = new_schedule;
        await sales_agent.save();
    } catch (err) {
        return { result: false, message: "Server crashed", code: 503 }
    }
    return { result: true, message: "Changed successfully!" };
}

const change_state_by_marketing_manager = async (s_ag_id, date, slot, new_state) => {
    const sales_agent = await SalesAgent.find({ _id: s_ag_id });
    const schedule = sales_agent[0].schedule;
    const new_schedule = schedule.map(day => {
        if (day.date === date)
            day[slot] = new_state;
        return day;
    })
    sales_agent.schedule = new_schedule;
    return await sales_agent.save();
    //here there will be the code for logging this in the admin panel
    //but it is still to be decided how the logging will be done
}

const move_forward = async () => {
    const sales_agents = await SalesAgent.find({});
    sales_agents.forEach(sales_agent => sales_agent.moveForward());
}

const get_schedule = async (s_ag_id) => {
    const sales_agent = await SalesAgent.find({ _id: s_ag_id });
    return sales_agent[0].schedule;
}

const find_sales_agents_by_schedule = async (date, time_slot)=>{
    const sales_agents = await SalesAgent.find({});
    const agents_to_return = []
    for(let i=0; i<sales_agents.length; i++) {
        for(let j=0; j<sales_agents[i].schedule.length; j++) {
            if(sales_agents[i].schedule[j].date.setHours(0, 0, 0, 0) === date.setHours(0, 0, 0, 0) && sales_agents[i].schedule[j][time_slot] === 'scheduled')
                agents_to_return.push(sales_agents[i]);
        }
    }
    return agents_to_return;
}

// const generate_default_day = async ()=>{

// }

// const store_to_previous_days = async ()=>{

// }

module.exports = {
    change_state,
    change_state_by_marketing_manager,
    move_forward,
    get_schedule,
    find_sales_agents_by_schedule
    // generate_default_day,
    // store_to_previous_days
}