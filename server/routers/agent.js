const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const tokenManager = require('../utils/token-generator.js');
const user_proxy = require('../controllers/user-proxy.js');
require('dotenv').config();

app.use(cookieParser());
app.use(bodyParser.json());


app.get('/phone_agents', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        try{
            const agents = await user_proxy.get_all_phone_agents();
            res.status(200).json(agents)
        } catch(err){
            res.status(503).json("Unable to perform operation");
        }
    })
})


module.exports = app;