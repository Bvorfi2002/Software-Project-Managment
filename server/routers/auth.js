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
            res.status(response.code).json({userid: temp_id, role: response.info.kind});
        } else{
            const tokenObj = await tokenManager.tokenIssuing(response.user_info);
            await tokenManager.createCookie(res, tokenObj);
            res.status(200).json("Login successful!");
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
        await tokenManager.createCookie(res, tokenObj);
        res.status(200).json("Login successful!");
    } else {
        res.status(result.code).message("Authentication failed!");
    }
});

app.get('/logout', async (req, res)=>{
    await cookieManager.deleteCookie(res);
    res.status(200).json("Logging out!");
})

app.get('/authorization', async (req, res)=>{
    tokenManager.authorize(req, res, ()=>{
        const role = tokenManager.identify_role();
        res.status(200).json(role);
    });
})


module.exports = app;