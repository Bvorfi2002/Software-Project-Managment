import { logout } from "../../../scripts/login-scripts";
const url = "https://localhost:5443/calls/";

export const addReservedCalls = (notification, callDetails, references, handleClose) => {
  fetch(url + "reserved/add-many", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ references, callDetails }),
    credentials: "include",
  })
    .then((response) => {
      if (response.status === 200) {
        notification.add("Created successfully!", { variant: "success" });
        setTimeout(notification.close, 3000);
        handleClose();
      } else if (response.status === 401) {
        notification.add("Session is over!", { variant: "error" });
        setTimeout(notification.close, 3000);
        logout();
      } else {
        notification.add("Server is not responding", { variant: "error" });
        setTimeout(notification.close, 3000);
      }
    })
    .catch((err) => {
      notification.add("Problem with the server!", { variant: "error" });
      setTimeout(notification.close, 3000);
    });
};

export const getRedListCalls = (notification, proceeding)=>{
    fetch(url + "red_list_call/retrieve", {
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

export const addReservedCallsFromRedList = (notification, reserved_date, calls, handleClose) => {
    fetch(url + "reserved/add-from-red-list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ calls, reserved_date }),
      credentials: "include",
    })
      .then((response) => {
        if (response.status === 200) {
          notification.add("Created successfully!", { variant: "success" });
          setTimeout(notification.close, 3000);
          handleClose();
        } else if (response.status === 401) {
          notification.add("Session is over!", { variant: "error" });
          setTimeout(notification.close, 3000);
          logout();
        } else {
          notification.add("Server is not responding", { variant: "error" });
          setTimeout(notification.close, 3000);
        }
      })
      .catch((err) => {
        notification.add("Problem with the server!", { variant: "error" });
        setTimeout(notification.close, 3000);
      });
  };

  export const getAllCalls = (notification, proceeding)=>{
    fetch(url + "finished_call/retrieve", {
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