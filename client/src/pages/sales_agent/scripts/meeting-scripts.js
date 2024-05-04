
const url = "https://localhost:5443/meeting/"

export const get_meetings = (notification, proceeding)=>{
    fetch(url + "sales_agent/meetings", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
    })
        .then(response=>{
            if(response.status === 200){
                return response.json()
            } else {
                notification.add("Something went wrong with the server!", {variant: "error"});
                setTimeout(notification.close, 4000);
            }
        })
        .then(data=>{
            console.log(data);
            if(data)
                proceeding(data);
        })
        .catch(error=>{
            console.log(error);
            notification.add("Something went wrong with the server!", {variant: "error"});
            setTimeout(notification.close, 4000);
        })
}

export const logMeeting = (notification, proceeding, newInfo)=>{
    fetch(url + "/cancel_meeting", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({...newInfo}),
        credentials: "include"
    })
        .then(response=>{
            if(response.status === 200){
                notification.add("Meeting logged successfully!", { variant: "success" });
                setTimeout(notification.close, 4000)
                proceeding();
            } else {
                return response.json();
            }
        })
        .then(message=>{
            if(message){
                notification.add(message, { variant: "error" });
                setTimeout(notification.close, 4000)
            }
        })
        .catch(err=>{
            console.log(err);
            notification.add("Server is not responding", { variant: "error" });
            setTimeout(notification.close, 4000)
        })
}