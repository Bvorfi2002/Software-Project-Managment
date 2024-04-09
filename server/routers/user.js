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

app.put('/update', (req, res)=>{

});

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