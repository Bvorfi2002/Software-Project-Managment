import React from "react";

import MDBox from "../../../components/MDBox";
import ReportsBarChart from "../../../components/Charts/BarCharts/ReportsBarChart/index";

function MeetingGraph({ agent_id }) {

    const reportsBarChartData = {
        labels: ["M", "T", "W", "T", "F", "S", "S"],
        datasets: { label: "Sales", data: [50, 20, 10, 22, 50, 10, 40] },
    }

    return (
        <MDBox mb={3}>
            <ReportsBarChart
                color="info"
                title="Meetings statistics"
                description="This week's performance"
                date="updated daily"
                chart={reportsBarChartData}
            />
        </MDBox>
    );
}

export default MeetingGraph;