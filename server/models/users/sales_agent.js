const mongoose = require('mongoose')
const user = require('./user.js');
const {daySchema, previous_day} = require('../timeline/day.js');
const options = { discriminatorKey: 'kind' };

const sales_agent_schema = new mongoose.Schema({
    sales_agent_id: String,
    schedule: {
        type: [daySchema],
        default: function (){
            let arr = []
            for (let i=0; i<7; i++)
                arr.push({
                    time_slot_1: 'free', //8:00-9:30
                    time_slot_2: 'free', //9:30-11:00
                    time_slot_3: 'free', //11:00-12:30
                    time_slot_4: 'free', //12:30-2:00
                    time_slot_5: 'free', //2:00-3:30
                    time_slot_6: 'free', //3:30-5:00
                    time_slot_7: 'free', //5:00-6:30
                    time_slot_8: 'free', //6:30-8:00
                    time_slot_9: 'free', //8:00-9:30
                    date: new Date((new Date()).getTime() + (i * 24 * 60 * 60 * 1000))
                })
            return arr;
        }
    }
}, options)

sales_agent_schema.methods.moveForward = function () {
    ending_day = this.schedule[0]
    stored_day = new previous_day({...ending_day, sales_agent_id: this.sales_agent_id});
    stored_day.save()
    let currentDate = new Date();
    let sevenDaysAfter = new Date(currentDate.getTime() + (6 * 24 * 60 * 60 * 1000));
    this.schedule.push({
        time_slot_1: 'free', //8:00-9:30
        time_slot_2: 'free', //9:30-11:00
        time_slot_3: 'free', //11:00-12:30
        time_slot_4: 'free', //12:30-2:00
        time_slot_5: 'free', //2:00-3:30
        time_slot_6: 'free', //3:30-5:00
        time_slot_7: 'free', //5:00-6:30
        time_slot_8: 'free', //6:30-8:00
        time_slot_9: 'free', //8:00-9:30
        date: sevenDaysAfter
    })
    this.schedule = this.schedule.slice(1)
}

const sales_agent = user.discriminator('SalesAgent', sales_agent_schema);


module.exports = sales_agent;