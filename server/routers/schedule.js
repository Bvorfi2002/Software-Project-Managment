const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const tokenManager = require('../utils/token-generator.js');
const scheduleManager = require('../controllers/schedule-manager.js');

app.use(cookieParser());
app.use(bodyParser.json());

app.get('/personal_schedule', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const personal_schedule = await scheduleManager.get_schedule(req.param.sales_agent_id);
        if(personal_schedule){
            res.status(200).json(personal_schedule);
        } else {
            res.status(404).json("Could not find the schedule");
        }
    })
})

app.put('/edit/change_state', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const { s_ag_id, date, slot, new_state } = req.body;
        const result = await scheduleManager.change_state(s_ag_id, date, slot, new_state);
        if(result){
            res.status(200).json('Changed successfully');
        } else {
            res.status(503).json("Internal server error");
        }
    })
})

app.put('/edit/marketing_manager/change_state', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const { s_ag_id, date, slot, new_state } = req.body;
        const result = await scheduleManager.change_state_by_marketing_manager(s_ag_id, date, slot, new_state);
        if(result){
            res.status(200).json('Changed successfully');
        } else {
            res.status(503).json("Internal server error");
        }
    })
})

module.exports = app;