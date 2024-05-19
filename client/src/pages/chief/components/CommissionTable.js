import React, { useEffect, useState } from "react";
import DataTable from "../../../components/Tables/DataTable";
import MDBox from "../../../components/MDBox";
import MDButton from "../../../components/MDButton";
import { Card, Icon } from "@mui/material";
import MDTypography from "../../../components/MDTypography";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import { getAllSales, confirmSale } from "../scripts/sales-scripts";
import { getMonthlyCommissions } from "../scripts/commission-scripts";
import { useSnackbar } from "notistack";
import numeral from "numeral";
import CommissionDetailsPhone from "./CommissionDetailsPhone";
import CommissionDetailsSales from "./CommissionDetailsSales";

function CommissionTable() {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [commisions, setCommissions] = useState([]);
  const [month, setMonth] = useState((new Date()).getMonth());
  const [year, setYear] = useState((new Date()).getFullYear());
  const [commissionUpdated, setCommissionUpdated] = useState(false);
  const [selectedCommission, setSelectedCommission] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const notification = { add: enqueueSnackbar, close: closeSnackbar };
  const rows = commisions.map((commision) => {
    return {
      agent: (
        <MDBox>
          <MDTypography fontSize="8pt" fontWeight="bold">
            {commision.agent_id.name + " " + commision.agent_id.surname}
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
          <MDTypography fontSize="8pt">{commision.start_date.slice(0, 10)}</MDTypography>
        </MDBox>
      ),
      details: (
        <> 
            {
                commision.agent_id.kind === 'phone_agent' ?
                <CommissionDetailsPhone agentId={commision.agent_id._id} month={month} year={year}/>
                : <CommissionDetailsSales agentId={commision.agent_id._id} month={month} year={year} />
            }
        </>
      ),
      actions: (
        <MDButton
          color="info"
          onClick={() => {
            setSelectedCommission(commision._id);
            setConfirmationOpen(true);
          }}
        >
          <Icon style={{ marginRight: "5px" }}>recommend</Icon>
          Release
        </MDButton>
      ),
    };
  });
  const columns = [
    { Header: "agent", accessor: "agent", align: "left" },
    { Header: "amount", accessor: "amount", align: "center" },
    { Header: "start date", accessor: "date", align: "center" },
    { Header: 'details', accessor: 'details', align: 'center'},
    { Header: "actions", accessor: "actions", align: "center" },
  ];

  useEffect(() => {
    getMonthlyCommissions(notification, month, year, setCommissions)
    setCommissionUpdated(false);
  }, [commissionUpdated]);

  return (
    <>
      <ConfirmationModal
        open={confirmationOpen}
        handleClose={() => setConfirmationOpen(false)}
        confirmationAction={() => {
          confirmSale(notification, selectedCommission, setCommissionUpdated);
        }}
      />
      <Card>
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
            Commissions
          </MDTypography>
        </MDBox>
        <MDBox pt={3}>
          <DataTable
            table={{ columns, rows }}
            isSorted={false}
            entriesPerPage={false}
            showTotalEntries={false}
            noEndBorder
          />
        </MDBox>
      </Card>
    </>
  );
}

export default CommissionTable;
