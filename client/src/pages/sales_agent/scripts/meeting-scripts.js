import { logout } from "../../../scripts/login-scripts"
const url = "https://localhost:5443/meeting/"


export const get_meetings = (notification, proceeding) => {
    fetch(url + "sales_agent/meetings", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    })
        .then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                notification.add("Something went wrong with the server!", { variant: "error" });
                setTimeout(notification.close, 4000);
            }
        })
        .then(data => {
            console.log(data);
            if (data)
                proceeding(data);
        })
        .catch(error => {
            console.log(error);
            notification.add("Something went wrong with the server!", { variant: "error" });
            setTimeout(notification.close, 4000);
        })
}

export const logMeeting = (notification, proceeding, newInfo) => {
    fetch(url + "/cancel_meeting", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...newInfo }),
        credentials: "include"
    })
        .then(response => {
            if (response.status === 200) {
                notification.add("Meeting logged successfully!", { variant: "success" });
                setTimeout(notification.close, 4000)
                proceeding();
            } else {
                return response.json();
            }
        })
        .then(message => {
            if (message) {
                notification.add(message, { variant: "error" });
                setTimeout(notification.close, 4000)
            }
        })
        .catch(err => {
            console.log(err);
            notification.add("Server is not responding", { variant: "error" });
            setTimeout(notification.close, 4000)
        })
}

const validateMeeting = (meetingInfo, notification) => {
    for (const key in meetingInfo) {
        if (!meetingInfo[key]) {
            notification.add("The information is incomplete!", { variant: "error" });
            setTimeout(notification.close, 3000);
            return false;
        }
    }
    return true;
}

export const add_instant_meeting = (notification, meetingInfo, updateDependency) => {
    if (validateMeeting(meetingInfo, notification)) {
        fetch(url + "add_instant_meeting", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({meetingInfo: meetingInfo}),
            credentials: "include"
        })
            .then(response => {
                if (response.status === 200) {
                    notification.add("New meeting created successfully!", { variant: "success" });
                    setTimeout(notification.close, 3000);
                    updateDependency()
                } else if (response.status === 401) {
                    notification.add("Session is over!", { variant: "error" });
                    setTimeout(notification.close, 3000);
                    logout();
                } else {
                    console.log(response.message);
                    notification.add("The information is incorrect!", { variant: "error" });
                    setTimeout(notification.close, 3000);
                }
            })
            .catch(err => {
                notification.add("Problem with the server!", { variant: "error" });
                setTimeout(notification.close, 3000);
            })
    }
}