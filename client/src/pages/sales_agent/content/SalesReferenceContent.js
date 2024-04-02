import React from "react";
import ContentModel from "../../content_model";
import MDBox from "../../../components/MDBox";
import ReferenceTable from "../components/ReferenceTable";

function SalesReferenceContent(){
    return (
        <ContentModel>
            <MDBox py={3}>
                <ReferenceTable />
            </MDBox>
        </ContentModel>
    );
}

export default SalesReferenceContent;