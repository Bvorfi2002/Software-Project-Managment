import React from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import MDButton from "../../../components/MDButton";
import { Icon } from "@mui/material";


const change_state_prompt = {
    "free": "Are you sure you want to schedule that time slot?",
    "scheduled": "Are you sure you want to remove that time slot from your schedule?"
}

const new_state = {
    "free": "scheduled",
    "scheduled": "free"
}

function ChangeSlotStateModal({ open, handleClose, currentState, changeState }) {

    const style = {
        backgroundColor: "white",
        width: "600px",
        height: "200px",
        margin: "auto auto",
        borderRadius: "10px",
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            style={{ display: "flex", alignItems: "center" }}
        >
            <Fade in={open}>
                <Box style={{ ...style }}>
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
                            Changing the schedule
                        </MDTypography>
                    </MDBox>
                    <MDBox
                        width="80%"
                        margin="25px auto 0"
                        display="flex"
                        flexDirection="column"
                        alignItems="center">
                        <p>{change_state_prompt[currentState.state]}</p>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "30%", marginTop: "10px" }}>
                            <MDButton color="success" onClick={()=>changeState({
                                date: currentState.date,
                                slot: currentState.slot,
                                new_state: new_state[currentState.state]
                            })}>
                                <Icon>check</Icon>
                            </MDButton>
                            <MDButton color="error" onClick={handleClose}>
                                <Icon>cancel</Icon>
                            </MDButton>
                        </div>
                    </MDBox>
                </Box>
            </Fade>
        </Modal>
    )
}

export default ChangeSlotStateModal;