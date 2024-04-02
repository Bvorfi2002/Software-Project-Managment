import React from "react";
import MDButton from "../../../components/MDButton";

const state_to_color = {
    'free': 'success',
    'scheduled': 'warning',
    'meeting': 'secondary'
}

const state_to_text = {
    'free': 'Free',
    'scheduled': 'Scheduled',
    'meeting': 'Meeting'
}

function ScheduleCellCard({state}){
    return (
        <MDButton color={state_to_color[state]}>
            {state_to_text[state]}
        </MDButton>
    );
}

export default ScheduleCellCard;