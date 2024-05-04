import React, { useState } from "react";
import { TextField } from "@mui/material";
import MDBox from "../../../components/MDBox";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import "../assets/modal.css"
import { add_reference } from "../scripts/reference-scripts";
import { useSnackbar } from "notistack";

const findDisabled = (referenceInfo)=>{
    return !(referenceInfo['name'] && referenceInfo['surname'] && referenceInfo['city'] && referenceInfo['address'] && referenceInfo['profession'] && referenceInfo['phone']);
}

function AddReferenceForm({ showReference }){
    const initialState = {
        name: '',
        surname: '',
        referralName: '',
        address: '',
        city: '',
        profession: '',
        phone: '',
        comments: '',
        qualified: false,
      };
    const [referenceInfo, setReferenceInfo] = useState(initialState)
    const handleChange = (propertyName, newValue)=>{
        setReferenceInfo(prevState => ({
            ...prevState,
            [propertyName]: newValue,
        }))
    }
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const notification = {add: enqueueSnackbar, close: closeSnackbar};
    const clearForm = ()=>{
        setReferenceInfo(initialState);
    }

    return (
        <div style={{ 
            display: "flex",
            flexDirection: "column",
            alignItems: "center", 
            overflow: "scroll",
            maxHeight: "90%", 
            width:"90%",
            margin: "0 auto",
            color: "black"
        }} className="modal-div"
        >
            <MDBox marginBottom="10px">
                <TextField fullWidth label="Name" variant="outlined" value={referenceInfo.name} margin="normal" onChange={(event)=>handleChange("name", event.target.value)}/>
                <TextField fullWidth label="Surname" variant="outlined" value={referenceInfo.surname} margin="normal" onChange={(event)=>handleChange("surname", event.target.value)}/>
                <TextField fullWidth label="Preferred name" variant="outlined" value={referenceInfo.referralName} margin="normal" onChange={(event)=>handleChange("referralName", event.target.value)}/>
                <TextField fullWidth label="Address" variant="outlined" value={referenceInfo.address} margin="normal" onChange={(event)=>handleChange("address", event.target.value)}/>
                <TextField fullWidth label="City" variant="outlined" value={referenceInfo.city} margin="normal" onChange={(event)=>handleChange("city", event.target.value)}/>
                <TextField fullWidth label="Profession" variant="outlined" value={referenceInfo.profession} margin="normal" onChange={(event)=>handleChange("profession", event.target.value)}/>
                <TextField fullWidth label="Phone number" variant="outlined" value={referenceInfo.phone} margin="normal" onChange={(event)=>handleChange("phone", event.target.value)}/>
                <textarea style={{
                    height: "200px",
                    width: "100%",
                    resize: 'none',
                    outline: "none",
                    border: "1px solid gainsboro",
                    borderRadius: "5px",
                    padding: "5px 0 0 10px",
                    margin: "5px auto"
                }} placeholder="Comments" value={referenceInfo.comments} onChange={(event)=>handleChange('comments', event.target.value)}/>
                <FormControlLabel style={{marginLeft: "10px"}} control={<Checkbox  checked={referenceInfo.qualified} onChange={(event)=>handleChange("qualified", event.target.checked)}/>} label="Check if reference is qualified!" />
            </MDBox>
            <button className="confirmButton" disabled={findDisabled(referenceInfo)} onClick={()=>{
                add_reference(notification, referenceInfo, showReference ? ()=>{
                    showReference(referenceInfo);
                    clearForm();
                } : clearForm);
            }}>Confirm</button>
        </div>
    );
}

export default AddReferenceForm;