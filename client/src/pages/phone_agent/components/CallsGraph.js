import React from "react";
import MDBox from "../../../components/MDBox";
import ReportsBarChart from "../../../components/Charts/BarCharts/ReportsBarChart";


function CallsGraph({agent_id}){

    const reportsBarChartData = {
        labels: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
        datasets: { label: "Calls", data: [80, 20, 10, 22, 50, 10, 40] },
    }

    return (
        <MDBox mb={3} marginTop="40px">
            <ReportsBarChart
                color="info"
                title="Weekly calls"
                description="This week's performance"
                date="updated daily"
                chart={reportsBarChartData}
            />
        </MDBox>
    );
}

export default CallsGraph;