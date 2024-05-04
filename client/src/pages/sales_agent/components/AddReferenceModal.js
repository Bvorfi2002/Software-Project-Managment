import React from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import AddReferenceForm from "./AddReferenceForm";

function AddReferenceModal({open, handleClose, showReference}){

    const style = {
        backgroundColor: "white",
        width: "600px",
        height: "500px",
        margin: "auto auto",
        borderRadius: "10px"
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
                            Add new reference
                        </MDTypography>
                    </MDBox>
                    <AddReferenceForm showReference={showReference}/>
                </Box>
            </Fade>
        </Modal>
    )
}

export default AddReferenceModal;