import React, { useEffect } from "react";
import { styled, css } from "@mui/system";
import { Modal as BaseModal, Icon } from "@mui/material";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import clsx from "clsx";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import DataTable from "../../../components/Tables/DataTable";
import numeral from "numeral";
import { getCommissionsPhoneAgent } from "../scripts/commission-scripts";
import { useSnackbar } from "notistack";

function CommissionDetailsPhone({ agentId, month, year }) {
  const [open, setOpen] = React.useState(false);
  const [commissions, setCommissions] = React.useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const notification = { add: enqueueSnackbar, close: closeSnackbar };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const rows = commissions.map((commision) => {
    return {
      type: (
        <MDBox>
          <MDTypography fontSize="8pt" fontWeight="bold">
            {commision.commission_type}
          </MDTypography>
        </MDBox>
      ),
      amount: (
        <MDBox>
          <MDTypography fontSize="8pt">
            {numeral(commision.amount.$numberDecimal).format(
              Number.isInteger(commision.amount.$numberDecimal) ? "$0,0" : "$0,0.00"
            )}
          </MDTypography>
        </MDBox>
      ),
      date: (
        <MDBox>
          <MDTypography fontSize="8pt">{commision.date.slice(0, 10)}</MDTypography>
        </MDBox>
      ),
    };
  });
  const columns = [
    { Header: "commission type", accessor: "type", align: "left" },
    { Header: "amount", accessor: "amount", align: "center" },
    { Header: "date", accessor: "date", align: "center" },
  ];

  useEffect(() => {
    getCommissionsPhoneAgent(
      notification,
      agentId,
      month,
      year,
      setCommissions
    );
  }, []);

  return (
    <>
      <TriggerButton onClick={handleOpen}>
        <Icon fontSize="large" style={{ marginRight: "5px" }}>
          query_stats
        </Icon>
        Details
      </TriggerButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={style}>
          <h3 className="modal-title">Commission details</h3>
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "whitesmoke",
              borderRadius: "10px",
              padding: "0 10px 0 10px",
              overflow: "scroll"
            }}
          >
            <p style={{fontSize: "8pt"}}>Here is a detailed list of all the commissions gathered by the specified agent</p>
            <MDBox pt={3}>
              <DataTable
                table={{ columns, rows }}
                isSorted={false}
                entriesPerPage={false}
                showTotalEntries={false}
                noEndBorder
              />
            </MDBox>
          </div>
        </ModalContent>
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

export default CommissionDetailsPhone;
