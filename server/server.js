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
const { add_meeting } = require('./controllers/meeting-manager');

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
        server.listen(port, () => {
            // add_meeting('6632cffd46cbd7c8c244aa53', new Date("2024-04-15"), 'time_slot_3', '6614bc0d9a25cd1a6f5b747f', '6630bc406ce51fc72ec18eb1');
            // add_meeting('66340801641a7d478b0a4cdd', new Date("2024-04-15"), 'time_slot_4', '6614bc0d9a25cd1a6f5b747f', '6630bc406ce51fc72ec18eb1');
            // add_meeting('66340834641a7d478b0a4ce0', new Date("2024-04-15"), 'time_slot_5', '6614bc0d9a25cd1a6f5b747f', '6630bc406ce51fc72ec18eb1');
            // add_meeting('66362b226a34cb43eb27c54a', new Date("2024-04-15"), 'time_slot_6', '6614bc0d9a25cd1a6f5b747f', '6630bc406ce51fc72ec18eb1');
            console.log(`Listening to HTTPS on port ${port}`);
        });
    }
});
