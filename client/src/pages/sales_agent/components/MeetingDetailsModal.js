import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css } from '@mui/system';
import { Modal as BaseModal, Icon } from '@mui/material';
import { Button } from '@mui/material';
import MeetingDetails from './MeetingDetails';
import AddMeetingReferences from './AddMeetingReferences';
import Loading from '../../../components/Loading/loading';
import { logMeeting } from "../scripts/meeting-scripts";
import { useSnackbar } from "notistack";

function MeetingDetailsModal({ selectedMeeting, dependency }) {

    const [open, setOpen] = React.useState(false);
    const [details, setDetails] = React.useState(true);
    const [references, setReferences] = React.useState(false);
    const [sale, setSales] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const triggerLoading = ()=>{
      setLoading(true)
    }
    const stopLoading = ()=>{
      setLoading(false);
    }
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const notification = { add:enqueueSnackbar, close: closeSnackbar }

    return (
        <div>
            <TriggerButton onClick={handleOpen}>
                <Icon color='secondary' fontSize='large' style={{marginRight: "5px"}}>read_more</Icon>
                Details
            </TriggerButton>
            <Modal
                open={open}
                onClose={(references || sale) ? ()=>console.log("Can't close now") : handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                slots={{ backdrop: StyledBackdrop }}
            >
                {loading ? <Loading /> : <ModalContent sx={style}>
                    {
                    details && <MeetingDetails meeting={ selectedMeeting } dependency={(result)=>{
                      triggerLoading();
                      dependency(result)
                      stopLoading();
                      handleClose();
                    }} proceedToSale={()=>{
                      triggerLoading();
                      setDetails(false);
                      logMeeting(notification, ()=>dependency(true), {meetingId: selectedMeeting._id, newOutcome: "Successful"})
                      setSales(true);
                      stopLoading();
                    }} proceedToReferences={()=>{
                      triggerLoading();
                      setDetails(false);
                      logMeeting(notification, ()=>dependency(true), {meetingId: selectedMeeting._id, newOutcome: "Unsuccessful"})
                      setReferences(true);
                      stopLoading();
                    }}/>
                    }    
                    {references && <AddMeetingReferences handleClose={handleClose} startLoading={triggerLoading} stopLoading={stopLoading}/>}               
                </ModalContent>}
            </Modal>
        </div>
    );

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
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    height: 500
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

export default MeetingDetailsModal;