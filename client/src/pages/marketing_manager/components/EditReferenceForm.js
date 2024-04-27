import React, { useState } from "react";
import MDBox from "../../../components/MDBox";
import MDInput from "../../../components/MDInput";
import { Icon } from "@mui/material";
import MDTypography from "../../../components/MDTypography";
import "../styles/input.css";

const disabled = (referenceInfo, reference) => {

    if(referenceInfo === null || reference === null)
        return true;
    
    return (
        referenceInfo.name === reference.name &&
        referenceInfo.surname === reference.surname &&
        referenceInfo.address === reference.address &&
        referenceInfo.city === reference.city &&
        referenceInfo.comments === reference.comments &&
        reference.profession === referenceInfo.profession &&
        referenceInfo.referralName === reference.referralName &&
        referenceInfo.phone === reference.phone
    )
}

function EditReferenceForm({ reference }) {

    const [referenceInfo, setReferenceInfo] = useState(reference !== null ? { ...reference } : {})
    const handleChange = (propertyName, newValue) => {
        const newInfo = { ...referenceInfo };
        newInfo[propertyName] = newValue;
        setReferenceInfo(newInfo);
    }

    return (
        <div style={{ padding: "10px 0 0 15px", overflow: "scroll", maxHeight: "90%" }}>
            <MDBox>
                <MDTypography variant="h6" color="black">
                    General information
                </MDTypography>
                <MDBox>
                    <div className="coolinput">
                        <label htmlFor="nameInput" className="text">Name:</label>
                        <input
                            type="text"
                            placeholder="Write here..."
                            name="nameInput"
                            className="input"
                            value={referenceInfo.name}
                            onChange={(event) => handleChange("name", event.target.value)}
                        />
                    </div>
                    <div className="coolinput">
                        <label htmlFor="surnameInput" className="text">Surname:</label>
                        <input 
                        type="text" 
                        placeholder="Write here..." 
                        name="surnameInput" 
                        className="input" 
                        value={referenceInfo.surname} 
                        onChange={(event) => handleChange("surname", event.target.value)}
                        />
                    </div>
                    <div className="coolinput">
                        <label htmlFor="preferredInput" className="text">Preferred name:</label>
                        <input 
                        type="text" 
                        placeholder="Write here..." 
                        name="preferredInput" 
                        className="input" 
                        value={referenceInfo.referralName} 
                        onChange={(event) => handleChange("referralName", event.target.value)}
                        />
                    </div>
                    <div className="coolinput">
                        <label htmlFor="proffessionInput" className="text">Profession:</label>
                        <input 
                        type="text" 
                        placeholder="Write here..." 
                        name="proffessionInput" 
                        className="input" 
                        value={referenceInfo.profession} 
                        onChange={(event) => handleChange("profession", event.target.value)}
                        />
                    </div>
                </MDBox>
                <MDTypography variant="h6" color="black">
                    Contact information
                </MDTypography>
                <MDBox>
                    <div className="coolinput">
                        <label htmlFor="phoneInput" className="text">Phone number:</label>
                        <input 
                        type="text" 
                        placeholder="Write here..." 
                        name="phoneInput" 
                        className="input" 
                        value={referenceInfo.phone} 
                        onChange={(event) => handleChange("phone", event.target.value)}
                        />
                    </div>
                    <div className="coolinput">
                        <label htmlFor="cityInput" className="text">City:</label>
                        <input 
                        type="text" 
                        placeholder="Write here..." 
                        name="cityInput" 
                        className="input" 
                        value={referenceInfo.city} 
                        onChange={(event) => handleChange("city", event.target.value)}
                        />
                    </div>
                    <div className="coolinput">
                        <label htmlFor="addressInput" className="text">Address:</label>
                        <input 
                        type="text" 
                        placeholder="Write here..." 
                        name="addressInput" 
                        className="input" 
                        value={referenceInfo.address} 
                        onChange={(event) => handleChange("address", event.target.value)}
                        />
                    </div>
                </MDBox>
                <MDTypography variant="h6" color="black">
                    Comments
                </MDTypography>
                <MDBox>
                    <div className="coolinput">
                        <label htmlFor="commentInput" className="text">Comments:</label>
                        <textarea 
                        placeholder="Write here..." 
                        name="commentInput" 
                        className="commentInput input" 
                        value={referenceInfo.comments} 
                        onChange={(event) => handleChange("comments", event.target.value)}
                        />
                    </div>
                </MDBox>
            </MDBox>
            <button className="confirmButton" disabled={disabled(referenceInfo, reference)}>Confirm</button>
        </div>
    );
}

export default EditReferenceForm;