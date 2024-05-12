import React, { useEffect, useState } from "react";
import DataTable from "../../../components/Tables/DataTable";
import QualifiedCell from "./QualifiedCell";
import MDButton from "../../../components/MDButton";
import MDBox from "../../../components/MDBox";
import { Card, Icon } from "@mui/material";
import MDTypography from "../../../components/MDTypography";
import EditReferenceModal from "./EditReferenceModal";
import ConfirmationModal from "../../../components/ConfirmationModal/ConfirmationModal";
import Checkbox from "@mui/material/Checkbox";
import { getRedListCalls } from "../scripts/call-scripts";
import { useSnackbar } from "notistack";
import ReserveCallModal from "./ReserveCallModal";
import ReserveCallFromRedList from "./ReserveCallFromRedList";

const label = { inputProps: { "aria-label": "Checkbox demo" } };


function RedListTable({ agent_id }) {
  const [references, setReferences] = useState([]);
  const [chosenCalls, setChosenCalls] = useState([]);
  const [callsUpdated, setCallsUpdated] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const notification = { add: enqueueSnackbar, close: closeSnackbar };
  const rows = references.map((reference) => {
    return {
      checkbox: (
        <MDBox maxWidth="30px">
          <Checkbox {...label} onChange={(event)=>{
            if(event.target.checked){
                const array = [...chosenCalls, reference._id]
                setChosenCalls(array);
            } else {
                const array = chosenCalls.filter(item => item !== reference._id);
                setChosenCalls(array);
            }
          }}/>
        </MDBox>
      ),
      reference: (
        <MDBox>
          <MDTypography fontSize="8pt" fontWeight="bold">
            {reference.reference_id.name + " " + reference.reference_id.surname}
          </MDTypography>
        </MDBox>
      ),
      phoneNumber: (
        <MDBox>
          <MDTypography fontSize="8pt">{reference.reference_id.phone}</MDTypography>
        </MDBox>
      ),
      address: (
        <MDBox>
          <MDTypography fontSize="8pt">
            {reference.reference_id.address + ", " + reference.reference_id.city}
          </MDTypography>
        </MDBox>
      ),
      phone_agent: (
        <MDBox>
          <MDTypography fontSize="8pt">{reference.p_ag_id.name + " " + reference.p_ag_id.surname}</MDTypography>
        </MDBox>
      ),
    };
  });
  const columns = [
    { Header: "", accessor: "checkbox", align: "left", width: "10px"},
    { Header: "reference", accessor: "reference", align: "left" },
    { Header: "phone number", accessor: "phoneNumber", align: "center" },
    { Header: "address", accessor: "address", align: "center" },
    { Header: "phone agent", accessor: "phone_agent", align: "center" },
  ];

  useEffect(()=>{
    console.log('Reading calls')
    getRedListCalls(notification, setReferences)
    setCallsUpdated(false);
  }, [callsUpdated])

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
            Red List Calls
          </MDTypography>
          <ReserveCallFromRedList chosenCalls={chosenCalls} dependency={setCallsUpdated}></ReserveCallFromRedList>
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

export default RedListTable;
