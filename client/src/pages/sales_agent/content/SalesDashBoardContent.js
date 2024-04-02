import React from "react";
import Grid from "@mui/material/Grid";
import SalesAgentStatisticCard from "../components/SalesAgentStatisticCard";
import ContentModel from "../../content_model";
import MDBox from "../../../components/MDBox";
import MeetingGraph from "../components/MeetingGraph";
import ScheduleGraph from "../components/ScheduleGraph";

function SalesDashBoardContent() {
    return (
        <ContentModel>
            <MDBox py={3}>
                <Grid container justifyContent="center" spacing={6}>
                    <Grid item xs={12} md={6} lg={4}>
                        <SalesAgentStatisticCard statistic_type="schedule_stat" />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <SalesAgentStatisticCard statistic_type="meeting_stat" />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <SalesAgentStatisticCard statistic_type="reference_stat" />
                    </Grid>
                </Grid>
                <Grid container marginTop="10px" justifyContent="center" spacing={3}>
                    <Grid item xs={12} md={6} lg={5}>
                        <ScheduleGraph />
                    </Grid>
                    <Grid item xs={12} md={6} lg={5}>
                        <MeetingGraph />
                    </Grid>
                </Grid>
            </MDBox>
        </ContentModel>
    )
}

export default SalesDashBoardContent;