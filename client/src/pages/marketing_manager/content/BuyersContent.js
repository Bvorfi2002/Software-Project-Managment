import React from "react";
import ContentModel from "../../content_model";
import MDBox from "../../../components/MDBox";
import BuyerTable from "../components/BuyerTable";

function BuyersContent(){
    return (
        <ContentModel>
            <MDBox py={3}>
                <BuyerTable />
            </MDBox>
        </ContentModel>
    );
}

export default BuyersContent;