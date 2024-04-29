import React from "react";
import MDBox from "../../../components/MDBox";
import MDTypography from "../../../components/MDTypography";

function DateTableCell({date}){
    return (
        <MDBox>
            <MDTypography fontSize="8pt">
                {date.toString().slice(0, 10)}
            </MDTypography>
        </MDBox>
    );
}

export default DateTableCell;