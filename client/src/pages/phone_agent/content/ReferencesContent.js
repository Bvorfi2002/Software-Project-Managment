import React from "react";
import ContentModel from "../../content_model";
import MDBox from "../../../components/MDBox";
import ReferencesTable from "../components/ReferencesTable";

function ReferencesContent(){
    return (
        <ContentModel>
            <MDBox py={3}>
                <ReferencesTable />
            </MDBox>
        </ContentModel>
    )
}

export default ReferencesContent;