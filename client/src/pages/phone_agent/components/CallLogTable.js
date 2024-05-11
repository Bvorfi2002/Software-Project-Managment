import React, { useEffect, useState } from "react";
import { Card } from "@mui/material";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import DataTable from "../../../components/Tables/DataTable";
import StatusCell from "../components/StatusCell";
import MDInput from "../../../components/MDInput";
import { get_finishded_calls } from "../scripts/call-scripts";
import { useSnackbar } from "notistack";

function CallLogTable() {

    const [calls, setCalls] = useState([]);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const notification = {add: enqueueSnackbar, close: closeSnackbar};
    const rows = calls.map(call => {
        return {
            name: (
                <MDBox>
                    <MDTypography fontSize="13pt" fontWeight="bold">
                        {call.name + " " + call.surname}
                    </MDTypography>
                </MDBox>
            ),
            status: (
                <StatusCell status={call.outcome} />
            ),
            date: (
                <MDTypography variant="caption" color="text" fontWeight="medium">
                    {call.date.slice(0, 10)}
                </MDTypography>
            )
        }
    });
    const columns = [
        { Header: "Name", accessor: 'name', align: 'left' },
        { Header: 'Call status', accessor: 'status', align: 'center' },
        { Header: 'Call date', accessor: 'date', align: 'center' },
    ]

    useEffect(()=>{
        console.log("Getting calls");
        get_finishded_calls(notification, setCalls);
    }, [])

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