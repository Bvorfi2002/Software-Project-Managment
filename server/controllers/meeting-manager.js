const Meeting = require('../models/contact/meeting');
const Reference = require('../models/contact/reference');
const ScheduleManager = require("./schedule-manager.js");

const add_meeting = async (reference_id, date, time, sales_agent_id, phone_agent_id) => {
    const operation_results = { result: true, message: "Meeting added successfully!" };
    try {
        const newMeeting = new Meeting({date: date, time: time, referral: reference_id, sales_agent: sales_agent_id, phone_agent: phone_agent_id})
        await newMeeting.save();
        const referenceToUpdate = await Reference.findById(reference_id).exec();
        referenceToUpdate.toClient(sales_agent_id, phone_agent_id);
        await ScheduleManager.change_state(sales_agent_id, date, time, "meeting");
        return operation_results;
    } catch(err) {
        console.log(err);
        operation_results['message'] = err.message;
        operation_results['result'] = false;
        return operation_results;
    }
}

const retrieve_reference_of_meeting = async (ref_id)=>{
    return await Reference.findById(ref_id).exec()
}

const retrieve_sales_agent_meetings = async (sales_agent_id) => {
    try {
        const meetings = await Meeting.find({ sales_agent: sales_agent_id });
        const meetingsWithReferences = await Promise.all(meetings.map(async (meeting) => {
            const reference = await retrieve_reference_of_meeting(meeting.referral);
            return { name: reference.name, surname: reference.surname, phone: reference.phone, address: reference.address, city: reference.city, date: meeting.date, time: meeting.time, meeting_outcome: meeting.outcome };
        }));
        return meetingsWithReferences;
    } catch(err) {
        return "Failed due to an error!";
    }
}

module.exports = {
    add_meeting,
    retrieve_sales_agent_meetings
}