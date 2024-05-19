import React, { useEffect, useState } from "react";
import DataTable from "../../../components/Tables/DataTable";
import MDBox from "../../../components/MDBox";
import { Card, Icon } from "@mui/material";
import MDTypography from "../../../components/MDTypography";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import StatusCell from "./StatusCell";
import { getAllBuyers } from "../scripts/buyer-scripts";
import { useSnackbar } from "notistack";
import numeral from "numeral"
import DebtModal from "./DebtModal";


function BuyerTable({  }) {

    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [buyers, setBuyers] = useState([]);
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const notification = { add: enqueueSnackbar, close: closeSnackbar };
    const rows = buyers.map(buyer => {
        return {
            buyer: (
                <MDBox>
                    <MDTypography fontSize="8pt" fontWeight="bold">
                        {buyer.name + " " + buyer.surname}
                    </MDTypography>
                </MDBox>
            ),
            phoneNumber: (
                <MDBox>
                    <MDTypography fontSize="8pt">
                        {buyer.phone}
                    </MDTypography>
                </MDBox>
            ),
            address: (
                <MDBox>
                    <MDTypography fontSize="8pt">
                        {buyer.address + ", " + buyer.city}
                    </MDTypography>
                </MDBox>
            ),
            upfront: (
                <MDBox>
                    <MDTypography fontSize="8pt">
                        {numeral(buyer.sale.amount.$numberDecimal).format(Number.isInteger(buyer.sale.amount.$numberDecimal) ? '$0,0' : '$0,0.00')}
                    </MDTypography>
                </MDBox>
            ),
            date: (
                <MDBox>
                    <MDTypography fontSize="8pt">
                        {buyer.sale.date.slice(0, 10)}
                    </MDTypography>
                </MDBox>
            ),
            warranty: (
                <MDBox color={buyer.warranty ? 'success' : 'error'}>
                    {buyer.warranty ? "YES" : "NO"}
                </MDBox>
            ),
            debt: (
                <>
                    {
                        buyer.debt ?
                        <DebtModal debt={buyer.debt} /> : 
                        <MDTypography fontSize="8pt" fontWeight="bold">
                            Not applicable
                        </MDTypography>
                    }
                </>
            )
        }
    });
    const columns = [
        { Header: "buyer", accessor: 'buyer', align: 'left' },
        { Header: 'phone number', accessor: 'phoneNumber', align: 'center' },
        { Header: 'address', accessor: 'address', align: 'center' },
        { Header: 'money upfront', accessor: 'upfront', align: 'center' },
        { Header: 'sale date', accessor: 'date', align: 'center' },
        { Header: 'warranty', accessor: 'warranty', align: 'center' },
        { Header: 'debt details', accessor: 'debt', align: 'center' },
    ]

    useEffect(()=>{
        getAllBuyers(notification, setBuyers)
    }, [])

    return (
        <>
            <ConfirmationModal open={confirmationOpen} handleClose={()=>setConfirmationOpen(false)}/>
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
                        Buyers
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
    )
}

export default BuyerTable;