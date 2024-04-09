import React, { useEffect } from "react";
import {useNavigate} from "react-router-dom";
import {authorize} from '../../scripts/authorization-script.js';

function SafeRoute(props){

    const navigator = useNavigate();

    useEffect(()=>{
        authorize(navigator);
    }, [])

    return (
        <div>
            {props.children}
        </div>
    );
}

export default SafeRoute;