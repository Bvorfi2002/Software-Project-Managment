import { logout } from "../../../scripts/login-scripts"
const url = "https://localhost:5443/calls/"

export const get_reserved_calls = (notification, proceeding) => {
    fetch(url + "reserved_call/agent/retrieve", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    })
        .then(response => {
            if (response.status === 200)
                return response.json();
            else if (response.status === 401) {
                notification.add("Session is over!", { variant: "info" });
                setTimeout(notification.close, 3000);
                logout();
            } else {
                notification.add("Something went wrong with the server!", { variant: "error" });
                setTimeout(notification.close, 3000);
            }
        })
        .then(data => {
            if (data)
                proceeding(data)
        })
        .catch(err => {
            notification.add("Something went wrong with the server!", { variant: "error" });
            setTimeout(notification.close, 3000);
        })
}

export const get_finishded_calls = (notification, proceeding) => {
    fetch(url + "finished_call/agent/retrieve", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    })
        .then(response => {
            if (response.status === 200)
                return response.json();
            else if (response.status === 401) {
                notification.add("Session is over!", { variant: "info" });
                setTimeout(notification.close, 3000);
                logout();
            } else {
                notification.add("Something went wrong with the server!", { variant: "error" });
                setTimeout(notification.close, 3000);
            }
        })
        .then(data => {
            if (data)
                proceeding(data)
        })
        .catch(err => {
            notification.add("Something went wrong with the server!", { variant: "error" });
            setTimeout(notification.close, 3000);
        })
}

export const call_outcome_from_reserved_call = (notification, dependency, information)=>{
    fetch(url + "reserved_call/call_outcome", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(information),
        credentials: "include"
    })
        .then(response => {
            if (response.status === 200){
                notification.add("Updated successfully!", {variant: "success"});
                setTimeout(notification.close, 3000);
                dependency(true);
            }else if (response.status === 401) {
                notification.add("Session is over!", { variant: "info" });
                setTimeout(notification.close, 3000);
                logout();
            } else {
                notification.add("Something went wrong with the server!", { variant: "error" });
                setTimeout(notification.close, 3000);
            }
        })
        .catch(err => {
            notification.add("Something went wrong with the server!", { variant: "error" });
            setTimeout(notification.close, 3000);
        })
        
}

export const reschedule_reserved_call = (notification, dependency, information)=>{
    fetch(url + "reserved_call/reschedule", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(information),
        credentials: "include"
    })
        .then(response => {
            if (response.status === 200){
                notification.add("Updated successfully!", {variant: "success"});
                setTimeout(notification.close, 3000);
                dependency(true);
            }else if (response.status === 401) {
                notification.add("Session is over!", { variant: "info" });
                setTimeout(notification.close, 3000);
                logout();
            } else {
                notification.add("Something went wrong with the server!", { variant: "error" });
                setTimeout(notification.close, 3000);
            }
        })
        .catch(err => {
            notification.add("Something went wrong with the server!", { variant: "error" });
            setTimeout(notification.close, 3000);
        })
        
}

export const meeting_from_reserved_call = (notification, dependency, information)=>{
    fetch(url + "reserved_call/success", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(information),
        credentials: "include"
    })
        .then(response => {
            if (response.status === 200){
                notification.add("Meeting created successfully!", {variant: "success"});
                setTimeout(notification.close, 3000);
                dependency(true);
            }else if (response.status === 401) {
                notification.add("Session is over!", { variant: "info" });
                setTimeout(notification.close, 3000);
                logout();
            } else {
                notification.add("Something went wrong with the server!", { variant: "error" });
                setTimeout(notification.close, 3000);
            }
        })
        .catch(err => {
            notification.add("Something went wrong with the server!", { variant: "error" });
            setTimeout(notification.close, 3000);
        })
        
}

export const call_outcome_from_reference = (notification, dependency, information)=>{
    fetch(url + "reference/outcome", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(information),
        credentials: "include"
    })
        .then(response => {
            if (response.status === 200){
                notification.add("Updated successfully!", {variant: "success"});
                setTimeout(notification.close, 3000);
                dependency(true);
            }else if (response.status === 401) {
                notification.add("Session is over!", { variant: "info" });
                setTimeout(notification.close, 3000);
                logout();
            } else {
                notification.add("Something went wrong with the server!", { variant: "error" });
                setTimeout(notification.close, 3000);
            }
        })
        .catch(err => {
            notification.add("Something went wrong with the server!", { variant: "error" });
            setTimeout(notification.close, 3000);
        })
}

export const meeting_from_reference = (notification, dependency, information)=>{
    fetch(url + "reference/success", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(information),
        credentials: "include"
    })
        .then(response=>{
            if(response.status === 200){
                dependency(true);
                notification.add("Meeting is set!", { variant: "success" });
                setTimeout(notification.close, 3000);
            } else if(response.status === 401){
                notification.add("Session is over", { variant: "info" });
                setTimeout(notification.close, 3000);
            } else {
                notification.add("Problem occurred!", { variant: "error" });
                setTimeout(notification.close, 3000);
            }
        })
        .catch(err=>{
            notification.add("Problem occurred!", { variant: "error" });
            setTimeout(notification.close, 3000);
        })
}

export const reschedule_from_reference = (notification, dependency, information)=>{
    fetch(url + "reference/reschedule", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(information),
        credentials: "include"
    })
        .then(response=>{
            if(response.status === 200){
                dependency(true);
                notification.add("Updated successfully!", { variant: "success" });
                setTimeout(notification.close, 3000);
            } else if(response.status === 401){
                notification.add("Session is over", { variant: "info" });
                setTimeout(notification.close, 3000);
            } else {
                notification.add("Problem occurred!", { variant: "error" });
                setTimeout(notification.close, 3000);
            }
        })
        .catch(err=>{
            notification.add("Problem occurred!", { variant: "error" });
            setTimeout(notification.close, 3000);
        })
}