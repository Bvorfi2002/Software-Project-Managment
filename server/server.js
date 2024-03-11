const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const cors = require("cors");
const test_route = require('./routes/test_route.js')

const allowedOrigins = ['https://localhost:3000'];

app.use(cors({
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
}));

app.use('/test', test_route);


const options = {
    key: fs.readFileSync('./localhost.key'),
    cert: fs.readFileSync('./localhost.crt'),
};

const port = 5443;
const server = https.createServer(options, app);


server.listen(port, () => {
    console.log(`Listening to HTTPS on port ${port}`);
});