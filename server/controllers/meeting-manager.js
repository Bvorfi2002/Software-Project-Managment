const Meeting = require('../models/contact/meeting');
const Reference = require('../models/contact/reference');
const ScheduleManager = require("./schedule-manager.js");
const referenceManager = require('./reference-manager.js');

const add_meeting = async (reference_id, date, time, sales_agent_id, phone_agent_id) => {
    const operation_results = { result: true, message: "Meeting added successfully!" };
    try {
        const newMeeting = new Meeting({ date: date, time: time, referral: reference_id, sales_agent: sales_agent_id, phone_agent: phone_agent_id })
        await newMeeting.save();
        const referenceToUpdate = await Reference.findById(reference_id).exec();
        referenceToUpdate.toClient(sales_agent_id, phone_agent_id);
        await ScheduleManager.change_state(sales_agent_id, date, time, "meeting");
        return operation_results;
    } catch (err) {
        console.log(err);
        operation_results['message'] = err.message;
        operation_results['result'] = false;
        return operation_results;
    }
}

const add_instant_meeting = async (meetingInformation) => {
    try {
        const refAdded = new Reference({
            name: meetingInformation.name,
            surname: meetingInformation.surname,
            profession: meetingInformation.profession,
            phone: meetingInformation.phone,
            address: meetingInformation.address,
            city: meetingInformation.city,
            called: True,
        });
        await refAdded.save();
        refAdded.toClient();
        const scheduleChanged = ScheduleManager.change_state(meetingInformation.s_ag_id, new Date(meetingInformation.date), meetingInformation.time, 'meeting');
        const newMeeting = new Meeting({ date: meetingInformation.date, time: meetingInformation.time, referral: refAdded._id, sales_agent: meetingInformation.s_ag_id });
        await newMeeting.save();
        return { result: true, message: "added" };
    } catch (err) {
        console.log(err);
        return { result: false, message: "Could not update with new meeting!" }
    }
}

const retrieve_reference_of_meeting = async (ref_id) => {
    return await Reference.findById(ref_id).exec()
}

const retrieve_sales_agent_meetings = async (sales_agent_id) => {
    try {
        const meetings = await Meeting.find({ sales_agent: sales_agent_id });
        const meetingsWithReferences = await Promise.all(meetings.map(async (meeting) => {
            const reference = await retrieve_reference_of_meeting(meeting.referral);
            return { _id: meeting._id, ref_id: reference._id, p_ag_id: meeting.phone_agent, comments: reference.comments, profession: reference.profession, name: reference.name, surname: reference.surname, phone: reference.phone, address: reference.address, city: reference.city, date: meeting.date, time: meeting.time, meeting_outcome: meeting.outcome };
        }));
        return meetingsWithReferences;
    } catch (err) {
        return "Failed due to an error!";
    }
}

const edit_meeting_status = async (meeting_id, new_outcome) => {
    try {
        await Meeting.findByIdAndUpdate(meeting_id, { outcome: new_outcome });
        return { result: true, message: "Meeting logged successfully!" };
    } catch (err) {
        return { result: false, message: err.message };
    }
}

module.exports = {
    add_meeting,
    retrieve_sales_agent_meetings,
    edit_meeting_status,
    add_instant_meeting
}