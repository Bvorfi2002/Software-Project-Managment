import React, { useEffect, useState } from "react";
import DataTable from "../../../components/Tables/DataTable";
import MDBox from "../../../components/MDBox";
import { Card, Icon } from "@mui/material";
import MDTypography from "../../../components/MDTypography";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import StatusCell from "./StatusCell";
import { getAllCalls } from "../scripts/call-scripts";
import { useSnackbar } from "notistack";


function PhoneCallsTable({  }) {

    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [references, setReferences] = useState([]);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const notification = { add: enqueueSnackbar, close: closeSnackbar };
    const rows = references.map(reference => {
        console.log(reference)
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
                        {reference.phone}
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
            phone_agent: (
                <MDBox>
                    <MDTypography fontSize="8pt">
                        {reference.agent}
                    </MDTypography>
                </MDBox>
            ),
            outcome: <StatusCell status={reference.outcome}/>
        }
    });
    const columns = [
        { Header: "reference", accessor: 'reference', align: 'left' },
        { Header: 'phone number', accessor: 'phoneNumber', align: 'center' },
        { Header: 'address', accessor: 'address', align: 'center' },
        { Header: 'phone agent', accessor: 'phone_agent', align: 'center'},
        { Header: 'outcome', accessor: 'outcome', align: 'center'}
    ]

    useEffect(()=>{
        getAllCalls(notification, setReferences)
    }, [])

    return (
        <>
            <ConfirmationModal open={confirmationOpen} handleClose={()=>setConfirmationOpen(false)}/>
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
                        Calls
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

export default PhoneCallsTable;