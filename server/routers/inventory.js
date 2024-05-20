const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const tokenManager = require('../utils/token-generator')
const inventoryManager = require('../controllers/inventory-manager')

app.use(bodyParser.json())
app.use(cookieParser());

app.get('/getItems', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const response = await inventoryManager.getAllItems();
        if(response.result){
            res.status(200).json(response.items);
        } else {
            res.status(400).json(response.message);
        }
    });
});

app.put('/editItem', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const response = await inventoryManager.editItem(req.body.itemId, req.body.newInfo);
        if(response.result){
            res.status(200).json(response.message);
        } else {
            res.status(400).json(response.message);
        }
    });
});

app.put('/addQuantity', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const response = await inventoryManager.addQuantity(req.body.itemId, req.body.quantity);
        if(response.result){
            res.status(200).json(response.message);
        } else {
            res.status(400).json(response.message);
        }
    });
});

app.post("/addItem", async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const response = await inventoryManager.addItem({ ...req.body.item });
        if(response.result){
            res.status(200).json(response.message);
        } else {
            res.status(400).json(response.message);
        }
    });
});

app.delete("/deleteItem", async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const response = await inventoryManager.deleteItem(req.body.itemId);
        if(response.result){
            res.status(200).json(response.message);
        } else {
            res.status(400).json(response.message);
        }
    });
})

module.exports = app;
