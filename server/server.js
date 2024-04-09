const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const cors = require("cors");
const {connectToDb} = require('./database/db.js')
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

const options = {
    key: fs.readFileSync('./localhost.key'),
    cert: fs.readFileSync('./localhost.crt'),
};

// Import the routes from controllers
const salesManagerRoutes = require('./controllers/sales-manager.js');
const transactionControllerRoutes = require('./controllers/transaction-controller.js');
const commissionManagerRoutes = require('./controllers/commission-manager.js');

// Use the routes in application
app.use('/sales', salesManagerRoutes);
app.use('/transactions', transactionControllerRoutes);
app.use('/commissions', commissionManagerRoutes);

const port = 5443;
const server = https.createServer(options, app);

connectToDb((err) => {
    if (err) {
        console.log("Something went wrong with the server! Please try again later");
    } else {
        server.listen(port, () => {
            console.log(`Listening to HTTPS on port ${port}`);
        });
    }
});
