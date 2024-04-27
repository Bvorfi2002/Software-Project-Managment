import React from "react";
import ContentModel from "../../content_model";
import RedListTable from "../components/RedListTable";
import MDBox from "../../../components/MDBox";

function RedListContent(){
    return (
        <ContentModel>
            <MDBox py={3}>
                <RedListTable />
            </MDBox>
        </ContentModel>
    );
}

export default RedListContent;