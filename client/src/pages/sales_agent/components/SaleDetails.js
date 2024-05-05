import React, {useEffect} from "react";
import { openSale } from "../scripts/sales-scripts";
import Loading from '../../../components/Loading/loading';
import { borderRadius } from "@mui/system";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";
import DataTable from "../../../components/Tables/DataTable";
import { Icon } from "@mui/material";
import { styled } from "@mui/material";
import {Button} from "@mui/material";
import AddReferenceModal from "./AddReferenceModal";
import { add_reference_for_discount } from "../scripts/sales-scripts";
import ConfirmSale from "./ConfirmSale";

function SaleDetails({ ref_id, p_ag_id, handleClose }) {

    const [sale, setSale] = React.useState(null);
    const [discount, setDiscount] = React.useState(0);
    const [references, setReferences] = React.useState([]);
    const [openForm, setOpenForm] = React.useState(false);
    const rows = references.map(reference => {
        return {
            name: (
                <MDBox>
                    <MDTypography fontSize="8pt" fontWeight="bold">
                        {reference.name + " " + reference.surname}
                    </MDTypography>
                </MDBox>
            ),
            phone: (
                <MDBox>
                    <MDTypography fontSize="8pt">
                        {reference.phone}
                    </MDTypography>
                </MDBox>
            )
        }
    });
    const columns = [
        { Header: "name", accessor: 'name', align: 'left' },
        { Header: 'phone', accessor: 'phone', align: 'center' }
    ]
    const leftStyle = {
        width: "45%",
        height: "87%",
        backgroundColor: '#F5F5F5',
        padding: "20px 0 0 10px",
        fontSize: "12pt",
        borderRadius: "5px"
    }
    const rightStyle = {
        width: "50%",
        height: "90%",
        fontSize: "10pt",
        overflow: "scroll"
    }
    const mainStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "80%",
    }
    const rowDivs = {
        width: "95%",
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "7px"
    }

    useEffect(()=>{
        openSale(ref_id, p_ag_id, setSale);
    }, [])

    return (
        sale ? <>
            <h3 className="modal-title">
                New Sale
            </h3>
            <div style={{...mainStyle}}>
                <div style={{...leftStyle}}>
                    <p style={{fontWeight: "bold"}}>Details</p>
                    <div style={{marginTop: "10px"}}>
                        <div style={{...rowDivs}}>
                            <p>Date: </p>
                            <p>{sale.date.slice(0, 10)}</p>
                        </div>
                        <div style={{...rowDivs}}>
                            <p>Value:</p><p> 1495$</p>
                        </div>
                        <div style={{...rowDivs}}>
                            <p>Discount:</p><p> {discount}$</p>
                        </div>
                        <div style={{height: "1px", marginTop: "25px", width: "95%", backgroundColor: 'gainsboro', marginBottom: "10px"}}></div>
                        <div style={{...rowDivs}}>
                            <p>Total amount:</p><p> {1495 - discount}$</p>
                        </div>
                    </div>
                </div>
                <div style={{...rightStyle}}>
                    <p style={{marginBottom:"5px"}}>Add references to generate a discount for the client. Each reference is worth 50$.</p>
                    <DataTable
                        table={{ columns, rows }}
                        isSorted={false}
                        entriesPerPage={false}
                        showTotalEntries={false}
                        noEndBorder
                    />
                    <TriggerButton onClick={()=>setOpenForm(true)}>
                        <Icon color='primary' fontSize='large' style={{ marginRight: "5px" }}>library_add</Icon>
                        Add reference
                    </TriggerButton>
                    <AddReferenceModal open={openForm} handleClose={()=>setOpenForm(false)}showReference={(newReference)=>{
                        references.push(newReference);
                        setReferences(references);
                        add_reference_for_discount(ref_id, setDiscount);
                    }}/>
                </div>
            </div>
            <ConfirmSale ref_id={ref_id} outClose={handleClose} discount={discount}/>
        </> : <Loading />
    );
}

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
    margin-right: 5px;
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

export default SaleDetails;