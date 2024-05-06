import React, { useState, useEffect } from "react";
import DataTable from "../../../components/Tables/DataTable";
import MDButton from "../../../components/MDButton";
import MDBox from "../../../components/MDBox";
import { Card, Icon } from "@mui/material";
import MDTypography from "../../../components/MDTypography";
import OutcomeCell from "./OutcomeCell";
import MeetingDetailsModal from "./MeetingDetailsModal";
import { get_meetings } from "../scripts/meeting-scripts";
import {useSnackbar} from "notistack"
import AddInstantMeetingModal from "./AddInstantMeetingModal";


function MeetingsTable({ agent_id }) {

    const [meetings, setMeetings] = useState([]);
    const [meetingsUpdated, setMeetingsUpdated] = useState(false);
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
                <MeetingDetailsModal selectedMeeting={meeting} dependency={setMeetingsUpdated}/>
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
    const {enqueueSnackbar, closeSnackbar} = useSnackbar()
    const notification = {add: enqueueSnackbar, close: closeSnackbar}

    useEffect(()=>{
        console.log("getting_meetings");
        get_meetings(notification, (data)=>{setMeetings(data)});
        setMeetingsUpdated(false);
    }, [meetingsUpdated])

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
                    <AddInstantMeetingModal globalDependency={setMeetingsUpdated} />
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