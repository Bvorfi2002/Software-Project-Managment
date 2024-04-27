const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const tokenManager = require("../utils/token-generator.js");
const salesManager = require("../controllers/sales-manager.js");
const cache = require('../utils/in-memory-cache.js');

app.use(cookieParser());
app.use(bodyParser.json());

const calculate_new_discount = (number_of_references)=>{
    if(number_of_references < 10){
        return number_of_references * 50;
    } else {
        return 500;
    }
}

app.post("/create", async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const new_sale = {
            s_ag_id: req.body.s_ag_id,
            p_ag_id: req.body.p_ag_id,
            date: new Date(),
            amount: 0,
            sale_type: "",
            client_id: req.body.ref_id,
            ref_count: 0,
            approved: false,
            contract_path: ""
        }
        cache.set(req.body.ref_id + "_sale", new_sale);
    });
})

app.post("/finish_creation", async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        
    });
})

app.post("/add_reference", async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const current_sale = cache.get(req.body.ref_id + '_sale');
        current_sale['ref_count']++;
        cache.set(req.body.ref_id + '_sale', current_sale);
        const new_discount = calculate_new_discount(current_sale['ref_count']);
        res.status(202).json(new_discount);
    });
})

app.put("/confirm", async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        
    });
})

module.exports = app;