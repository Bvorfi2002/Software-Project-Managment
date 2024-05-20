const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const cors = require("cors");
const {connectToDb} = require('./database/db.js')
const allowedOrigins = ['https://localhost:3000'];
const authRouter = require('./routers/auth.js');
const userRouter = require('./routers/user.js');
const scheduleRouter = require("./routers/schedule.js");
const referenceRouter = require("./routers/references.js");
const meetingRouter = require('./routers/meetings.js');
const commissionRouter = require('./routers/commission.js');
const salesRouter = require('./routers/sales.js');
const callRouter = require('./routers/calls.js');
const agentRouter = require('./routers/agent.js');
const buyerRouter = require('./routers/buyer.js');
const debtRouter = require('./routers/debt.js');
const inventoryRouter = require('./routers/inventory.js');

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

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/schedule', scheduleRouter);
app.use('/references', referenceRouter);
app.use('/meeting', meetingRouter);
app.use('/commission', commissionRouter);
app.use('/sales', salesRouter);
app.use('/calls', callRouter);
app.use('/agents', agentRouter);
app.use('/buyers', buyerRouter);
app.use('/debt', debtRouter);
app.use('/inventory', inventoryRouter);

const options = {
    key: fs.readFileSync('./localhost.key'),
    cert: fs.readFileSync('./localhost.crt'),
};

const port = 5443;
const server = https.createServer(options, app);

connectToDb((err) => {
    if (err) {
        console.log("Something went wrong with the server! Please try again later");
    } else {
        // create_reserved_call({reference_id: '6638daba91806030125f8546', p_ag_id: '6632a87c267b01df9199cc16', reserved_date: new Date()});
        // create_reserved_call({reference_id: '6638db3d91806030125f85a6', p_ag_id: '6632a87c267b01df9199cc16', reserved_date: new Date()});
        // create_reserved_call({reference_id: '6638dc0f91806030125f85de', p_ag_id: '6632a87c267b01df9199cc16', reserved_date: new Date()});
        server.listen(port, () => {
            console.log(`Listening to HTTPS on port ${port}`);
        });
    }
});
