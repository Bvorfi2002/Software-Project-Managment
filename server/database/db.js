const mongoose = require('mongoose');
let dbConnection = null;
const url = "mongodb+srv://FilterManager:FilterSystem123@clusterepoka.itz3wpc.mongodb.net/?retryWrites=true&w=majority&appName=ClusterEpoka";
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