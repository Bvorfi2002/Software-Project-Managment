const jwt = require('jsonwebtoken');
require('dotenv').config();

const tokenIssuing = async (user_info) => {
    const accessToken = jwt.sign({ ...user_info }, process.env.JWT_KEY, { expiresIn: 900 }) //15 minutes
    const refreshToken = jwt.sign({ ...user_info }, process.env.JWT_KEY, { expiresIn: '1h' });
    return { accessToken: accessToken, refreshToken: refreshToken };
}

const tokenChecker = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        return { result: true, payload: decoded };
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return { result: false, code: 2 }
        } else {
            return { result: false, code: 3 }
        }
    }
}

const tokenRefresher = (refreshToken) => {
    console.log('Refreshing token');
    const checkToken = tokenChecker(refreshToken);
    if (checkToken.result) {
        return { result: true, content: jwt.sign({user_id: checkToken.payload.user_id, role: checkToken.payload.role}, process.env.JWT_KEY, { expiresIn: 900 }) }
    } else if (checkToken.code === 2) {
        return { result: false, content: "Token expired" }
    } else {
        return { result: false, content: "Token is invalid" }
    }
}

const authorize = async (req, res, proceeding) => {
    const tokens = req.cookies.tokenCookie;
    if (tokens) {
        const checkAccess = tokenChecker(tokens.accessToken);
        if (checkAccess.result) {
            await proceeding();
        } else {
            const refreshAccess = tokenRefresher(tokens.refreshToken);
            if (refreshAccess.result) {
                res.cookie('tokenCookie', { accessToken: refreshAccess.content, refreshToken: tokens.refreshToken }, {
                    maxAge: 3600000,
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none',
                });
                req.cookies.tokenCookie.accessToken = refreshAccess.content;
                await proceeding();
            } else {
                res.status(401).json(refreshAccess.content);
            }
        }
    } else {
        res.status(401).json('No token presented');
    }
}

const identify_role = (req)=>{
    const access_token = req.cookies.tokenCookie.accessToken;
    const decoded = jwt.verify(access_token, process.env.JWT_KEY);
    return decoded.role;
}

const retrieve_id = (req)=>{
    const access_token = req.cookies.tokenCookie.accessToken;
    const decoded = jwt.verify(access_token, process.env.JWT_KEY);
    return decoded.user_id;
}

module.exports = {
    tokenIssuing,
    tokenChecker,
    tokenRefresher,
    authorize,
    identify_role,
    retrieve_id
}