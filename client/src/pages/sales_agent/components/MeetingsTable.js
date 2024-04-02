import React, { useState } from "react";
import DataTable from "../../../components/Tables/DataTable";
import MDButton from "../../../components/MDButton";
import MDBox from "../../../components/MDBox";
import { Card, Icon } from "@mui/material";
import MDTypography from "../../../components/MDTypography";
import OutcomeCell from "./OutcomeCell";

//This section simulates the requests
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Function to generate a random reference
function generateRandomReference() {
    return {
        name: generateRandomString(8),
        surname: generateRandomString(8),
        phone: "+3556yxxxxxxx",
        address: generateRandomString(10),
        city: generateRandomString(6),
        meeting_outcome: 'not_updated'
    };
}

// Function to generate an array of random references
function generateRandomReferences(numReferences) {
    const references = [];
    for (let i = 0; i < numReferences; i++) {
        references.push(generateRandomReference());
    }
    return references;
}

function MeetingsTable({ agent_id }) {

    const [meetings, setMeetings] = useState(generateRandomReferences(10));
    const rows = meetings.map(meeting => {
        return {
            name: (
                <MDBox>
                    <MDTypography fontSize="8pt" fontWeight="bold">
                        {meeting.name + " " + meeting.surname}
                    </MDTypography>
                </MDBox>
            ),
            phone: (
                <MDBox>
                    <MDTypography fontSize="8pt">
                        {meeting.phone}
                    </MDTypography>
                </MDBox>
            ),
            address: (
                <MDBox>
                    <MDTypography fontSize="8pt">
                        {meeting.address + ", " + meeting.city}
                    </MDTypography>
                </MDBox>
            ),
            outcome: <OutcomeCell outcome={meeting.meeting_outcome} />,
            actions: (
                <MDButton color="light">
                    {"View details"}
                </MDButton>
            ),
        }
    });
    const columns = [
        { Header: "name", accessor: 'name', align: 'left' },
        { Header: 'phone', accessor: 'phone', align: 'center' },
        { Header: 'address', accessor: 'address', align: 'center' },
        { Header: 'outcome', accessor: 'outcome', align: 'center' },
        { Header: 'actions', accessor: 'actions', align: 'center' }
    ]

    return (
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
                    Your Meetings
                </MDTypography>
                <MDBox display='flex' justifyContent="space-between" width="35%">
                    <MDButton color="light">
                        <Icon color="dark">tune</Icon>
                        {"Filter"}
                    </MDButton>
                    <MDButton color="light">
                        {"Add instant meeting"}
                    </MDButton>
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
    );
}

export default MeetingsTable;