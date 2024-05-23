import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { styled, css } from "@mui/system";
import { Modal as BaseModal, Icon } from "@mui/material";
import { Button } from "@mui/material";
import PropTypes from "prop-types";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import clsx from "clsx";
import { useSnackbar } from "notistack";
import TextField from '@mui/material/TextField';
import {
  Unstable_NumberInput as BaseNumberInput,
  numberInputClasses,
} from '@mui/base/Unstable_NumberInput';
import MDButton from "../../../components/MDButton";
import { editItem } from "../scripts/inventory-scripts";

const CustomNumberInput = React.forwardRef(function CustomNumberInput(value, onChange , ref) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInputElement,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        input: {
          value,
          onChange
        },
        incrementButton: {
          children: '▴',
        },
        decrementButton: {
          children: '▾',
        },
      }}
      ref={ref}
    />
  );
});


function EditItemModal({ selectedItem, dependency }){

    const [open, setOpen] = useState(false);
    const [item, setItem] = useState({ ...selectedItem, itemBuyingPrice: selectedItem.itemBuyingPrice.$numberDecimal })
    const onChangeName = (event)=>{
      const newValue = { ...item, itemName: event.target.value };
      setItem(newValue);
    }
    const onChangePrice = (event)=>{
      const price = parseFloat(event.target.value);
      if(price !== isNaN && price > 0){
        const newValue = { ...item, itemBuyingPrice: price }
        setItem(newValue);
      } else if(event.target.value === ''){
        const newValue = { ...item, itemBuyingPrice: 0 }
        setItem(newValue);
      } 
    }
    const onChangeStockAlert = (event)=>{
      const quantity = parseFloat(event.target.value);
      if(quantity !== isNaN && quantity >= 0){
        const newValue = { ...item, itemStockAlert: quantity }
        setItem(newValue);
      } else if(event.target.value === ''){
        const newValue = { ...item, itemStockAlert: 0 }
        setItem(newValue);
      } 
    }
    const handleOpen = () => {
        setOpen(true);
      };
      const handleClose = () => {
        setOpen(false);
      };

      const { enqueueSnackbar, closeSnackbar } = useSnackbar();
      const notification = { add: enqueueSnackbar, close: closeSnackbar };
      const navigator = useNavigate();

    return (
        <>
          {/* <TriggerButton
            onClick={handleOpen}
          >
            <Icon fontSize="large" style={{ marginRight: "5px" }}>
              playlist_add
            </Icon>
            Add item
          </TriggerButton> */}
          <MDButton color="info" style={{marginRight: "5px"}} onClick={handleOpen}>
            <Icon>edit</Icon>
          </MDButton>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            slots={{ backdrop: StyledBackdrop }}
          >
              <ModalContent sx={style}>
                <h3 className="modal-title">Add item</h3>
                <div
                  style={{
                    height: "100%",
                    width: "90%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TextField id="outlined-basic" value={item?.itemName} label="Item name" variant="outlined" style={{margin: "auto auto"}} fullWidth onChange={onChangeName}/>
                  <TextField id="outlined-basic" value={item?.itemBuyingPrice} label="Item price" variant="outlined" style={{margin: "auto auto"}} fullWidth onChange={onChangePrice}/>
                  <TextField id="outlined-basic" value={item?.itemStockAlert} label="Stock alert quantity" variant="outlined" style={{margin: "auto auto"}} fullWidth onChange={onChangeStockAlert}/>
                  {/* <CustomNumberInput value={item?.itemStockAlert} aria-label="Demo number input" placeholder="Stock alert quantity" onChange={onChangeStockAlert}/> */}
                  <MDButton color="info" onClick={()=>{
                    if(item?.itemName && item?.itemBuyingPrice >= 0 && item?.itemStockAlert >= 0){
                      editItem(notification, navigator, selectedItem._id, { ...item }, dependency);
                      handleClose();
                    } else {
                      notification.add("All fields are required", { variant: "error" })
                      setTimeout(notification.close, 3000);
                    }
                  }}>
                    <Icon style={{marginRight: "5px"}}>check</Icon>
                    Confirm
                  </MDButton>
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
    height: 300,
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

  const StyledInputRoot = styled('div')(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 400;
    width: 100%;
    margin: auto auto;
    border-radius: 8px;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0px 2px 4px ${
      theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
    };
    display: grid;
    grid-template-columns: 1fr 19px;
    grid-template-rows: 1fr 1fr;
    overflow: hidden;
    column-gap: 8px;
    padding: 4px;
  
    &.${numberInputClasses.focused} {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[700] : blue[200]};
    }
  
    &:hover {
      border-color: ${blue[400]};
    }
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );
  
  const StyledInputElement = styled('input')(
    ({ theme }) => `
    font-size: 0.875rem;
    font-family: inherit;
    font-weight: 400;
    line-height: 1.5;
    grid-column: 1/2;
    grid-row: 1/3;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: inherit;
    border: none;
    border-radius: inherit;
    padding: 8px 12px;
    outline: 0;
  `,
  );
  
  const StyledButton = styled('button')(
    ({ theme }) => `
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    appearance: none;
    padding: 0;
    width: 19px;
    height: 19px;
    font-family: system-ui, sans-serif;
    font-size: 0.875rem;
    line-height: 1;
    box-sizing: border-box;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 0;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
  
    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
      cursor: pointer;
    }
  
    &.${numberInputClasses.incrementButton} {
      grid-column: 2/3;
      grid-row: 1/2;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      border: 1px solid;
      border-bottom: 0;
      border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
      color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
  
      &:hover {
        cursor: pointer;
        color: #FFF;
        background: ${theme.palette.mode === 'dark' ? blue[600] : blue[500]};
        border-color: ${theme.palette.mode === 'dark' ? blue[400] : blue[600]};
      }
    }
  
    &.${numberInputClasses.decrementButton} {
      grid-column: 2/3;
      grid-row: 2/3;
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
      border: 1px solid;
      border-color: ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
      background: ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};
      color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
    }
  
    &:hover {
      cursor: pointer;
      color: #FFF;
      background: ${theme.palette.mode === 'dark' ? blue[600] : blue[500]};
      border-color: ${theme.palette.mode === 'dark' ? blue[400] : blue[600]};
    }
  
    & .arrow {
      transform: translateY(-1px);
    }
  
    & .arrow {
      transform: translateY(-1px);
    }
  `,
  );

export default EditItemModal;