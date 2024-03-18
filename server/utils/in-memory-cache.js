const cache = require('node-cache')

const client = new cache();

client.on( "expired", function( key, value ){
    client.del(key);
});

module.exports = client;