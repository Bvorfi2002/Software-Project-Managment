const Cryptr = require('cryptr');
require('dotenv').config();

const cryptr = new Cryptr(process.env.ENCRYPTION_KEY);

module.exports = cryptr;