import React from "react";
import ContentModel from "../../content_model";
import MDBox from "../../../components/MDBox";
import InventoryTable from "../components/InventoryTable";

function InventoryContent(){
    return (
        <ContentModel>
            <MDBox py={3}>
                <InventoryTable />
            </MDBox>
        </ContentModel>
    );
}

export default InventoryContent;