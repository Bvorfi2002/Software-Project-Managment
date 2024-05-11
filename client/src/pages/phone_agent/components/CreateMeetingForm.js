import React, { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { get_sales_agents } from "../scripts/agent-scripts";
import { meeting_from_reserved_call, meeting_from_reference } from "../scripts/call-scripts"; 
import { useSnackbar } from "notistack";
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const daySchedule = {
    time_slot_1: "8:00-9:30",
    time_slot_2: "9:30-11:00",
    time_slot_3: "11:00-12:30",
    time_slot_4: "12:30-2:00",
    time_slot_5: "2:00-3:30",
    time_slot_6: "3:30-5:00",
    time_slot_7: "5:00-6:30",
    time_slot_8: "6:30-8:00",
    time_slot_9: "8:00-9:30",
}

const timeSlots = ['time_slot_1', 'time_slot_2', 'time_slot_3', 'time_slot_4', 'time_slot_5', 'time_slot_6', 'time_slot_7', 'time_slot_8', 'time_slot_9']

function CreateMeetingForm({ call, dependency, page, reference }) {

    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [selectedAgent, setSelectedAgent] = useState('');
    const [agents, setAgents] = useState([]);
    const [optionAgents, setOptionAgents] = useState(false);
    const handleTimeChange = (event)=>{
        setTime(event.target.value);
        if(time && date){
            setOptionAgents(true)
        }
    }
    const handleDateChange = (newValue)=>{
        console.log(newValue)
        setDate(newValue);
        if(time && date){
            setOptionAgents(true)
        }
    }
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const notification = {add: enqueueSnackbar, close: closeSnackbar}

    useEffect(()=>{
        if(optionAgents)
            get_sales_agents(date.utc().toDate(), time, setAgents);
        setOptionAgents(false)
    }, [optionAgents]);

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div style={{width: "100%", margin: "10px 0"}}>
                    <DatePicker
                        label="Meeting date"
                        value={date}
                        minDate={dayjs('2024-04-09')}
                        maxDate={dayjs('2024-04-09').add(6, 'day')}
                        onChange={handleDateChange}
                    />
                </div>
            </LocalizationProvider>
            <select onChange={handleTimeChange} style={{width: "100%", fontFamily: "Poppins", backgroundColor: "transparent", paddingLeft: "7px", height: "50px", border: "1px solid gainsboro", borderRadius: "7px"}}>
                <option value={''}></option>
                {
                    timeSlots.map(slot => {
                        return <option value={slot}>{daySchedule[slot]}</option>
                    })
                }
            </select>
            <select disabled={!date || !time} onChange={(event)=>setSelectedAgent(event.target.value)} style={{width: "100%", marginTop: "10px", fontFamily: "Poppins", backgroundColor: "transparent", paddingLeft: "7px", height: "50px", border: "1px solid gainsboro", borderRadius: "7px"}}>
                <option value={''}></option>
                {
                    agents.map(agent=>{
                        return <option key={agent._id} value={agent._id}>{agent.name + " " + agent.surname}</option>
                    })
                }
            </select>
            <button disabled={!time || !date || !selectedAgent} style={{margin:"10px 0", backgroundPosition: '10%'}} className="confirmButton" onClick={()=>{
                if(page === 'reserved')
                    meeting_from_reserved_call(notification, dependency, {call_id: call._id, s_ag_id: selectedAgent, date: date.utc().toDate(), time: time})
                else 
                    meeting_from_reference(notification, dependency, { reference_id: reference._id, s_ag_id: selectedAgent, date: date.utc().toDate(), time: time });
            }}>Confirm</button>
        </div>
    );
}

export default CreateMeetingForm;