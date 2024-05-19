const SERVER_URL = "https://localhost:5443"

const role_to_path = {
    'SalesAgent': 'sales_agent',
    'phone_agent': 'phone_agent',
    'marketing_manager': 'marketing_manager',
    'chief': 'chief'
}

export const authorize = (navigator)=>{
    fetch(SERVER_URL + "/auth/authorization", {
        credentials: "include"
    })
    .then(response=>{
        if(response.status === 200){
            return response.json();
        } else {
            navigator('/');
        }
    })
    .then(data=>{
        if(data){
            console.log(data);
            if(!window.location.pathname.includes(role_to_path[data]))
                navigator('/' + role_to_path[data] + '/dashboard')
        } else {
            console.log("No data")
        }
    })
}