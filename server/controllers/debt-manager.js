const Debt = require ('../models/financial/debt.js');

const generate_debt = async (amount, monthly_pay, client_id, s_ag_id, p_ag_id, nr_months)=>{
    const currentDate = new Date();
    const next_date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    const new_debt = new Debt({
        client_id: client_id,
        amount: amount,
        monthly_pay: monthly_pay,
        next_date: next_date,
        sales_agent_id: s_ag_id,
        phone_agent_id: p_ag_id,
        nr_months: nr_months
    }) 
    return await new_debt.save();
}

const generate_daily_debt_collection_tasks = async ()=>{
    const currentDate = new Date();
    const daily_debts = await Debt.find({next_date: currentDate});
    daily_debts.forEach(debt=>{
        debt.generateCollectionTask();
    })
}

const generate_debt_collection_task = async (debt_id, installer_id)=>{
    //to be decided
}

const get_all_debts = async ()=>{
    const debts = await Debt.find({}).populate('client_id').populate('sales_agent_id').populate('phone_agent_id');
    return debts;
}

const get_debt_page = async (start, end)=>{
    const debts = await Debt.find({});
    return debts.slice(start, end);
}

const get_debt_by_time_period = async (start_date, end_date)=>{
    const debts = await Debt.find({
        next_date: { $gte: start_date, $lte: end_date}
    });
    return debts;
}

const delete_debt = async (debt_id)=>{
    const debt = await Debt.findById(debt_id).exec();
    await debt.deleteOne();
}

const mark_debt_collection_task_as_completed = async (collection_task_id)=>{
    //mark as completed code
    //update debt code
}

module.exports = {
    generate_debt,
    generate_daily_debt_collection_tasks,
    generate_debt_collection_task,
    get_all_debts,
    get_debt_page,
    get_debt_by_time_period,
    delete_debt
}