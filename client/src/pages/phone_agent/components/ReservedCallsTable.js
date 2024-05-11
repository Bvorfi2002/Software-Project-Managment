import React, { useEffect, useState } from "react";
import { Card, Icon } from "@mui/material";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import DataTable from "../../../components/Tables/DataTable";
import MDInput from "../../../components/MDInput";
import MDButton from "../../../components/MDButton";
import CommentsModal from "./CommentsModal";
import {useSnackbar} from "notistack";
import { get_reserved_calls } from "../scripts/call-scripts";
import OutcomeModal from "./OutcomeModal";

function ReservedCallsTable() {

    const [calls, setCalls] = useState([]);
    const [activeCall, setActiveCall] = useState(null);
    const [open, setOpen] = useState(false);
    const [callsUpdated, setCallsUpdated] = useState(false);
    const rows = calls.map(call => {
        return {
            name: (
                <MDBox>
                    <MDTypography fontSize="13pt" fontWeight="bold">
                        {call.name + " " + call.surname}
                    </MDTypography>
                </MDBox>
            ),
            phone: (
                <MDBox>
                    <MDTypography fontSize="8pt" fontWeight="light">
                        {call.phone}
                    </MDTypography>
                </MDBox>
            ),
            date: (
                <MDTypography variant="caption" color="text" fontWeight="medium">
                    {call.date.slice(0, 10)}
                </MDTypography>
            ),
            actions: (
                <MDBox display="flex">
                    <MDButton color="light" style={{ marginRight: "5px" }} onClick={()=>{
                        setActiveCall(call);
                        setOpen(true);
                    }}>
                        <Icon>comment</Icon>
                    </MDButton>
                    <OutcomeModal call={call} dependency={setCallsUpdated} page={'reserved'}/>
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
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const notification = {add: enqueueSnackbar, close: closeSnackbar};

    useEffect(()=>{
        console.log("getting calls");
        get_reserved_calls(notification, setCalls);
        setCallsUpdated(false);
    }, [callsUpdated])

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
                        Reserved calls
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