const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const tokenManager = require('../utils/token-generator.js');
const callManager = require('../controllers/call-manager.js');

app.use(cookieParser());
app.use(bodyParser.json());


app.put('/call_outcome', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const newCall = {...req.body, p_ag_id: tokenManager.retrieve_id(req)}
        const response = await callManager.create_finished_call(newCall);
        if(response['result']){
            if(req.body.outcome){
                await callManager.create_red_list_call({ date: req.body.date, reference_id: req.body.reference_id, p_ag_id: tokenManager.retrieve_id(req)});
            }
            res.status(200).json(response['message']);
        } else {
            res.status(503).json(response['message']);
        }
    })
})

app.put('/reserved_call/success', async(req, res)=>{
    await tokenManager.authorize(req, res, async()=>{
        const { call_id, s_ag_id, date, time } = req.body;
        const theDate = new Date(date);
        const response = await callManager.reserved_call_to_meeting(call_id, tokenManager.retrieve_id(req), s_ag_id, theDate, time);
        if(response.result){
            res.status(200).json("Meeting set successfully");
        } else {
            res.status(503).json("Could not update this call!");
        }
    })
})

app.put('/reference/success', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const { reference_id, s_ag_id, date, time } = req.body;
        const theDate = new Date(date);
        const response = await callManager.reference_to_meeting(reference_id, s_ag_id, tokenManager.retrieve_id(req), theDate, time);
        if(response.result)
            res.status(200).json("Meeting set successfully");
        else
            res.status(503).json("Could not update this call!");
    })
})

app.put('/reference/reschedule', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const { reference_id, date } = req.body;
        const theDate = new Date(date);
        const response = await callManager.reference_to_reschedule(reference_id, tokenManager.retrieve_id(req), theDate);
        if(response.result)
            res.status(200).json("Rescheduled successfully");
        else
            res.status(503).json("Could not update this call!");
    })
});

app.put('/reference/outcome', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const { reference_id, outcome } = req.body;
        const response = await callManager.reference_to_outcome(reference_id, tokenManager.retrieve_id(req), outcome);
        if(response.result)
            res.status(200).json("Rescheduled successfully");
        else
            res.status(503).json("Could not update this call!");
    })
});

app.put('/reserved_call/call_outcome', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const response = await callManager.create_finished_call_by_reserved_call(req.body.reserved_id, req.body.outcome);
        if(response['result']){
            res.status(200).json(response['message']);
        } else {
            res.status(503).json(response['message']);
        }
    })
})

app.put('/reserved_call/reschedule', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const response = await callManager.reschedule_reserved_call(req.body.reserved_id, new Date(req.body.date));
        if(response['result']){
            res.status(200).json(response['message']);
        } else {
            res.status(503).json(response['message']);
        }
    })
})

app.post('/reserved_call/create', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const response = await callManager.create_reserved_call(req.body);
        if(response['result']) {
            res.status(200).json(response['message']);
        } else {
            res.status(503).json(response['message']);
        }
    })
})

app.get('/reserved_call/retrieve', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const reservedCalls = await callManager.get_reserved_calls([]);
        if(reservedCalls){
            res.status(200).json(reservedCalls);
        } else {
            res.status(503).json("Unable to retrieve calls!");
        }
    })
})

app.get('/reserved_call/retrieve/interval', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const reservedCalls = await callManager.get_reserved_calls_by_interval(new Date(req.query.start), new Date(req.query.end), []);
        if(reservedCalls){
            res.status(200).json(reservedCalls);
        } else {
            res.status(503).json("Unable to retrieve calls!");
        }
    })
})

app.get('/reserved_call/agent/retrieve', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const reservedCalls = await callManager.get_reserved_calls_by_agent(tokenManager.retrieve_id(req), []);
        if(reservedCalls){
            res.status(200).json(reservedCalls);
        } else {
            res.status(503).json("Unable to retrieve calls!");
        }
    })
})

app.get('/reserved_call/agent/retrieve/interval', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const reservedCalls = await callManager.get_reserved_calls_by_agent_by_interval(tokenManager.retrieve_id(), new Date(req.query.start), new Date(req.query.end), []);
        if(reservedCalls){
            res.status(200).json(reservedCalls);
        } else {
            res.status(503).json("Unable to retrieve calls!");
        }
    })
})

app.get('/finished_call/retrieve', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const finishedCalls = await callManager.get_finished_calls([]);
        if(finishedCalls){
            res.status(200).json(finishedCalls);
        } else {
            res.status(503).json("Unable to retrieve calls!");
        }
    })
})

app.get('/finished_call/retrieve/interval', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const finishedCalls = await callManager.get_finished_calls_by_interval(new Date(req.query.start), new Date(req.query.end), []);
        if(finishedCalls){
            res.status(200).json(finishedCalls);
        } else {
            res.status(503).json("Unable to retrieve calls!");
        }
    })
})

app.get('/finished_call/agent/retrieve', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const finishedCalls = await callManager.get_finished_calls_by_agent(tokenManager.retrieve_id(req), []);
        if(finishedCalls){
            res.status(200).json(finishedCalls);
        } else {
            res.status(503).json("Unable to retrieve calls!");
        }
    })
})

app.get('/finished_call/agent/retrieve/interval', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const finishedCalls = await callManager.get_finished_calls_by_agent_by_interval(req.query.agent_id, new Date(req.query.start), new Date(req.query.end), []);
        if(finishedCalls){
            res.status(200).json(finishedCalls);
        } else {
            res.status(503).json("Unable to retrieve calls!");
        }
    })
})

app.get('/red_list_call/retrieve', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const red_listCalls = await callManager.get_red_list_calls([]);
        if(red_listCalls){
            res.status(200).json(red_listCalls);
        } else {
            res.status(503).json("Unable to retrieve calls!");
        }
    })
})

app.get('/red_list_call/retrieve/interval', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const red_listCalls = await callManager.get_red_list_calls_by_interval(new Date(req.query.start), new Date(req.query.end), []);
        if(red_listCalls){
            res.status(200).json(red_listCalls);
        } else {
            res.status(503).json("Unable to retrieve calls!");
        }
    })
})

app.get('/red_list_call/agent/retrieve', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const red_listCalls = await callManager.get_red_list_calls_by_agent(req.query.agent_id, []);
        if(red_listCalls){
            res.status(200).json(red_listCalls);
        } else {
            res.status(503).json("Unable to retrieve calls!");
        }
    })
})

app.get('/red_list_call/agent/retrieve/interval', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const red_listCalls = await callManager.get_red_list_calls_by_agent_by_interval(req.query.agent_id, new Date(req.query.start), new Date(req.query.end), []);
        if(red_listCalls){
            res.status(200).json(red_listCalls);
        } else {
            res.status(503).json("Unable to retrieve calls!");
        }
    })
})

app.post('/reserved/add-many', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const date = new Date(req.body.callDetails.reserved_date)
        const response = await callManager.create_many_reserved_calls(req.body.references, { ...req.body.callDetails, reserved_date: date });
        if(response.result)
            res.status(200).send('Added successfully!');
        else
            res.status(503).send("Could not perform this operation at this time!")
    })
})

app.post('/reserved/add-from-red-list', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const date = new Date(req.body.reserved_date)
        const response = await callManager.create_many_reserved_calls_from_redlist(req.body.calls, date);
        if(response.result)
            res.status(200).send('Added successfully!');
        else
            res.status(503).send("Could not perform this operation at this time!")
    })
})


module.exports = app;