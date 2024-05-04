const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const tokenManager = require('../utils/token-generator')
const commissionManager = require('../controllers/commision-manager');

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

module.exports = app;