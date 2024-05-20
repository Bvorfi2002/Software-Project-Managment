import React from "react";
import ContentModel from "../../content_model";
import MDBox from "../../../components/MDBox";
import DebtTable from "../components/DebtTable";

function DebtContent(){
    return (
        <ContentModel>
            <MDBox py={3}>
                <DebtTable />
            </MDBox>
        </ContentModel>
    );
}

export default DebtContent;