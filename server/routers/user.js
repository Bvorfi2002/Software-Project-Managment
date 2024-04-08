const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const tokenManager = require('../utils/token-generator.js');
const cookieManager = require('../utils/cookie-manager.js')
const security_ground = require('../utils/security-ground.js')
const email = require('../utils/email.js');
const user_proxy = require('../controllers/user-proxy.js');
require('dotenv').config();

app.use(cookieParser());
app.use(bodyParser.json());

app.post('/generate', (req, res)=>{
    tokenManager.authorize(req, res, async ()=>{
        if(tokenManager.identify_role() === 'admin'){
            const result = await user_proxy.generate_user(...req.body);
            if(type(result) === 'string')
                res.status(403).json(result);
            else
                res.status(200).json("Generated successfully!");
        } else{
            res.status(401).json("No permission for such action!");
        }
    })
});

app.put('/update', (req, res)=>{

});

app.delete('/delete', (req, res)=>{

});

app.get('/get_info', (req, res)=>{

});

module.exports = app;