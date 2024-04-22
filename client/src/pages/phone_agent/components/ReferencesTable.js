import React, { useState } from "react";
import DataTable from "../../../components/Tables/DataTable";
import QualifiedCell from "./QualifiedCell";
import MDButton from "../../../components/MDButton";
import MDBox from "../../../components/MDBox";
import { Card, Icon } from "@mui/material";
import MDTypography from "../../../components/MDTypography";
import CommentsModal from "./CommentsModal";

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
        phoneNumber: generateRandomString(10),
        comments: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        qualified: Math.random() < 0.5// Randomly assign qualification status
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

function ReferencesTable({ agent_id }) {

    const [open, setOpen] = useState(false);
    const [references, setReferences] = useState(generateRandomReferences(10));
    const [activeReference, setActiveReference] = useState(null);
    const rows = references.map(reference => {
        return {
            reference: (
                <MDBox>
                    <MDTypography fontSize="8pt" fontWeight="bold">
                        {reference.name + " " + reference.surname}
                    </MDTypography>
                </MDBox>
            ),
            phoneNumber: (
                <MDBox>
                    <MDTypography fontSize="8pt">
                        {reference.phoneNumber}
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
            status: <QualifiedCell status={reference.qualified ? "qualified" : "unqualified"} />,
            actions: (
                <MDBox>
                    <MDButton color="light" style={{marginRight: "5px"}} onClick={()=>{
                        setActiveReference(reference);
                        setOpen(true)
                    }}>
                        <Icon>comment</Icon>
                    </MDButton>
                    <MDButton color="light"  style={{width: "80px", fontSize: "8pt"}}>
                        {"Call outcome"}
                    </MDButton>
                </MDBox>
            ),
        }
    });
    const columns = [
        { Header: "reference", accessor: 'reference', align: 'left' },
        {Header: 'phone number', accessor: 'phoneNumber', align: 'center'},
        { Header: 'address', accessor: 'address', align: 'center' },
        { Header: 'status', accessor: 'status', align: 'center' },
        { Header: 'actions', accessor: 'actions', align: 'center' }
    ]

    return (
        <>
            <CommentsModal reference={activeReference} open={open} handleClose={()=>{
                setOpen(false);
                setActiveReference(null);
            }}/>
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
                        Latest references
                    </MDTypography>
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

export default ReferencesTable;