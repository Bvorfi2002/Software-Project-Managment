import { logout } from "../../../scripts/login-scripts"
const url = "https://localhost:5443/references/"

export const getReferences = (notification, proceeding)=>{
    fetch(url + "retrieve", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    })
        .then(response => {
            if (response.status === 200) {
                return response.json()
            } else if (response.status === 401) {
                notification.add("Session is over!", { variant: "error" });
                setTimeout(notification.close, 3000);
                logout();
            } else {
                notification.add("Server is not responding", { variant: "error" });
                setTimeout(notification.close, 3000);
            }
        })
        .then(data=>{
            if(data)
                proceeding(data)
        })
        .catch(err => {
            notification.add("Problem with the server!", { variant: "error" });
            setTimeout(notification.close, 3000);
        })
}

export const deleteReference = (notification, refId, dependency)=>{
    fetch(url + "delete", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ref_id: refId }),
        credentials: "include"
    })
        .then(response => {
            if (response.status === 200) {
                notification.add("Deleted successfully!", { variant: "success" });
                setTimeout(notification.close, 3000);
                dependency(true)
            } else if (response.status === 401) {
                notification.add("Session is over!", { variant: "error" });
                setTimeout(notification.close, 3000);
                logout();
            } else {
                return response.text();
            }
        })
        .then(text=>{
            if(text){
                notification.add(text, { variant: "error" });
                setTimeout(notification.close, 3000);
            }
        })
        .catch(err => {
            notification.add("Problem with the server!", { variant: "error" });
            setTimeout(notification.close, 3000);
        })
}

export const editReference = (notification, refId, newInfo, dependency)=>{
    fetch(url + "edit", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ref_id: refId, new_info: newInfo }),
        credentials: "include"
    })
        .then(response => {
            if (response.status === 200) {
                notification.add("Edited successfully!", { variant: "success" });
                setTimeout(notification.close, 3000);
                dependency(true)
            } else if (response.status === 401) {
                notification.add("Session is over!", { variant: "error" });
                setTimeout(notification.close, 3000);
                logout();
            } else {
                notification.add("Server is not responding", { variant: "error" });
                setTimeout(notification.close, 3000);
            }
        })
        .catch(err => {
            console.log(err);
            notification.add("Problem with the server!", { variant: "error" });
            setTimeout(notification.close, 3000);
        })
}