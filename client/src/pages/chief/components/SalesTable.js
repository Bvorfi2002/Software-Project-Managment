import React, { useEffect, useState } from "react";
import DataTable from "../../../components/Tables/DataTable";
import MDBox from "../../../components/MDBox";
import MDButton from "../../../components/MDButton";
import { Card, Icon } from "@mui/material";
import MDTypography from "../../../components/MDTypography";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import { getAllSales, confirmSale } from "../scripts/sales-scripts";
import { useSnackbar } from "notistack";
import numeral from "numeral";

function SalesTable({}) {
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [sales, setSales] = useState([]);
  const [salesUpdated, setSalesUpdated] = useState(false);
  const [selectedSale, setSelectedSale] = useState('');
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const notification = { add: enqueueSnackbar, close: closeSnackbar };
  const rows = sales.map((sale) => {
    return {
      buyer: (
        <MDBox>
          <MDTypography fontSize="8pt" fontWeight="bold">
            {sale.client_id.name + " " + sale.client_id.surname}
          </MDTypography>
        </MDBox>
      ),
      phoneNumber: (
        <MDBox>
          <MDTypography fontSize="8pt">{sale.client_id.phone}</MDTypography>
        </MDBox>
      ),
      address: (
        <MDBox>
          <MDTypography fontSize="8pt">
            {sale.client_id.address + ", " + sale.client_id.city}
          </MDTypography>
        </MDBox>
      ),
      upfront: (
        <MDBox>
          <MDTypography fontSize="8pt">
            {numeral(sale.amount.$numberDecimal).format(
              Number.isInteger(sale.amount.$numberDecimal) ? "$0,0" : "$0,0.00"
            )}
          </MDTypography>
        </MDBox>
      ),
      date: (
        <MDBox>
          <MDTypography fontSize="8pt">{sale.date.slice(0, 10)}</MDTypography>
        </MDBox>
      ),
      actions: (
        <MDButton color="success" disabled={sale.approved} onClick={() => {
            setSelectedSale(sale._id);
            setConfirmationOpen(true)
        }}>
          <Icon style={{ marginRight: "5px" }}>check</Icon>
          Confirm
        </MDButton>
      ),
    };
  });
  const columns = [
    { Header: "buyer", accessor: "buyer", align: "left" },
    { Header: "phone number", accessor: "phoneNumber", align: "center" },
    { Header: "address", accessor: "address", align: "center" },
    { Header: "money upfront", accessor: "upfront", align: "center" },
    { Header: "sale date", accessor: "date", align: "center" },
    { Header: "actions", accessor: "actions", align: "center" },
  ];

  useEffect(() => {
    getAllSales(notification, setSales);
    setSalesUpdated(false);
  }, [salesUpdated]);

  return (
    <>
      <ConfirmationModal
        open={confirmationOpen}
        handleClose={() => setConfirmationOpen(false)}
        confirmationAction={() => {
          confirmSale(notification, selectedSale, setSalesUpdated);
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
            Sales
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

export default SalesTable;
