import { logout } from "../../../scripts/login-scripts"
const url = "https://localhost:5443/references/"

export const get_recent_references = (notification, proceeding)=>{
    fetch(url + "/latest_references", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    })
        .then(response=>{
            if(response.status === 200)
                return response.json();
            else if (response.status === 401){
                notification.add("Session is over!", {variant: "info"});
                setTimeout(notification.close, 3000);
                logout();
            } else{
                notification.add("Something went wrong with the server!", {variant: "error"});
                setTimeout(notification.close, 3000);
            }
        })
        .then(data=>{
            if(data)
                proceeding(data)
        })
        .catch(err=>{
            notification.add("Something went wrong with the server!", {variant: "error"});
            setTimeout(notification.close, 3000);
        })
}