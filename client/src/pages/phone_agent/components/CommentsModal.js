import React from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";

function CommentsModal({ reference, open, handleClose }) {

    const style = {
        backgroundColor: "white",
        width: "600px",
        height: "400px",
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
                            Comments by sale's agent
                        </MDTypography>
                    </MDBox>
                    <div style={{
                        fontSize: "13pt", 
                        margin: "10px 15px 0", 
                        overflow: "scroll",
                        border: "1px solid black",
                        borderRadius: '10px',
                        paddingLeft: "5px"
                    }}>
                        <p>
                            {reference ? reference.comments : "No reference"}
                        </p>
                    </div>
                </Box>
            </Fade>
        </Modal>
    )
}

export default CommentsModal;