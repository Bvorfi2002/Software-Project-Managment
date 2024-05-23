import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import DataTable from "../../../components/Tables/DataTable";
import MDBox from "../../../components/MDBox";
import MDButton from "../../../components/MDButton";
import { Card, Icon } from "@mui/material";
import MDTypography from "../../../components/MDTypography";
import { useSnackbar } from "notistack";
import numeral from "numeral";
import AddItemModal from "./AddItemModal";
import { deleteItem, getAllItems } from "../scripts/inventory-scripts"
import EditItemModal from "./EditItemModal";
import AddQuantityModal from "./AddQuantityModal";

function InventoryTable({}) {
  const [items, setItems] = useState([]);
  const [itemsUpdated, setItemsUpdated] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const notification = { add: enqueueSnackbar, close: closeSnackbar };
  const navigator = useNavigate();
  const rows = items.map((item, index) => {
    return {
      nr: (
        <MDTypography style={{fontSize: "8pt"}}>
          {index + 1}
        </MDTypography>
      ),
      name: (
        <MDTypography style={{fontSize: "8pt"}}>
          {item.itemName}
        </MDTypography>
      ),
      quantity: (
        <MDTypography style={{fontSize: "8pt"}}>
          {item.itemQuantity}
        </MDTypography>
      ),
      price: (
        <MDTypography style={{fontSize: "8pt"}}>
          {item.itemBuyingPrice.$numberDecimal}
        </MDTypography>
      ),
      actions: (
        <MDBox>
          <EditItemModal selectedItem={item} dependency={setItemsUpdated}/>
          <MDButton color="error" onClick={()=>{
            deleteItem(notification, navigator, item._id, setItemsUpdated)
          }}>
            <Icon>delete</Icon>
          </MDButton>
          <AddQuantityModal selectedItem={item} dependency={setItemsUpdated}/>
        </MDBox>
      )
    };
  });
  const columns = [
    { Header: "item #", accessor: "nr", align: "center"},
    { Header: "item name", accessor: "name", align: "left" },
    { Header: "quantity on hand", accessor: "quantity", align: "center" },
    { Header: "buying price", accessor: "price", align: "center" },
    { Header: "actions", accessor: "actions", align: "center"}
  ];

  useEffect(() => {
    getAllItems(notification, navigator, setItems);
    setItemsUpdated(false);
  }, [itemsUpdated]);

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
            Items
          </MDTypography>
          <div style={{ width:"33%",display: "flex", justifyContent: "space-between"}}>
            <MDButton marginRight="5px" onClick={()=>{
                notification.add("We are working to bring this feature to you!", { variant: "info" });
                setTimeout(notification.close, 3000);
            }}>Requests</MDButton>
            <AddItemModal dependency={setItemsUpdated}/>
          </div>
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

export default InventoryTable;
