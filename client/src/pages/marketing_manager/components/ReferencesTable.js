import React, { useEffect, useState } from "react";
import DataTable from "../../../components/Tables/DataTable";
import QualifiedCell from "./QualifiedCell";
import MDButton from "../../../components/MDButton";
import MDBox from "../../../components/MDBox";
import { Card, Icon } from "@mui/material";
import MDTypography from "../../../components/MDTypography";
import EditReferenceModal from "./EditReferenceModal";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import Checkbox from '@mui/material/Checkbox';
import { getReferences } from "../scripts/reference-scripts";
import { useSnackbar } from "notistack"
import { deleteReference } from "../scripts/reference-scripts";
import ReserveCallModal from "./ReserveCallModal";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function ReferencesTable({ agent_id }) {

    const [open, setOpen] = useState(false);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [references, setReferences] = useState([]);
    const [referencesUpdated, setReferencesUpdated] = useState(false);
    const [activeReference, setActiveReference] = useState(null);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [chosenReferences, setChosenReferences] = useState([]);
    const notification = { add: enqueueSnackbar, close: closeSnackbar }
    const rows = references.map(reference => {
        return {
            checkbox: (
                <MDBox maxWidth="30px">
                  <Checkbox {...label} disabled={reference.scheduled} onChange={(event)=>{
                    if(reference.scheduled)
                            return;
                    if(event.target.checked){
                        const array = [...chosenReferences, reference._id]
                        setChosenReferences(array);
                    } else {
                        const array = chosenReferences.filter(item => item !== reference._id);
                        setChosenReferences(array);
                    }
                  }}/>
                </MDBox>
              ),
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
            status: <QualifiedCell status={reference.qualified ? "qualified" : "unqualified"} />,
            contact_status: (
                <>
                    {reference.called ? <Icon color="success" fontSize="15pt">how_to_reg</Icon> : <Icon color="error" fontSize="15pt">close</Icon>}
                </>
            ),
            scheduled: <MDTypography>{reference.scheduled ? "YES" : "NO"}</MDTypography>,
            actions: (
                <MDBox>
                    <MDButton color="light" style={{ marginRight: "5px" }} onClick={() => {
                        setActiveReference(reference);
                        setOpen(true);
                    }}>
                        <Icon>edit</Icon>
                    </MDButton>
                </MDBox>
            ),
        }
    });
    const columns = [
        { Header: "", accessor: "checkbox", align: "left", width: "10px"},
        { Header: "reference", accessor: 'reference', align: 'left' },
        { Header: 'phone number', accessor: 'phoneNumber', align: 'center' },
        { Header: 'address', accessor: 'address', align: 'center' },
        { Header: 'status', accessor: 'status', align: 'center' },
        { Header: 'contact status', accessor: 'contact_status', align: 'center' },
        { Header: 'scheduled for call', accessor: 'scheduled', align: 'center' },
        { Header: 'actions', accessor: 'actions', align: 'center' }
    ]

    useEffect(()=>{
        getReferences(notification, setReferences);
        setReferencesUpdated(false);
    }, [referencesUpdated])

    return (
        <>
            <EditReferenceModal reference={activeReference} open={open} handleClose={() => {
                setOpen(false);
                setActiveReference(null);
            }} dependency={setReferencesUpdated}/>
            <ConfirmationModal open={confirmationOpen} handleClose={()=>{setActiveReference(null); setConfirmationOpen(false)}} confirmationAction={()=>{
                deleteReference(notification, activeReference._id, (booleanValue) => {
                    setReferencesUpdated(booleanValue);
                    setActiveReference(null);
                    setConfirmationOpen(false)
                });
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
                        References
                    </MDTypography>
                    <ReserveCallModal chosenReferences={chosenReferences}></ReserveCallModal>
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