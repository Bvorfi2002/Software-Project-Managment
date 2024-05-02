const url = "https://localhost:5443/references/"

const validateReference = (referenceInfo)=>{
    return (referenceInfo['name'] && referenceInfo['surname'] && referenceInfo['city'] && referenceInfo['address'] && referenceInfo['profession'] && referenceInfo['phone']);
}

export const add_reference = (notification, newReference, successEvent)=>{
    if(validateReference(newReference)){
        fetch(url + "add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(newReference)
        }) 
            .then(response=>{
                if(response.status === 200){
                    successEvent();
                    notification.add("Added successfully", {variant: "success"});
                    setTimeout(notification.close, 4000);
                } else if(response.status === 403){
                    notification.add("Reference already exists with this form number!", {variant: "error"})
                    setTimeout(notification.close, 4000);
                }
            })
            .catch(error=>{
                notification.add("Problem with server!", {variant: "error"})
                setTimeout(notification.close, 4000);
                console.log(error);
            })
    } else {
        notification.add("Missing information!", {variant: "error"})
        setTimeout(notification.close, 4000);
    }
}