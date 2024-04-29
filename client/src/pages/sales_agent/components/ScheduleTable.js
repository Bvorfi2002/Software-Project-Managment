import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import DataTable from "../../../components/Tables/DataTable";
import ScheduleCellCard from "./ScheduleCellCard";
import DateTableCell from "./DateTableCell";
import { useSnackbar } from "notistack"
import { get_schedule, change_state } from "../scripts/schedule-scripts";
import ChangeSlotStateModal from "./ChangeSlotStateModal";

function ScheduleTable({ agent_id }) {

    const [schedule, setSchedule] = useState([]);
    const [stateOfChoice, setStateOfChoice] = useState({});
    const [open, setOpen] = useState(false);
    const [changed, setChanged] = useState(false);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const notification = { add: enqueueSnackbar, close: closeSnackbar }

    useEffect(() => {
        console.log("Getting schedule")
        get_schedule(notification, (data) => setSchedule(data));
        setChanged(false);
    }, [changed])

    const rows = schedule.map(day => {
        return {
            day: <DateTableCell date={day.date} />,
            time_slot_1: <ScheduleCellCard state={day['time_slot_1']} modalOpen={() => {
                setStateOfChoice({date: day.date, slot: 'time_slot_1', state:day['time_slot_1']})
                setOpen(true)
            }} />,
            time_slot_2: <ScheduleCellCard state={day['time_slot_2']} modalOpen={() => {
                setStateOfChoice({date: day.date, slot: 'time_slot_2', state:day['time_slot_2']})
                setOpen(true)
            }} />,
            time_slot_3: <ScheduleCellCard state={day['time_slot_3']} modalOpen={() => {
                setStateOfChoice({date: day.date, slot: 'time_slot_3', state:day['time_slot_3']})
                setOpen(true)
            }} />,
            time_slot_4: <ScheduleCellCard state={day['time_slot_4']} modalOpen={() => {
                setStateOfChoice({date: day.date, slot: 'time_slot_4', state:day['time_slot_4']})
                setOpen(true)
            }} />,
            time_slot_5: <ScheduleCellCard state={day['time_slot_5']} modalOpen={() => {
                setStateOfChoice({date: day.date, slot: 'time_slot_5', state:day['time_slot_5']})
                setOpen(true)
            }} />,
            time_slot_6: <ScheduleCellCard state={day['time_slot_6']} modalOpen={() => {
                setStateOfChoice({date: day.date, slot: 'time_slot_6', state:day['time_slot_6']})
                setOpen(true)
            }} />,
            time_slot_7: <ScheduleCellCard state={day['time_slot_7']} modalOpen={() => {
                setStateOfChoice({date: day.date, slot: 'time_slot_7', state:day['time_slot_7']})
                setOpen(true)
            }} />,
            time_slot_8: <ScheduleCellCard state={day['time_slot_8']} modalOpen={() => {
                setStateOfChoice({date: day.date, slot: 'time_slot_8', state:day['time_slot_8']})
                setOpen(true)
            }} />,
            time_slot_9: <ScheduleCellCard state={day['time_slot_9']} modalOpen={() => {
                setStateOfChoice({date: day.date, slot: 'time_slot_9', state:day['time_slot_9']})
                setOpen(true)
            }} />,
        }
    });
    const columns = [
        { Header: "day", accessor: 'day', align: 'left' },
        { Header: '8:00-9:30', accessor: 'time_slot_1', align: 'center' },
        { Header: '9:30-11:00', accessor: 'time_slot_2', align: 'center' },
        { Header: '11:00-12:30', accessor: 'time_slot_3', align: 'center' },
        { Header: '12:30-2:00', accessor: 'time_slot_4', align: 'center' },
        { Header: '2:00-3:30', accessor: 'time_slot_5', align: 'center' },
        { Header: '3:30-5:00', accessor: 'time_slot_6', align: 'center' },
        { Header: '5:00-6:30', accessor: 'time_slot_7', align: 'center' },
        { Header: '6:30-8:00', accessor: 'time_slot_8', align: 'center' },
        { Header: '20:00-21:30', accessor: 'time_slot_9', align: 'center' },
    ]

    return (
        <>
            <ChangeSlotStateModal 
            open={open} 
            handleClose={()=>setOpen(false)} 
            currentState={stateOfChoice} 
            changeState={(new_state)=>{
                change_state(notification, ()=>setChanged(true), new_state)
            }}
            />
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
                >
                    <MDTypography variant="h6" color="white">
                        Your schedule
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

export default ScheduleTable;