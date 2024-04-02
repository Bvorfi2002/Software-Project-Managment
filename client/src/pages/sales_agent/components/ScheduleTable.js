import React, { useState } from "react";
import Card from "@mui/material/Card";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import DataTable from "../../../components/Tables/DataTable";
import ScheduleCellCard from "./ScheduleCellCard";
import DateTableCell from "./DateTableCell";

//This simulates the request which returns the schedule of the agent
function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function create_schedule(){
    const today = new Date();
    const elementsArray = [];
    for (let i = 0; i < 7; i++) {
        const currentDate = addDays(today, i);
        const element = {
            time_slot_1: 'free',
            time_slot_2: 'free',
            time_slot_3: 'free',
            time_slot_4: 'meeting',
            time_slot_5: 'meeting',
            time_slot_6: 'meeting',
            time_slot_7: 'scheduled',
            time_slot_8: 'scheduled',
            time_slot_9: 'scheduled',
            date: currentDate
        };
        elementsArray.push(element);
    }
    return elementsArray;
}

function ScheduleTable({ agent_id }) {

    const [schedule, setSchedule] = useState(create_schedule());
    const rows = schedule.map(day=>{return {
        day: <DateTableCell date={day.date} />,
        time_slot_1: <ScheduleCellCard state={day['time_slot_1']} />,
        time_slot_2: <ScheduleCellCard state={day['time_slot_2']} />,
        time_slot_3: <ScheduleCellCard state={day['time_slot_3']} />,
        time_slot_4: <ScheduleCellCard state={day['time_slot_4']} />,
        time_slot_5: <ScheduleCellCard state={day['time_slot_5']} />,
        time_slot_6: <ScheduleCellCard state={day['time_slot_6']} />,
        time_slot_7: <ScheduleCellCard state={day['time_slot_7']} />,
        time_slot_8: <ScheduleCellCard state={day['time_slot_8']} />,
        time_slot_9: <ScheduleCellCard state={day['time_slot_9']} />,
    }});
    const columns = [
        {Header: "day", accessor: 'day', align: 'left'},
        {Header: '8:00-9:30', accessor:'time_slot_1', align:'center'},
        {Header: '9:30-11:00', accessor:'time_slot_2', align:'center'},
        {Header: '11:00-12:30', accessor:'time_slot_3', align:'center'},
        {Header: '12:30-2:00', accessor:'time_slot_4', align:'center'},
        {Header: '2:00-3:30', accessor:'time_slot_5', align:'center'},
        {Header: '3:30-5:00', accessor:'time_slot_6', align:'center'},
        {Header: '5:00-6:30', accessor:'time_slot_7', align:'center'},
        {Header: '6:30-8:00', accessor:'time_slot_8', align:'center'},
        {Header: '20:00-21:30', accessor:'time_slot_9', align:'center'},
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
    )
}

export default ScheduleTable;