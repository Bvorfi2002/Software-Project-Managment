const url = "https://localhost:5443/schedule/"

export const get_sales_agents = (date, time, proceeding)=>{
    fetch(url + "sales_agents_by_slot", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({date: date, time: time}),
        credentials: "include"
    })
        .then(response=>{
            if(response.status === 200)
                return response.json();
        })
        .then(data=>{
            if(data)
                proceeding(data);
        })
}