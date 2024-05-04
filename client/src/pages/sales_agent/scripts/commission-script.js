const url = "https://localhost:5443/commission/"

export const updateFailedMeetingCommission = (refCount)=>{
    fetch(url + "failed_meeting_commission", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ refCount: refCount }),
        credentials: "include"
    })
        .then(response=>{
            if(response.status !== 200)
                alert("Something went terribly wrong")
        })
        .catch(err=>{
            alert("Something went terribly wrong")
        })
}