const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const tokenManager = require('../utils/token-generator.js');
const clientManager = require('../controllers/client-manager.js');
require('dotenv').config();

app.use(cookieParser());
app.use(bodyParser.json());

app.get('/retrieve', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        try{
            const buyers = await clientManager.get_all_buyers();
            res.status(200).json(buyers);
        }catch(err){
            res.status(503).json('Internal server error');
        }               
    })
});

module.exports = app;