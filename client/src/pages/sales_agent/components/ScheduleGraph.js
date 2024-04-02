import React from "react";

import MDBox from "../../../components/MDBox";
import ReportsLineChart from "../../../components/Charts/LineCharts/ReportsLineChart/index.js";

function ScheduleGraph({ agent_id }) {

    const sales = {
        labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: { label: "Mobile apps", data: [50, 40, 300, 320, 500, 350, 200, 230, 500] },
    }

    return (
        <MDBox mb={3}>
            <ReportsLineChart
                color="success"
                title="Schedule numbers"
                description={
                    <>
                        (<strong>+15%</strong>) more meetings this month.
                    </>
                }
                date="updated daily"
                chart={sales}
            />
        </MDBox>
    )
}

export default ScheduleGraph;