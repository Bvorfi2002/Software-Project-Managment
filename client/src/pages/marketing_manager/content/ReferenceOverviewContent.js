import React from "react";
import ContentModel from "../../content_model";
import ReferencesTable from "../components/ReferencesTable";
import MDBox from "../../../components/MDBox";

function ReferenceOverviewContent(){
    return (
        <ContentModel>
            <MDBox py={3}>
                <ReferencesTable />
            </MDBox>
        </ContentModel>
    );
}

export default ReferenceOverviewContent;