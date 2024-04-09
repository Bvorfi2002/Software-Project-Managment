import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";

const role_to_path = {
    'SalesAgent': 'sales_agent'
}

function SafeRoute(props){

    useEffect(()=>{
        fetch(process.env.SERVER_URL + "/authorization")
        .then(response=>{
            if(response.status === 200){
                return response.json();
            } else {
                navigator('/');
            }
        })
        .then(data=>{
            navigator('/' + role_to_path[data])
        })
    }, [])

    return (
        <div>
            {props.children}
        </div>
    );
}

export default SafeRoute;