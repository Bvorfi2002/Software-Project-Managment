const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const tokenManager = require('../utils/token-generator.js');
const referenceManager = require('../controllers/reference-manager.js');
const { ObjectId } = require('mongodb');

app.use(cookieParser());
app.use(bodyParser.json());

app.post('/add', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const new_reference = {...req.body, added_by: tokenManager.retrieve_id(req)};
        const result = await referenceManager.add_reference(new_reference);
        if(typeof result === 'string'){
            res.status(403).json('Reference already exists!');
        } else {
            res.status(200).json('Reference added successfully!');
        }
    })
});

app.put('/edit', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const { ref_id, new_info } = req.body;
        const response = await referenceManager.edit_reference(ref_id, new_info);
        if(response['result']){
            res.status(200).json(response['message']);
        } else {
            res.status(503).json(response['message']);
        }
    })
});

app.put('/edit/phone_number', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const { ref_id, phone_number } = req.body;
        const response = await referenceManager.edit_reference_phone_number(ref_id, phone_number);
        if(response.result === 1){
            res.status(200).json(response['message'])
        } else {
            res.status(409).json(response['message']);
        }
    })
})

app.delete('/delete', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const ref_id = req.body.ref_id;
        const response = await referenceManager.delete_reference(ref_id);
        if(response['result']){
            res.status(200).json(response['message']);
        } else {
            res.status(503).json(response['message']);
        }
    })
});

app.get('/sales_agent/retrieve', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const sales_agent_id = req.query.s_ag_id;
        const references = await referenceManager.get_sales_agent_references(sales_agent_id);
        if(references){
            res.status(200).json(references);
        } else {
            res.status(503).json("Unable to retrieve references");
        }
    })
});

app.get('/retrieve', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const references = await referenceManager.get_all_references();
        if(references){
            res.status(200).json(references);
        } else {
            res.status(503).json("Unable to retrieve references");
        }
    })
});

app.get('/retrieve/:id', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const ref_id = req.params.id;
        const reference = await referenceManager.get_reference_by_id(ref_id);
        if(reference){
            res.status(200).json(reference);
        } else {
            res.status(503).json("Unable to retrieve reference");
        }
    })
});

app.get('/latest_references', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const references = await referenceManager.get_all_uncalled_references();
        if(typeof(references) === 'string'){
            res.status(503).json(references);
        } else {
            res.status(200).json(references)
        }
    })
})

module.exports = app;