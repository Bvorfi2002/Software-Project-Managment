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