import React from "react";
// react-router-dom components
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import DashboardNavbar from "../components/Navbars/DashboardNavbar/index"
import MDBox from "../components/MDBox";
import { useMaterialUIController, setLayout } from "../context";

function ContentModel(props) {

    const [controller, dispatch] = useMaterialUIController();
    const { miniSidenav } = controller;
    const { pathname } = useLocation();

    return (
        <MDBox
            sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
                p: 3,
                position: "relative",

                [breakpoints.up("xl")]: {
                    marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
                    transition: transitions.create(["margin-left", "margin-right"], {
                        easing: transitions.easing.easeInOut,
                        duration: transitions.duration.standard,
                    }),
                },
            })}
        >
            <DashboardNavbar />
            {props.children}
        </MDBox>
    );
}

ContentModel.propTypes = {
    children: PropTypes.node.isRequired,
  };

export default ContentModel;