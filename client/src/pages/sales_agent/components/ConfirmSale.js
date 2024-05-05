import React from "react";
import { styled, css } from '@mui/system';
import { Modal as BaseModal, Icon } from '@mui/material';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useSnackbar } from "notistack";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import { TextField } from "@mui/material";
import { confirm_sale } from "../scripts/sales-scripts";
import Loading from "../../../components/Loading/loading";

function ConfirmSale({ ref_id, outClose, discount }) {

    const [open, setOpen] = React.useState(false);
    const [remaining, setRemaining] = React.useState(0);
    const [upFront, setUpFront] = React.useState(1495 - discount);
    const [nrMonths, setNrMonths] = React.useState(6);
    const [loading, setLoading] = React.useState(false);
    const handleOpen = () => {
        setUpFront(1495-discount)
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const notification = { add: enqueueSnackbar, close: closeSnackbar };
    const handleUpFrontChange = (event)=>{
        const inputValue = parseFloat(event.target.value);
        if(!event.target.value){
            setUpFront(0)
            setRemaining(1495 - discount)
        }else if(isNaN(inputValue) || inputValue < 0){
            
        } else if (inputValue > 1495 - discount){
            // setUpFront(1495)
            // setRemaining(0)
        } else {
            setUpFront(inputValue);
            setRemaining(1495 - discount - inputValue);
        }
    }

    return (
        <>
            <TriggerButton onClick={handleOpen}>
                <Icon color='white' fontSize='large' style={{ marginRight: "5px" }}>analytics</Icon>
                Finalize sale
            </TriggerButton>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                slots={{ backdrop: StyledBackdrop }}
            >
                {loading ? <Loading /> :<ModalContent sx={style}>
                    <h3 className="modal-title">
                        Confirm sale
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%", fontSize: "10pt" }}>
                        <TextField
                            id="outlined-number"
                            label="Money upfront"
                            type="text"
                            style={{ margin: "10px auto" }}
                            fullWidth
                            value={upFront}
                            onChange={handleUpFrontChange}
                        />
                        <p style={{marginBottom: "10px"}}>{remaining ? `The remaining amount is: ${remaining}$. Please select the number of months to pay the debt if applicable!` : "Full value has been paid!"}</p>
                        <FormControl fullWidth sx={{ height: "50% !important" }}>
                            <InputLabel id="demo-simple-select-filled-label">Nr of months</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={nrMonths}
                                label="Number of months"
                                onChange={(event) => setNrMonths(event.target.value)}
                                style={{ height: "50px" }}
                                disabled={remaining === 0}
                                onClick={(event)=>{
                                    if(event.target.disabled){
                                        notification.add('There is no remaining amount to be paid!', {variant: "info"})
                                        setTimeout(notification.close, 2000);
                                    }
                                }}
                            >
                                <MenuItem value={3}>Three</MenuItem>
                                <MenuItem value={6}>Six</MenuItem>
                                <MenuItem value={9}>Nine</MenuItem>
                                <MenuItem value={12}>Twelve</MenuItem>
                                <MenuItem value={16}>Fifteen</MenuItem>
                            </Select>
                        </FormControl>
                        <p style={{margin: "10px 0"}}>{remaining ? `Monthly payment will be ${Math.round(remaining / nrMonths)}$` : ''}</p>
                        <button style={{marginTop: "10px", backgroundPosition: "10%"}} className="confirmButton" onClick={()=>{
                            setLoading(true);
                            confirm_sale(ref_id, upFront, remaining, nrMonths);
                            outClose();
                            handleClose();
                        }}>Confirm and print contract</button>
                    </div>
                </ModalContent>}
            </Modal>
        </>
    )
}

const Backdrop = React.forwardRef((props, ref) => {
    const { open, className, ...other } = props;
    return (
        <div
            className={clsx({ 'base-Backdrop-open': open }, className)}
            ref={ref}
            {...other}
        />
    );
});

Backdrop.propTypes = {
    className: PropTypes.string.isRequired,
    open: PropTypes.bool,
};

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

const Modal = styled(BaseModal)`
    position: fixed;
    z-index: 1300;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

const StyledBackdrop = styled(Backdrop)`
    z-index: -1;
    position: fixed;
    inset: 0;
    background-color: rgb(0 0 0 / 0.5);
    -webkit-tap-highlight-color: transparent;
  `;

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
    background: ${theme.palette.mode === 'dark' ? grey[900] : blue[500]};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? 'white' : 'white'};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  
    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : blue[200]};
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

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 340,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
};

const ModalContent = styled('div')(
    ({ theme }) => css`
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 500;
      text-align: start;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow: hidden;
      background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
      border-radius: 8px;
      border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      box-shadow: 0 4px 12px
        ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
      padding: 24px;
      color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};
  
      & .modal-title {
        margin: 0 auto;
        line-height: 1.5rem;
        margin-bottom: 8px;
        width: 100%;
        border-bottom: 1px solid gainsboro;
        height: 40px;
      }
  
      & .modal-description {
        margin: 0;
        line-height: 1.5rem;
        font-weight: 400;
        color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
        margin-bottom: 4px;
      }
    `,
);

export default ConfirmSale;