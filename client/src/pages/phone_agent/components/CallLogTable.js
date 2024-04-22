import React, { useState } from "react";
import { Card } from "@mui/material";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import DataTable from "../../../components/Tables/DataTable";
import StatusCell from "../components/StatusCell";
import MDInput from "../../../components/MDInput";

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
            status: getRandomStatus(),
            date: new Date()
        };
        calls.push(call);
    }
    return calls;
}

function CallLogTable() {

    const [calls, setCalls] = useState(generateRandomCalls());
    const rows = calls.map(call => {
        return {
            name: (
                <MDBox>
                    <MDTypography fontSize="13pt" fontWeight="bold">
                        {call.referenceName + " " + call.referenceSurname}
                    </MDTypography>
                </MDBox>
            ),
            status: (
                <StatusCell status={call.status} />
            ),
            date: (
                <MDTypography variant="caption" color="text" fontWeight="medium">
                    {call.date.toDateString()}
                </MDTypography>
            )
        }
    });
    const columns = [
        { Header: "Name", accessor: 'name', align: 'left' },
        { Header: 'Call status', accessor: 'status', align: 'center' },
        { Header: 'Call date', accessor: 'date', align: 'center' },
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
                    Call log
                </MDTypography>
                <MDBox pr={1}>
                    <MDInput label="Find call" nonTransparent={true}/>
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
    )
}

export default CallLogTable;