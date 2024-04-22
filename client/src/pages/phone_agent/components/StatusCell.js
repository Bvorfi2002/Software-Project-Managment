import React from "react";
import MDButton from "../../../components/MDButton";

const status_to_color = {
    're-scheduled': 'warning',
    'successful': 'success',
    'failed': 'error'
}

function StatusCell({status}){
    return (
        <MDButton color={status_to_color[status]} style={{width: "150px"}}>
            {status.toUpperCase()}
        </MDButton>
    );
}

export default StatusCell;