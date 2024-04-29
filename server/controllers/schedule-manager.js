const SalesAgent = require('../models/users/sales_agent.js');

const check_if_in_range = (dateToCheck) => {
    // const startDate = new Date();
    const startDate = new Date("2024-04-09");
    var endDate = new Date();
    endDate.setDate(startDate.getDate() + 2);
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
            if (day.date.getTime() === date.getTime())
                day[slot] = new_state;
            return day;
        })
        sales_agent.schedule = new_schedule;
        await sales_agent.save();
    } catch (err) {
        console.log(err);
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

// const generate_default_day = async ()=>{

// }

// const store_to_previous_days = async ()=>{

// }

module.exports = {
    change_state,
    change_state_by_marketing_manager,
    move_forward,
    get_schedule,
    // generate_default_day,
    // store_to_previous_days
}