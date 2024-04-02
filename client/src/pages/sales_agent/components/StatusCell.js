import React from "react";
import MDButton from "../../../components/MDButton";

const status_to_color = {
    'qualified': 'success',
    'unqualified': 'warning'
}

function StatusCell({status}){
    return (
        <MDButton color={status_to_color[status]}>
            {status}
        </MDButton>
    );
}

export default StatusCell;