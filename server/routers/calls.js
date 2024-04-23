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
        const response = await callManager.create_finished_call(req.body);
        if(response['result']){
            if(req.body.outcome){
                await callManager.create_red_list_call({ date: req.body.date, reference_id: req.body.reference_id, p_ag_id: req.body.p_ag_id});
            }
            res.status(200).json(response['message']);
        } else {
            res.status(503).json(response['message']);
        }
    })
})

app.put('/reserved_call/call_outcome', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const response = await callManager.create_finished_call_by_reserved_call(req.body.reserved_id, req.body.outcome);
        if(response['result']){
            if(req.body.outcome){
                await callManager.create_red_list_call_by_reserved(req.body.reserved_id);
            }
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
        const reservedCalls = await callManager.get_reserved_calls_by_agent(req.query.agent_id, []);
        if(reservedCalls){
            res.status(200).json(reservedCalls);
        } else {
            res.status(503).json("Unable to retrieve calls!");
        }
    })
})

app.get('/reserved_call/agent/retrieve/interval', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const reservedCalls = await callManager.get_reserved_calls_by_agent_by_interval(req.query.agent_id, new Date(req.query.start), new Date(req.query.end), []);
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
        const finishedCalls = await callManager.get_finished_calls_by_agent(req.query.agent_id, []);
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


module.exports = app;