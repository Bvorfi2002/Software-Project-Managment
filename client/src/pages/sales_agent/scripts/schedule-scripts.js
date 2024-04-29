const url = "https://localhost:5443/schedule/"

export const get_schedule = (notification, proceeding) => {
    fetch(url + "personal_schedule", {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        },
        credentials: "include"
    })
        .then(response => {
            if (response.status === 200) {
                return response.json()
            } else {
                notification.add("Could not retrieve the schedule!", { variant: "error" })
                setTimeout(notification.close, 3000);
            }
        })
        .then(data => {
            if (data) {
                proceeding(data);
            }
        })
        .catch(err => {
            notification.add("Something went wrong with the server!", { variant: "error" })
            setTimeout(notification.close, 3000);
        })
}

export const change_state = (notification, updateDependency, newState) => {
    fetch(url + "edit/change_state", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newState),
        credentials: "include"
    })
        .then(response => {
            if (response.status === 200) {
                notification.add("Schedule changed successfully!", { variant: "success" })
                setTimeout(notification.close, 4000);
                updateDependency();
            } else if (response.status === 403) {
                notification.add("You are not allowed to change that date!", { variant: "error" })
                setTimeout(notification.close, 4000);
            } else {
                notification.add("Server is not responding!", { variant: "error" })
                setTimeout(notification.close, 4000);
            }
        })
        .catch(err => {
            console.log(err);
            notification.add("Server is not responding!", { variant: "error" })
            setTimeout(notification.close, 4000);
        })
}