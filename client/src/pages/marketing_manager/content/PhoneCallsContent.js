import React from "react";
import ContentModel from "../../content_model";
import MDBox from "../../../components/MDBox";
import PhoneCallsTable from "../components/PhoneCallsTable";

function PhoneCallsContent(){
    return (
        <ContentModel>
            <MDBox py={3}>
                <PhoneCallsTable />
            </MDBox>
        </ContentModel>
    );
}

export default PhoneCallsContent;