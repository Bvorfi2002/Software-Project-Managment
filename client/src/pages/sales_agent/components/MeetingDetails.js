import React from "react";
import CancelMeeting from "./CancelMeeting";
import UpdateMeeting from "./UpdateMeeting";

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

function MeetingDetails({ meeting, dependency, proceedToSale, proceedToReferences }){

    const style = {
        borderTop: "1px solid gainsboro",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "right",
        height: '55px'
    };

    const infoDivStyle = {
        margin: "5px auto",
        fontSize: "12pt"
    }

    return (
        <>
            <h2 id="parent-modal-title" className="modal-title">
                Meeting details
            </h2>
            <div style={{height: 380, display: "flex"}}>
                <div style={{width: "40%"}}>
                    <div style={{...infoDivStyle}}>
                        <p style={{fontWeight: "bold"}}>Full name:</p>
                        <p>{meeting.name + " " + meeting.surname}</p>
                    </div>
                    <div style={{...infoDivStyle}}>
                        <p style={{fontWeight: "bold"}}>Address:</p>
                        <p>{meeting.address + ", " + meeting.city}</p>
                    </div>
                    <div style={{...infoDivStyle}}>
                        <p style={{fontWeight: "bold"}}>Phone number:</p>
                        <p>{meeting.phone}</p>
                    </div>
                    <div style={{...infoDivStyle}}>
                        <p style={{fontWeight: "bold"}}>Profession:</p>
                        <p>{meeting.profession}</p>
                    </div>
                    <div style={{...infoDivStyle}}>
                        <p style={{fontWeight: "bold"}}>Meeting date:</p>
                        <p>{meeting.date.toString().slice(0, 10)}</p>
                    </div>
                    <div style={{...infoDivStyle}}>
                        <p style={{fontWeight: "bold"}}>Meeting Time:</p>
                        <p>{daySchedule[meeting.time]}</p>
                    </div>
                </div>
                <div style={{width: "60%"}}>
                    <p style={{fontWeight: "bold"}}>Comments</p>
                    <div style={{overflow: "scroll", fontSize: "11pt", height: "90%", width: "100%"}}>
                        <p>{meeting.comments ? meeting.comments : "No comments made on this client"}</p>
                    </div>
                </div>
            </div>
            {
                meeting.meeting_outcome === "Not Updated" ? 
                <div style={{...style}}>
                    <> 
                        <CancelMeeting meeting={meeting} proceeding={()=>dependency(true)}/>
                        <UpdateMeeting meeting={meeting} proceedToSale={proceedToSale} proceedToReferences={proceedToReferences}/>
                    </>
                </div> : <></>
            }
        </>
    );
}

export default MeetingDetails;