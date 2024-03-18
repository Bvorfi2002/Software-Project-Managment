const jwt = require('jsonwebtoken');
require('dotenv').config();
const tokenIssuing = async (userid) => {
    const user = {} //user retrieving code will be here
    const accessToken = jwt.sign(user, process.env.JWT_KEY, {expiresIn: 900}) //15 minutes
    const refreshToken = jwt.sign(user, process.env.JWT_KEY, {expiresIn: '1h'});
    return {accessToken: accessToken, refreshToken: refreshToken};
}

module.exports = {
tokenIssuing
}