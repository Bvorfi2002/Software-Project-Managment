import React from "react";
import ContentModel from "../../content_model";
import MDBox from "../../../components/MDBox";
import ReservedCallsTable from "../components/ReservedCallsTable";

function ReservedCallContent(){

    return (
        <ContentModel>
            <MDBox py={3}>
                <ReservedCallsTable />
            </MDBox>
        </ContentModel>
    )
}

export default ReservedCallContent;