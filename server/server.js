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
const { generate_user } = require("./controllers/user-proxy.js");

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
        generate_user("Brinaldo", "Vorfi", "bvorfi21@epoka.edu.al", '+355688555608', 'phone');
        generate_user("Iglis", "Kociu", 'ikociu21@epoka.edu.al', '+355688555608', 'marketing');
        server.listen(port, () => {
            console.log(`Listening to HTTPS on port ${port}`);
        });
    }
});
