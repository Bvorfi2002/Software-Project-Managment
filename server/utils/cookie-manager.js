const createCookie = (res, tokens) => {
    const currentDate = new Date();
    console.log("Setting cookie");
    res.cookie('tokenCookie', tokens, {
        maxTime: 3600000,
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    });
}

const deleteCookie = (res)=>{
    console.log("Deleting cookie");
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