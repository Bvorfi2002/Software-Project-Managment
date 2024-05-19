import React from "react";
import ContentModel from "../../content_model";
import MDBox from "../../../components/MDBox";
import SalesTable from "../components/SalesTable";

function SalesContent(){
    return (
        <ContentModel>
            <MDBox py={3}>
                <SalesTable />
            </MDBox>
        </ContentModel>
    );
}

export default SalesContent;