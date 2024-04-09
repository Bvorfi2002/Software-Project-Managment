const createCookie = (res, tokens) => {
    const currentDate = new Date();
    console.log("Setting cookie");
    res.cookie('tokenCookie', tokens, {
        expires: new Date(currentDate.getTime() + (7 * 24 * 60 * 60 * 1000)),
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