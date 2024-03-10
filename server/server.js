require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const stuffRoutes = require('./routes/stuffs')

//express app
const app = express()

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/stuffs', stuffRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })  
    })
    .catch((error) => {
        console.log(error)
    })