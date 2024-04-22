import React from "react";
import MDButton from "../../../components/MDButton";

const status_to_color = {
    'qualified': 'success',
    'unqualified': 'warning'
}

function QualifiedCell({status}){
    return (
        <MDButton color={status_to_color[status]}  style={{width: "150px"}}>
            {status}
        </MDButton>
    );
}

export default QualifiedCell;