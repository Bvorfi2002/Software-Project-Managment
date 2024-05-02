import React from "react";
import MDButton from "../../../components/MDButton";
import MDTypography from "../../../components/MDTypography";

const outcome_to_color = {
    'unsuccessful': 'error',
    'successful': 'success',
    'Not Updated': 'warning',
    'canceled': 'secondary'
}

const outcome_to_text = {
    'unsuccessful': 'Unsuccessful',
    'successful': 'Successful',
    'Not Updated': 'Not updated',
    'canceled': 'Canceled'
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