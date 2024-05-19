import { logout } from "../../../scripts/login-scripts";
const url = "https://localhost:5443/sales/";


export const getAllSales = (notification, proceeding)=>{
    fetch(url + "/retrieve", {
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

export const confirmSale = (notification, salesId, dependency)=>{
    fetch(url + "/confirm", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ saleId: salesId })
    })
        .then(response => {
            if (response.status === 200) {
                notification.add("Confirmed successfully");
                dependency(true);
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
            notification.add("Problem with the server!", { variant: "error" });
            setTimeout(notification.close, 3000);
        })
}