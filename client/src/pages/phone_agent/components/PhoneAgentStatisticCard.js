import React from "react";
import MDBox from "../../../components/MDBox";
import ComplexStatisticsCard from "../../../components/Cards/StatisticsCards/ComplexStatisticsCard";

const type_to_color = {
    'total': 'success',
    'inbound': 'info',
    'outbound': 'primary'
}

const type_to_icon = {
    'total': 'phone_in_talk',
    'inbound': 'phone_callback',
    'outbound': 'phone_forwarded'
}

const type_to_title = {
    'total': 'Total calls',
    'inbound': 'Inbound calls',
    'outbound': 'Outbound calls'
}

function PhoneAgentStatisticCard({agent_id, statistic_type}){
    return (
        <MDBox mb={1.5}>
            <ComplexStatisticsCard
                color = {type_to_color[statistic_type]}
                icon= {type_to_icon[statistic_type]}
                title= {type_to_title[statistic_type]}
                count={281}
                percentage={{
                    color: "success",
                    amount: "+55%",
                    label: "than lask week",
                }}
            />
        </MDBox>
    )
}

export default PhoneAgentStatisticCard;