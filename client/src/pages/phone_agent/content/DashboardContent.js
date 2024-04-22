import React from "react";
import PhoneAgentStatisticCard from "../components/PhoneAgentStatisticCard";
import MDBox from "../../../components/MDBox";
import ContentModel from "../../content_model";
import Grid from "@mui/material/Grid";
import CallsGraph from "../components/CallsGraph";

function DashboardContent(){
    return (
        <ContentModel>
            <MDBox py={3}>
                <Grid container justifyContent="center" spacing={6}>
                    <Grid item xs={12} md={6} lg={4}>
                        <PhoneAgentStatisticCard statistic_type="total" />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <PhoneAgentStatisticCard statistic_type="inbound" />
                    </Grid>
                    <Grid item xs={12} md={6} lg={4}>
                        <PhoneAgentStatisticCard statistic_type="outbound" />
                    </Grid>
                </Grid>
                <CallsGraph />
            </MDBox>
        </ContentModel>
    )
}

export default DashboardContent;