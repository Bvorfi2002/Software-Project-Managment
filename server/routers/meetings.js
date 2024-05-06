const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const tokenManager = require('../utils/token-generator.js');
const meetingManager = require('../controllers/meeting-manager.js')

app.use(cookieParser());
app.use(bodyParser.json());

app.get('/sales_agent/meetings', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const meetings = await meetingManager.retrieve_sales_agent_meetings(tokenManager.retrieve_id(req));
        if(typeof meetings === 'string')
            res.status(503).json(meetings);
        else
            res.status(200).json(meetings);
    })
});

app.get('/meeting/add', async (req, res)=>{
    await tokenManager.authorize(req, res, ()=>{
        const result = meetingManager.add_meeting(req.body.ref_id, new Date(req.body.date), req.body.slot, req.body.s_ag_id, req.body.p_ag_id);
        let status = 200
        if(!result.result)
            status = 503
        res.status(200).json(result['message']);
    });
})

app.put("/cancel_meeting", async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const response = await meetingManager.edit_meeting_status(req.body.meetingId, req.body.newOutcome);
        if(response.result){
            res.status(200).json(response.message)
        } else {
            res.status(503).json(response.message);
        }
    });
})

app.post("/add_instant_meeting", async (req, res)=>{
    tokenManager.authorize(req, res, async ()=>{
        const meetingInfo = req.body.meetingInfo;
        const response = await meetingManager.add_instant_meeting({...meetingInfo, s_ag_id: tokenManager.retrieve_id(req)});
        if(response.result){
            res.status(200).json("Created successfully!");
        } else {
            res.status(503).json(response.message);
        }
    });
})

module.exports = app;