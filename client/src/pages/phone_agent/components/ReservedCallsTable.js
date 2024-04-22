import React, { useState } from "react";
import { Card, Icon } from "@mui/material";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import DataTable from "../../../components/Tables/DataTable";
import MDInput from "../../../components/MDInput";
import MDButton from "../../../components/MDButton";
import CommentsModal from "./CommentsModal";

function getRandomStatus() {
    const statuses = ["failed", "re-scheduled", "successful"];
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
}

function generateRandomCalls() {
    const calls = [];

    for (let i = 0; i < 50; i++) {
        const call = {
            referenceName: "John",
            referenceSurname: "Doe",
            referencePhoneNumber: "+3556XXXXXXXX",
            comments: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
            date: new Date()
        };
        calls.push(call);
    }
    return calls;
}

function ReservedCallsTable() {

    const [calls, setCalls] = useState(generateRandomCalls());
    const [activeCall, setActiveCall] = useState(null);
    const [open, setOpen] = useState(false);
    const rows = calls.map(call => {
        return {
            name: (
                <MDBox>
                    <MDTypography fontSize="13pt" fontWeight="bold">
                        {call.referenceName + " " + call.referenceSurname}
                    </MDTypography>
                </MDBox>
            ),
            phone: (
                <MDBox>
                    <MDTypography fontSize="8pt" fontWeight="light">
                        {call.referencePhoneNumber}
                    </MDTypography>
                </MDBox>
            ),
            date: (
                <MDTypography variant="caption" color="text" fontWeight="medium">
                    {call.date.toDateString()}
                </MDTypography>
            ),
            actions: (
                <MDBox>
                    <MDButton color="light" style={{ marginRight: "5px" }} onClick={()=>{
                        setActiveCall(call);
                        setOpen(true);
                    }}>
                        <Icon>comment</Icon>
                    </MDButton>
                    <MDButton color="light" style={{ width: "80px", fontSize: "8pt" }}>
                        {"Call outcome"}
                    </MDButton>
                </MDBox>
            ),
        }
    });
    const columns = [
        { Header: "Name", accessor: 'name', align: 'left' },
        { Header: 'Phone number', accessor: 'phone', align: 'center' },
        { Header: 'Call date', accessor: 'date', align: 'center' },
        { Header: 'actions', accessor: 'actions', align: 'center' }
    ]

    return (
        <>
            <CommentsModal reference={activeCall} open={open} handleClose={() => {
                setOpen(false);
                setActiveCall(null);
            }} />
            <Card>
                <MDBox
                    mx={2}
                    mt={-3}
                    py={3}
                    px={2}
                    variant="gradient"
                    bgColor="info"
                    borderRadius="lg"
                    coloredShadow="info"
                    display="flex"
                    justifyContent="space-between"
                >
                    <MDTypography variant="h6" color="white">
                        Call log
                    </MDTypography>
                    <MDBox pr={1}>
                        <MDInput label="Find call" nonTransparent={true} />
                    </MDBox>
                </MDBox>
                <MDBox pt={3}>
                    <DataTable
                        table={{ columns, rows }}
                        isSorted={false}
                        entriesPerPage={false}
                        showTotalEntries={false}
                        noEndBorder
                    />
                </MDBox>
            </Card>
        </>
    )
}

export default ReservedCallsTable;