import React from "react";
import ContentModel from "../../content_model";
import MDBox from "../../../components/MDBox";
import CommissionTable from "../components/CommissionTable";

function CommissionContent(){
    return (
        <ContentModel>
            <MDBox py={3}>
                <CommissionTable />
            </MDBox>
        </ContentModel>
    );
}

export default CommissionContent;