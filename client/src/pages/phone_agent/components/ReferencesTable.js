import React, { useEffect, useState } from "react";
import DataTable from "../../../components/Tables/DataTable";
import QualifiedCell from "./QualifiedCell";
import MDButton from "../../../components/MDButton";
import MDBox from "../../../components/MDBox";
import { Card, Icon } from "@mui/material";
import MDTypography from "../../../components/MDTypography";
import CommentsModal from "./CommentsModal";
import { get_recent_references } from "../scripts/references-scripts";
import { useSnackbar } from "notistack"
import OutcomeModal from "./OutcomeModal";

function ReferencesTable({ agent_id }) {

    const [open, setOpen] = useState(false);
    const [references, setReferences] = useState([]);
    const [refUpdated, setRefUpdated] = useState(false);
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
            actions: (
                <MDBox display="flex">
                    <MDButton color="light" style={{marginRight: "5px"}} onClick={()=>{
                        setActiveReference(reference);
                        setOpen(true)
                    }}>
                        <Icon>comment</Icon>
                    </MDButton>
                    <OutcomeModal dependency={setRefUpdated} reference={reference} page={'reference'}/>
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
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const notification = {add: enqueueSnackbar, close: closeSnackbar}

    useEffect(()=>{
        console.log("getting recent references")
        get_recent_references(notification, setReferences);
        setRefUpdated(false);
    }, [refUpdated])

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