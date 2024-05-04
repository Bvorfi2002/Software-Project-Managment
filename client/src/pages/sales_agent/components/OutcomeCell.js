import React from "react";
import MDButton from "../../../components/MDButton";
import MDTypography from "../../../components/MDTypography";

const outcome_to_color = {
    'Unsuccessful': 'error',
    'Successful': 'success',
    'Not Updated': 'warning',
    'Agent Cancellation': 'secondary'
}

const outcome_to_text = {
    'Unsuccessful': 'Unsuccessful',
    'Successful': 'Successful',
    'Not Updated': 'Not updated',
    'Agent Cancellation': 'Canceled'
}

function OutcomeCell({outcome}){
    return (
        <MDButton color={outcome_to_color[outcome]}>
            <MDTypography color="white" fontSize='10pt' fontWeight="bold">
                {outcome_to_text[outcome]}
            </MDTypography>
        </MDButton>
    );
}

export default OutcomeCell;