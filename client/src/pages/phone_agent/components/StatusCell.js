import React from "react";
import MDButton from "../../../components/MDButton";

const status_to_color = {
    'rescheduled': 'warning',
    'successful': 'success',
    'excessive argument': 'error'
}

function StatusCell({status}){
    return (
        <MDButton color={status_to_color[status]} style={{width: "150px"}}>
            {status.toUpperCase()}
        </MDButton>
    );
}

export default StatusCell;