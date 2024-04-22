const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const { first_degree_auth, second_degree_auth } = require('../controllers/user-proxy.js');
const tokenManager = require('../utils/token-generator.js');
const cookieManager = require('../utils/cookie-manager.js')
const security_ground = require('../utils/security-ground.js')
const email = require('../utils/email.js');
require('dotenv').config();

app.use(cookieParser());
app.use(bodyParser.json());

app.post('/login', async (req, res)=>{
    const response = await first_degree_auth(req.body.username, req.body.password);
    if(response.result){
        if(response.code){
            const temp_id = security_ground.temporary_id_generator(response.info.id);
            email.sendOtp(response.info.email, temp_id);
            res.status(response.code).json({userid: temp_id, role: response.info.role});
        } else{
            const tokenObj = await tokenManager.tokenIssuing(response.user_info);
            cookieManager.createCookie(res, tokenObj);
            res.status(200).json({role: response.user_info.role});
        }
    } else{
        res.status(response.code).json(response.message);
    }
});

app.post('/otp-verification', async (req, res)=>{
    const result = await second_degree_auth(req.body.userid, req.body.otp);
    if(result.result){
        const user_id = security_ground.id_decrypter(req.body.userid)
        const tokenObj = await tokenManager.tokenIssuing({user_id: user_id, role: req.body.role});
        cookieManager.createCookie(res, tokenObj);
        res.status(200).json("Login successful!");
    } else {
        res.status(result.code).json("Authentication failed!");
    }
});

app.post('/logout', (req, res)=>{
    cookieManager.deleteCookie(res);
    res.status(200).json("Logging out!");
})

app.get('/authorization', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const role = tokenManager.identify_role(req);
        res.status(200).json(role);
    });
})


module.exports = app;