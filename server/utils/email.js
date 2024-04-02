const nodemailer = require('nodemailer');
const { google } = require('googleapis');
require('dotenv').config();
const security = require('./security-ground.js');

const generate_transporter = async ()=>{
    return nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASS,
        },
    });
}

const sendOtp = async (emailAdress, temp_id) => {

    const otp = security.otpGenerator();
    security.otpStoring(temp_id, otp);

    const mailOptions = {
        from: "no-reply",
        to: emailAdress,
        subject: 'VERIFICATION CODE',
        text: 'Hello, this is your one time password: ' + otp + ' It will allow you to login this time. If it wasn\'t you who tried to login please contact us!',
    };

    let transporter = await generate_transporter();
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info.response);
        }
    })
}

const sendUserInfo = async (emailAdress, username, password) => {
    const mailOptions = {
        from: "no-reply",
        to: emailAdress,
        subject: 'Information for the new user',
        text: "Hello, and welcome to the filter company management system. Here is the information regarding your account:\n" + "Username: " + username + "\nPassword: " + password + "\nAfter logging in you may change these credentials."
    };

    let transporter = await generate_transporter();
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info.response);
        }
    })
}

module.exports = {
    sendOtp,
    sendUserInfo,
}