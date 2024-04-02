import React from "react";

import MDBox from "../../../components/MDBox";
import ComplexStatisticsCard from "../../../components/Cards/StatisticsCards/ComplexStatisticsCard"

const type_to_icon = {
    'meeting_stat': 'groups',
    'reference_stat': 'link',
    'schedule_stat': 'calendar_month'
}

const type_to_color = {
    'meeting_stat': 'info',
    'reference_stat': 'primary',
    'schedule_stat': 'success'
}

const type_to_title = {
    'meeting_stat': 'Meetings',
    'reference_stat': 'References',
    'schedule_stat': 'Schedule'
}

function SalesAgentStatisticCard({agent_id, statistic_type}) {
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

export default SalesAgentStatisticCard;