const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const tokenManager = require("../utils/token-generator.js");
const salesManager = require("../controllers/sales-manager.js");
const cache = require('../utils/in-memory-cache.js');
const { generate_pdf } = require('../utils/pdf.js');

app.use(cookieParser());
app.use(bodyParser.json());

const calculate_new_discount = (number_of_references)=>{
    if(number_of_references < 10){
        return number_of_references * 50;
    } else {
        return 500;
    }
}

app.post("/create_sale", async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const existing_sale = cache.get(req.body.ref_id + "_sale");
        if(existing_sale){
            res.status(200).json(existing_sale)
        } else {
            const new_sale = {
                s_ag_id: tokenManager.retrieve_id(req),
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
            res.status(200).json(new_sale);
        }        
    });
})

app.post("/finish_creation", async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const newSale = cache.get(req.body.ref_id + "_sale");
        newSale['amount'] = req.body.amount;
        newSale['sale_type'] = req.body.remaining ? "lease" : "full"
        const response = await salesManager.create_new_sale(newSale, req.body.remaining, req.body.months);
        cache.del(req.body.ref_id + "_sale");
        if(response.result){
            generate_pdf(newSale, res)
        } else {
            res.status(503).json("Something went wrong with creating this sale!");
        }
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
        const response = await salesManager.confirm_sale(req.body.saleId);
        if(response.result){
            res.status(200).json(response.message);
        } else {
            res.status(400).json(response.message);
        }
    });
})

app.get('/retrieve', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const response = await salesManager.get_all_sales();
        if(response.result){
            res.status(200).json(response.sales);
        } else {
            res.status(400).json(response.message);
        }
    })
})

module.exports = app;