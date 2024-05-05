import React, { useEffect, useState } from "react";
import DataTable from "../../../components/Tables/DataTable";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import { styled, css } from '@mui/system';
import { Button } from "@mui/material";
import { Icon } from "@mui/material";
import AddReferenceModal from "./AddReferenceModal";
import { updateFailedMeetingCommission } from "../scripts/commission-script";

function AddMeetingReferences( { handleClose, startLoading, stopLoading }){

    const [references, setReferences] = useState([]);
    const [openForm, setOpenForm] = useState(false);

    const rows = references.map(reference => {
        return {
            name: (
                <MDBox>
                    <MDTypography fontSize="8pt" fontWeight="bold">
                        {reference.name + " " + reference.surname}
                    </MDTypography>
                </MDBox>
            ),
            phone: (
                <MDBox>
                    <MDTypography fontSize="8pt">
                        {reference.phone}
                    </MDTypography>
                </MDBox>
            )
        }
    });
    const columns = [
        { Header: "name", accessor: 'name', align: 'left' },
        { Header: 'phone', accessor: 'phone', align: 'center' }
    ]

    const style = {
        borderTop: "1px solid gainsboro",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "right",
        height: '55px'
    };

    return (
        <>
            <h2 id="parent-modal-title" className="modal-title">
                Add references
            </h2>
            <div style={{height: 380}}>
                <p>
                    Tough luck, huh? It's okay! Make the outcome of this meeting better
                    by adding some references to your name.
                </p>
                <DataTable
                    table={{ columns, rows }}
                    isSorted={false}
                    entriesPerPage={false}
                    showTotalEntries={false}
                    noEndBorder
                />
            </div>
            <div style={{...style}}>
                <> 
                    <AddReferenceModal open={openForm} handleClose={()=>setOpenForm(false)} showReference={(newReference)=>{
                        references.push(newReference);
                        setReferences(references);
                    }}/>
                    <TriggerButton onClick={()=>setOpenForm(true)}>
                        <Icon color='primary' fontSize='large' style={{ marginRight: "5px" }}>library_add</Icon>
                        Add reference
                    </TriggerButton>
                    <TriggerButton onClick={()=>{
                        if(references.length > 0){
                            startLoading()
                            updateFailedMeetingCommission(references.length);
                            stopLoading()
                        }
                        handleClose()
                    }}>
                        <Icon color='white' fontSize='large' style={{ marginRight: "5px" }}>assignment_turned_in</Icon>
                        Finish meeting
                    </TriggerButton>
                </>
            </div>
        </>
    );
}

const TriggerButton = styled(Button)(
    ({ theme }) => `
    font-family: 'Poppins', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    margin-right: 5px;
    background: ${theme.palette.mode === 'dark' ? grey[900] : 'light'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[600]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  
    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }
  
    &:active {
      background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
    }
  
    &:focus-visible {
      box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
      outline: none;
    }
  `,
);

const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

export default AddMeetingReferences;