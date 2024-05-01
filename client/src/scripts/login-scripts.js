const SERVER_URL = "https://localhost:5443"

const verifyLoginInfo = (loginInfo, notification) => {
    if (!loginInfo.username) {
        notification.add("Username is required!", { variant: "error" });
        return false;
    } else if (!loginInfo.password) {
        notification.add("Password is required!", { variant: "error" });
        return false;
    } else {
        return true;
    }
}

const verifyOtp = (otp) => {
    for (let key in otp) {
        if (!otp[key])
            return false;
    }
    return true;
}

const generateOtpString = (otp) => {
    let otpString = "";
    for (let key in otp)
        otpString += otp[key];
    return otpString
}

const role_to_path = {
    'SalesAgent': 'sales_agent',
    'phone_agent': 'phone_agent',
    'marketing_manager': 'marketing_manager'
}

export const login = (loginInfo, notification, naviagtor, controlLoading) => {
    if (verifyLoginInfo(loginInfo, notification)) {
        controlLoading(true);
        fetch(SERVER_URL + "/auth/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(loginInfo)
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                controlLoading(false);
                if (typeof data === "string") {
                    notification.add(data, { variant: "error" });
                    setTimeout(notification.close, 4000);
                } else if (data.userid) {
                    localStorage.setItem('temp_id', data.userid);
                    localStorage.setItem('temp_role', data.role);
                    naviagtor('/otp-verification');
                } else {
                    naviagtor("/" + role_to_path[data.role]);
                }
            })
            .catch(error => {
                controlLoading(false);
                notification.add("Something went wrong with the server!", { variant: "info" });
                setTimeout(notification.close, 4000);
                console.log(error);
            })
    }
}

export const otpVerification = (otp, notification, navigator, controlLoading) => {
    if (verifyOtp(otp)) {
        const otpString = generateOtpString(otp)
        controlLoading(true);
        fetch(SERVER_URL + "/auth/otp-verification", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ userid: localStorage.getItem("temp_id"), otp: otpString, role: localStorage.getItem("temp_role") })
        })
            .then(response => {
                controlLoading(false);
                if (response.status === 200) {
                    const role = localStorage.getItem('temp_role');
                    localStorage.removeItem('temp_role');
                    localStorage.removeItem('temp_id');
                    console.log(role);
                    navigator("/" + role_to_path[role]);
                } else if (response.status === 500) {
                    notification.add("OTP is expired", { variant: "error" });
                    setTimeout(notification.close, 4000);
                    localStorage.removeItem('temp_role');
                    localStorage.removeItem('temp_id');
                    navigator("/");
                }
                else {
                    return response.json();
                }
            })
            .then(data => {
                if (typeof data === "string") {
                    notification.add("OTP is not correct", { variant: "error" });
                    setTimeout(notification.close, 4000);
                }
            })
            .catch(error => {
                controlLoading(false);
                console.log(error);
                notification.add("Something went wrong with the server!", { variant: "info" });
                setTimeout(notification.close, 4000);
            })
    } else {
        controlLoading(false);
        notification.add("OTP is not set", { variant: "error" });
        setTimeout(notification.close, 4000);
    }
}

export const logout = (navigator, notification) => {
    fetch(SERVER_URL + "/auth/logout", {
        method: "POST",
        credentials: 'include'
    })
        .then(response => {
            if (response.status === 200) {
                notification.add("Logging out", { variant: "info" });
                navigator("/");
            } else {
                notification.add("Something went wrong with the server!", { variant: "info" });
            }
            setTimeout(notification.close, 4000);
        })
        .catch(error => {
            console.log(error);
            notification.add("Something went wrong with the server!", { variant: "info" });
            setTimeout(notification.close, 4000);
        })
}