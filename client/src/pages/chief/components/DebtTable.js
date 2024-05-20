import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import DataTable from "../../../components/Tables/DataTable";
import MDBox from "../../../components/MDBox";
import MDButton from "../../../components/MDButton";
import { Card, Icon } from "@mui/material";
import MDTypography from "../../../components/MDTypography";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import { useSnackbar } from "notistack";
import numeral from "numeral";
import { getDebts } from "../scripts/debt-scripts";

function DebtTable({}) {
  const [debts, setDebts] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const notification = { add: enqueueSnackbar, close: closeSnackbar };
  const navigator = useNavigate();
  const rows = debts.map((debt) => {
    return {
      client: (
        <MDBox>
          <MDTypography fontSize="8pt" fontWeight="bold">
            {debt.client_id.name + " " + debt.client_id.surname}
          </MDTypography>
        </MDBox>
      ),
      phoneNumber: (
        <MDBox>
          <MDTypography fontSize="8pt">{debt.client_id.phone}</MDTypography>
        </MDBox>
      ),
      address: (
        <MDBox>
          <MDTypography fontSize="8pt">
            {debt.client_id.address + ", " + debt.client_id.city}
          </MDTypography>
        </MDBox>
      ),
      amount: (
        <MDBox>
          <MDTypography fontSize="8pt">
            {numeral(debt.amount.$numberDecimal).format(
              Number.isInteger(debt.amount.$numberDecimal) ? "$0,0" : "$0,0.00"
            )}
          </MDTypography>
        </MDBox>
      ),
      monthly: (
        <MDBox>
          <MDTypography fontSize="8pt">
            {numeral(debt.monthly_pay.$numberDecimal).format(
              Number.isInteger(debt.monthly_pay.$numberDecimal) ? "$0,0" : "$0,0.00"
            )}
          </MDTypography>
        </MDBox>
      ),
      date: (
        <MDBox>
          <MDTypography fontSize="8pt">{debt.next_date.slice(0, 10)}</MDTypography>
        </MDBox>
      ),
      s_ag: (
        <MDBox>
          <MDTypography fontSize="8pt">
            {debt.sales_agent_id.name + " " + debt.sales_agent_id.surname}
          </MDTypography>
        </MDBox>
      ),
      p_ag: (
        <MDBox>
          <MDTypography fontSize="8pt">
            {debt.phone_agent_id.name + " " + debt.phone_agent_id.surname}
          </MDTypography>
        </MDBox>
      ),
      actions: (
        <MDButton color="info" onClick={() => {
            notification.add("We are working to bring this feature to you!", { variant: "info" });
            setTimeout(notification.close, 3000);
        }}>
          <Icon style={{ marginRight: "5px" }}>task</Icon>
          Create installation task
        </MDButton>
      ),
    };
  });
  const columns = [
    { Header: "client", accessor: "client", align: "left" },
    { Header: "phone number", accessor: "phoneNumber", align: "center" },
    { Header: "address", accessor: "address", align: "center" },
    { Header: "amount to pay", accessor: "amount", align: "center" },
    { Header: "monthly pay", accessor: "monthly", align: "center"},
    { Header: "next payment date", accessor: "date", align: "center" },
    { Header: "agent who sold", accessor: "s_ag", align: "center"},
    { Header: "agent who called", accessor: "p_ag", align: "center"},
    { Header: "actions", accessor: "actions", align: "center" },
  ];

  useEffect(() => {
    getDebts(notification, navigator, setDebts);
  }, []);

  return (
    <>
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
            Debts
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

export default DebtTable;
