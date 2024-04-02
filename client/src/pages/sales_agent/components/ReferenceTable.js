import React, { useState } from "react";
import DataTable from "../../../components/Tables/DataTable";
import StatusCell from "./StatusCell";
import MDButton from "../../../components/MDButton";
import MDBox from "../../../components/MDBox";
import { Card } from "@mui/material";
import MDTypography from "../../../components/MDTypography";


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
        address: generateRandomString(10),
        city: generateRandomString(6),
        qualified:  Math.random() < 0.5// Randomly assign qualification status
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

function ReferenceTable({ agent_id }) {

    const [references, setReferences] = useState(generateRandomReferences(10));
    const rows = references.map(reference => {
        return {
            reference: (
                <MDBox>
                    <MDTypography fontSize="8pt" fontWeight="bold">
                        {reference.name + " " + reference.surname}
                    </MDTypography>
                </MDBox>
            ),
            address: (
                <MDBox>
                    <MDTypography fontSize="8pt">
                        {reference.address + ", " + reference.city}
                    </MDTypography>
                </MDBox>
            ),
            status: <StatusCell status={reference.qualified ? "qualified" : "unqualified"}/>,
            actions: (
                <MDButton color="light">
                    {"View details"}
                </MDButton>
            ),
        }
    });
    const columns = [
        { Header: "reference", accessor: 'reference', align: 'left' },
        { Header: 'address', accessor: 'address', align: 'center' },
        { Header: 'status', accessor: 'status', align: 'center' },
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
                    Your references
                </MDTypography>
                <MDButton color="light">
                    {"Add more"}
                </MDButton>
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

export default ReferenceTable;