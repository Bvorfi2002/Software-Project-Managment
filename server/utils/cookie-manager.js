const createCookie = async (res, tokens) => {
    res.cookie('tokenCookie', tokens, {
        maxAge: 3600000,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    });
}

const deleteCookie = async (res)=>{
    res.cookie("tokenCookie", "", {
        expires: new Date(0),
        httpOnly: true,
        secure: true,
        sameSite: "none"
    });
}

module.exports = {
    createCookie,
    deleteCookie
}