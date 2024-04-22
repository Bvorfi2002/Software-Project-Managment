import React from "react";
import ContentModel from "../../content_model";
import CallLogTable from "../components/CallLogTable"
import MDBox from "../../../components/MDBox";

function CallLogContent(){

    return (
        <ContentModel>
            <MDBox py={3}>
                <CallLogTable />
            </MDBox>
        </ContentModel>
    )
}

export default CallLogContent;