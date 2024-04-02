import React from "react";
import ContentModel from "../../content_model";
import MDBox from "../../../components/MDBox";
import MeetingsTable from "../components/MeetingsTable";

function SalesMeetingContent(){
    return (
        <ContentModel>
            <MDBox py={3}>
                <MeetingsTable />
            </MDBox>
        </ContentModel>
    );
}

export default SalesMeetingContent;