const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const tokenManager = require('../utils/token-generator')
const commissionManager = require('../controllers/commision-manager.js');
const salesManager = require('../controllers/sales-manager.js');

app.use(bodyParser.json())
app.use(cookieParser());

app.post('/failed_meeting_commission', async (req, res)=>{
    await tokenManager.authorize(req, res, async()=>{
        const response = await commissionManager.create_tiered_commission_sales_agent(tokenManager.retrieve_id(req), req.body.refCount);
        if(response.result)
            res.status(200).json(response.message);
        else
            res.status(503).json(response.message);
    })
})

app.put('/get_monthly_commission', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const response = await commissionManager.retrieve_monthly_commission(req.body.month, req.body.year);
        if(response.result){
            res.status(200).json(response.commissions)
        } else  {
            res.status(400).json(response.message)
        }   
    })
})

app.put('/commission_details_phone_agent', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const response = await commissionManager.retrieve_commissions_of_phone_agent(req.body.agentId, req.body.month, req.body.year);
        if(response.result){
            res.status(200).json(response.commissions)
        } else  {
            res.status(400).json(response.message)
        }
    })
})

app.put('/commission_details_sales_agent', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const commissionResponse = await commissionManager.retrieve_commissions_of_sales_agent(req.body.agentId, req.body.month, req.body.year);
        const salesResponse = await salesManager.getSalesCountByMonth(req.body.agentId, req.body.month, req.body.year);
        if(commissionResponse.result && salesResponse.result)
            res.status(200).json({ count: salesResponse.count, commissions: commissionResponse.commissions })
        else
            res.status(400).json("Could not get details")
    })
})

app.put('/release', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const response = await commissionManager.release_commission(req.body.commissionId);
        if(response.result){
            res.status(200).json(response.message)
        } else  {
            res.status(400).json(response.message)
        }
    })
})

module.exports = app;