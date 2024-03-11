const mongoose = require('mongoose');
const env = require('dotenv')

let dbConnection = null;
const url = process.env.MONGO_URI;
const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true,
    createIndexes: true,
}

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
        console.error(`Error connecting to the database. n${err}`);
    })
    },
    getDb: ()=>dbConnection
}