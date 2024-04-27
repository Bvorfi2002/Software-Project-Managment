import React from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import MDBox from "../MDBox";
import MDTypography from "../MDTypography";
import MDButton from "../MDButton";
import { Icon } from "@mui/material";

function ConfirmationModal({ open, handleClose, confirmationAction }) {

    const style = {
        backgroundColor: "white",
        width: "400px",
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
                            Please confirm
                        </MDTypography>
                    </MDBox>
                    <MDBox
                        width="80%"
                        margin="25px auto 0"
                        display="flex"
                        flexDirection="column"
                        alignItems="center">
                        <p>Do you want to proceed?</p>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "45%"}}>
                            <MDButton color="success" onClick={confirmationAction}>
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

export default ConfirmationModal;