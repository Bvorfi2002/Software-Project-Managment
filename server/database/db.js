const mongoose = require('mongoose');
require('dotenv').config();

let dbConnection = null;
const url = process.env.MONGO_URI;

module.exports = {
    connectToDb: (cb)=>{
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
    .then( () => {
        dbConnection = mongoose.connection;
        dbConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));
        dbConnection.once('open', () => {
            console.log('Connected to MongoDB!');
        });
        cb();
    })
    .catch( (err) => {
        console.error(`Error connecting to the database: ${err}`);
    })
    },
    getDb: ()=>dbConnection
}