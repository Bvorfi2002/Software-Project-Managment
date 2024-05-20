const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const tokenManager = require('../utils/token-generator.js');
const debtManager = require('../controllers/debt-manager.js');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/getDebts', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const debts = await debtManager.get_all_debts();
        res.status(200).json(debts);
    })
});

module.exports = app;