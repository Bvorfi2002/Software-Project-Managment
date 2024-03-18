const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;
require('dotenv').config();
const security = require('./security-ground.js');

const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
});

const generate_access_token = async ()=>{
    const accessToken = await new Promise((resolve, reject) => {
        oauth2Client.getAccessToken((err, token) => {
          if (err) {
            console.log("*ERR: ", err)
            reject();
          }
          resolve(token); 
        });
      });
    return accessToken;
}

const generate_transporter = async ()=>{
    const accessToken = await generate_access_token();
    return nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: process.env.EMAIL_ADDRESS,
          accessToken,
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
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
        text: "Hello, and welcome to the filter company management system. Here is the information regarding your account:\n" + "Username: " + username + "\nPassword: " + password + "/nAfter logging in you may change these credentials."
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
    test_mail
}