const mongoose = require('mongoose');

//using strings here so that i can mark changes made by the marketing manager in an
//understandable manner
const daySchema = new mongoose.Schema({
    time_slot_1: String, //8:00-9:30
    time_slot_2: String, //9:30-11:00
    time_slot_3: String, //11:00-12:30
    time_slot_4: String, //12:30-2:00
    time_slot_5: String, //2:00-3:30
    time_slot_6: String, //3:30-5:00
    time_slot_7: String, //5:00-6:30
    time_slot_8: String, //6:30-8:00
    time_slot_9: String, //8:00-9:30
    date: Date
});

daySchema.methods.updateSchedule = function(time_slot, new_state){
    this[time_slot] = new_state
}

const day_model = mongoose.model('Day', daySchema);

const previous_day = mongoose.model('PreviousDay', new mongoose.Schema({
    ...daySchema.obj,
    sales_agent_id: String
}));

module.exports = {
    daySchema,
    previous_day,
    day_model
}