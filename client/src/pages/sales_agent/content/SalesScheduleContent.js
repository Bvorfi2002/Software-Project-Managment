import React from "react";
import ScheduleTable from "../components/ScheduleTable";
import ContentModel from "../../content_model";
import MDBox from "../../../components/MDBox";

function SalesScheduleContent(){
    return (
        <ContentModel>
            <MDBox py={3}>
                <ScheduleTable />
            </MDBox>
        </ContentModel>
    )
}

export default SalesScheduleContent;