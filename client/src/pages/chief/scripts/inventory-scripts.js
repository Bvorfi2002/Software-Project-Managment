import { logout } from "../../../scripts/login-scripts";
const url = "https://localhost:5443/inventory/";

export const getAllItems = (notification, navigator, proceeding)=>{
    fetch(url + "getItems", {
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
                logout(navigator, notification);
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

export const deleteItem = (notification, navigator, itemId)=>{
    fetch(url + "deleteItem", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ itemId }),
        credentials: "include"
    })
        .then(response => {
            if (response.status === 200) {
                notification.add("Deleted successfully!", { variant: "success" });
                setTimeout(notification.close, 3000);
            } else if (response.status === 401) {
                notification.add("Session is over!", { variant: "error" });
                setTimeout(notification.close, 3000);
                logout(navigator, notification);
            } else if(response.status === 400){
                return response.json();
            } 
            else {
                notification.add("Server is not responding", { variant: "error" });
                setTimeout(notification.close, 3000);
            }
        })
        .then(data=>{
            if(data){
                notification.add(data, { variant: "error" });
                setTimeout(notification.close, 3000);
            }
        })
        .catch(err => {
            notification.add("Problem with the server!", { variant: "error" });
            setTimeout(notification.close, 3000);
        })
}

export const editItem = (notification, navigator, itemId, newInfo, dependency)=>{
    fetch(url + "editItem", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ itemId, newInfo }),
        credentials: "include"
    })
        .then(response => {
            if (response.status === 200) {
                notification.add("Edited successfully!", { variant: "success" });
                setTimeout(notification.close, 3000);
                dependency(true);
            } else if (response.status === 401) {
                notification.add("Session is over!", { variant: "error" });
                setTimeout(notification.close, 3000);
                logout(navigator, notification);
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

export const addItem = (notification, navigator, item, dependency)=>{
    fetch(url + "addItem", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({item}),
        credentials: "include"
    })
        .then(response => {
            if (response.status === 200) {
                notification.add("Added successfully!", { variant: "success" });
                setTimeout(notification.close, 3000);
                dependency(true);
            } else if (response.status === 401) {
                notification.add("Session is over!", { variant: "error" });
                setTimeout(notification.close, 3000);
                logout(navigator, notification);
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

export const addQuantity = (notification, navigator, itemId, quantity, dependency)=>{
    fetch(url + "addQuantity", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({itemId, quantity}),
        credentials: "include"
    })
        .then(response => {
            if (response.status === 200) {
                notification.add("Quantity added successfully!", { variant: "success" });
                setTimeout(notification.close, 3000);
                dependency(true);
            } else if (response.status === 401) {
                notification.add("Session is over!", { variant: "error" });
                setTimeout(notification.close, 3000);
                logout(navigator, notification);
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