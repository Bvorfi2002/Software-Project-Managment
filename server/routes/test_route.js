const express = require('express')
const app = express()

app.get("/test_message", (req, res)=>{
    res.status(200).json("You made it mate");
})

module.exports = app;