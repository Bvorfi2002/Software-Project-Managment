const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const tokenManager = require('../utils/token-generator.js');
const user_proxy = require('../controllers/user-proxy.js');
require('dotenv').config();

app.use(cookieParser());
app.use(bodyParser.json());

app.post('/generate', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
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

app.put('/update/general', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const response = user_proxy.edit_user(req.body.userid, req.body.new_info);
        if(response['result']){
            res.status(200).json(response['message']);
        }else{
            res.status(400).json(response['message']);
        }
    })
});

app.put('/update/username', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const update_result = await user_proxy.update_username(req.body.userid, req.body.new_username);
        if(update_result.result === 1){
            res.status(200).json(update_result.message);
        }else {
            res.status(400).json(update_result.message);
        }
    })
});

app.put("/update/password", async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const update_result = await user_proxy.update_password(req.body.userid, req.body.old_pass, req.body.new_pass);
        if(update_result.result === 1){
            res.status(200).json(update_result.message);
        }else {
            res.status(400).json(update_result.message);
        }
    })
})

app.delete('/delete', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        if(tokenManager.identify_role() === 'admin'){
            const result = await user_proxy.delete_user(req.user_id);
            res.status(200).json("Deleted successfully!");
        } else{
            res.status(401).json("No permission for such action!");
        }
    })
});

app.get('/get_info', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const access_token = req.cookies.tokenCookie.accessToken;
        const decoded = jwt.verify(access_token, process.env.JWT_KEY);
        const user_snippet = await user_proxy.serve_user_info_by_id(decoded.user_id);
        res.status(200).json(user_snippet);
    });
});

app.get('/user_details', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{
        const user = await user_proxy.serve_full_info_by_id(req.query.user_id);
        res.status(200).json({name: user.name, surname: user.surname, username: user.username, email: user.email, phone: user.phone});
    });
})

app.get('/users', async (req, res)=>{
    await tokenManager.authorize(req, res, async ()=>{

    })
})

module.exports = app;