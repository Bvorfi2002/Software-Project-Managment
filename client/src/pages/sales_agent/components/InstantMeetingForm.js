import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { get_schedule } from "../scripts/schedule-scripts";
import { useSnackbar } from "notistack";
import { add_instant_meeting } from "../scripts/meeting-scripts";

const generate_possible_dates = (schedule) => {
    const dates = schedule.filter(day => {
        return Object.values(day).includes('free')
    })
    return dates.map((date, index) => {
        return <MenuItem key={index} value={date.date}>{date.date.slice(0, 10)}</MenuItem>
    })
}

const get_available_time_slots = (date, schedule) => {
    const chosenDate = schedule.filter(day => {
        return new Date(day.date).setHours(0, 0, 0, 0) === new Date(date).setHours(0, 0, 0, 0);
    })
    const freeSchedule = [];
    for (const key in chosenDate[0]) {
        if (chosenDate[0][key] === 'free'){
            freeSchedule.push(key)
        }
    }
    return freeSchedule
}

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

const confirm_if_disabled = (meetingInfo)=>{
    for(const key in meetingInfo){
        if(!meetingInfo[key])
            return true;
    }
    return false;
}

function InstantMeetingForm({ globalDependency }) {

    const initialState = {
        name: '',
        surname: '',
        address: '',
        city: '',
        profession: '',
        phone: '',
        date: '',
        time: ''
    };
    const [meetingInfo, setMeetingInfo] = useState(initialState);
    const handleChange = (propertyName, newValue) => {
        setMeetingInfo(prevState => ({
            ...prevState,
            [propertyName]: newValue,
        }))
    }
    const changeDate = (event) => {
        const newDate = event.target.value;
        const newMeetingInfo = { ...meetingInfo };
        newMeetingInfo['date'] = newDate;
        setMeetingInfo(newMeetingInfo)
        setFreeTimeSlot(get_available_time_slots(newDate, schedule))
    }
    const [schedule, setSchedule] = useState([])
    const [freeTimeSlot, setFreeTimeSlot] = useState([])
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const notification = { add: enqueueSnackbar, close: closeSnackbar }
    const [scheduleUpdated, setScheduleUpdated] = useState(false);
    const fieldStyle = {
        margin: "5px auto"
    }
    const clearForm = ()=>{
        setMeetingInfo(initialState);
    }

    useEffect(() => {
        console.log('getting schedule');
        get_schedule(notification, setSchedule)
        setScheduleUpdated(false);
    }, [scheduleUpdated])

    return (
        <div style={{ width: "95%", height: "90%", overflow: "scroll" }}>
            <TextField style={{ ...fieldStyle }} value={meetingInfo.name} label="Name" variant="outlined" fullWidth onChange={(event) => handleChange('name', event.target.value)} />
            <TextField style={{ ...fieldStyle }} value={meetingInfo.surname} label="Surname" variant="outlined" fullWidth onChange={(event) => handleChange('surname', event.target.value)} />
            <TextField style={{ ...fieldStyle }} value={meetingInfo.address} label="Address" variant="outlined" fullWidth onChange={(event) => handleChange('address', event.target.value)} />
            <TextField style={{ ...fieldStyle }} value={meetingInfo.city} label="City" variant="outlined" fullWidth onChange={(event) => handleChange('city', event.target.value)} />
            <TextField style={{ ...fieldStyle }} value={meetingInfo.phone} label="Phone number" variant="outlined" fullWidth onChange={(event) => handleChange('phone', event.target.value)} />
            <TextField style={{ ...fieldStyle }} value={meetingInfo.profession} label="Profession" variant="outlined" fullWidth onChange={(event) => handleChange('profession', event.target.value)} />
            <FormControl fullWidth style={{margin: "10px 0"}}>
                <InputLabel id="demo-simple-select-filled-label">Date</InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    label="Date"
                    style={{ height: "50px" }}
                    onChange={changeDate}
                    value={meetingInfo.date}
                >
                    {generate_possible_dates(schedule)}
                </Select>
            </FormControl>
            <select value={meetingInfo.time} style={{width: "100%", fontFamily: "Poppins", backgroundColor: "transparent", paddingLeft: "7px", height: "50px", border: "1px solid gainsboro", borderRadius: "7px"}} onChange={
                (event)=>handleChange('time', event.target.value)
            }>
                {
                    freeTimeSlot.map(slot => {
                        return <option value={slot}>{daySchedule[slot]}</option>
                    })
                }
            </select>
            <button disabled={confirm_if_disabled(meetingInfo)} className="confirmButton" onClick={()=>{
                add_instant_meeting(notification, meetingInfo, ()=>{
                    setScheduleUpdated(true);
                    globalDependency(true);
                    clearForm();
                })
            }} style={{margin: "10px 0", backgroundPosition: "10%"}}>Confirm</button>
        </div>
    )
}

export default InstantMeetingForm;