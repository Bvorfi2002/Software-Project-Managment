import React, { useEffect } from "react";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { styled, css } from "@mui/system";
import { Modal as BaseModal, Icon } from "@mui/material";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import clsx from "clsx";
import { useSnackbar } from "notistack";
import Loading from "../../../components/Loading/loading";
import { getPhoneAgents } from "../scripts/agent-scripts";
import { addReservedCalls } from "../scripts/call-scripts";
import utc from "dayjs/plugin/utc";
import MDButton from "../../../components/MDButton";
dayjs.extend(utc);

function ReserveCallModal({ chosenReferences }) {
  const [agents, setAgents] = React.useState([]);
  const [selectedAgent, setSelectedAgent] = React.useState(null);
  const [date, setDate] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const confirmationAction = (outcome) => {
    handleClose();
  };
  const handleDateChange = (newValue) => {
    setDate(newValue);
  };
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const notification = { add: enqueueSnackbar, close: closeSnackbar };

  useEffect(() => {
    getPhoneAgents(notification, setAgents);
  }, []);

  return (
    <>
      <TriggerButton
        onClick={handleOpen}
        disabled={chosenReferences.length === 0}
      >
        <Icon fontSize="large" style={{ marginRight: "5px" }}>
          playlist_add
        </Icon>
        Reserve call
      </TriggerButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        slots={{ backdrop: StyledBackdrop }}
      >
        {!loading ? (
          <ModalContent sx={style}>
            <h3 className="modal-title">Reserve a call</h3>
            <div
              style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div style={{ width: "100%", margin: "10px 0" }}>
                  <DatePicker
                    label="Call date"
                    value={date}
                    minDate={dayjs()}
                    onChange={handleDateChange}
                  />
                </div>
              </LocalizationProvider>
              <FormControl
                style={{ marginTop: "10px", height: "50px", width: "100%", marginBottom:"20px" }}
              >
                <InputLabel id="demo-simple-select-label">Agent</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedAgent}
                  label="Age"
                  onChange={(event) => setSelectedAgent(event.target.value)}
                  style={{ height: "45px" }}
                >
                  <MenuItem value={null}></MenuItem>
                  {agents.map((agent) => (
                    <MenuItem value={agent._id}>
                      {agent.name + " " + agent.surname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <MDButton color="info" onClick={()=>{
                if(selectedAgent && date){
                    addReservedCalls(notification, { p_ag_id: selectedAgent, reserved_date: date }, chosenReferences, handleClose);
                } else {
                    notification.add('You must select a date and an agent', { variant: "error" })
                }
              }}>
                <Icon color="white">check</Icon>Confirm action
              </MDButton>
            </div>
          </ModalContent>
        ) : (
          <Loading />
        )}
      </Modal>
    </>
  );
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ "base-Backdrop-open": open }, className)}
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
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
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
      width: 200px;
      cursor: pointer;
      background: ${theme.palette.mode === "dark" ? grey[900] : "light"};
      border: 1px solid ${
        theme.palette.mode === "dark" ? grey[700] : grey[200]
      };
      box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    
      &:hover {
        background: ${theme.palette.mode === "dark" ? grey[800] : grey[50]};
        border-color: ${theme.palette.mode === "dark" ? grey[600] : grey[300]};
      }
    
      &:active {
        background: ${theme.palette.mode === "dark" ? grey[700] : grey[100]};
      }
    
      &:focus-visible {
        box-shadow: 0 0 0 4px ${
          theme.palette.mode === "dark" ? blue[300] : blue[200]
        };
        outline: none;
      }
    `
);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 270,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const ModalContent = styled("div")(
  ({ theme }) => css`
    font-family: "IBM Plex Sans", sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow: hidden;
    background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === "dark" ? "rgb(0 0 0 / 0.5)" : "rgb(0 0 0 / 0.2)"};
    padding: 24px;
    color: ${theme.palette.mode === "dark" ? grey[50] : grey[900]};

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
      color: ${theme.palette.mode === "dark" ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);

export default ReserveCallModal;
