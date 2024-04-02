/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import logo from "../assets/images/Epoka_wATER_fILTERTS-removebg-preview.png"
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../assets/theme/index.js";
import "./styles/page_model.css";
import Configurator from "../components/Configurator/index.js"

// Material Dashboard 2 React Dark Mode themes
import themeDark from "../assets/theme-dark/index.js";

import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "../context/index.js";

// Images
import brandWhite from "../assets/images/logo-ct.png";
import brandDark from "../assets/images/logo-ct-dark.png";

import Sidenav from "../components/side_nav/index.js";
import MDBox from "../components/MDBox/index.js";
import Icon from "@mui/material/Icon";

function PageModel(props){

    const [controller, dispatch] = useMaterialUIController();
    const {
        miniSidenav,
        direction,
        layout,
        openConfigurator,
        sidenavColor,
        transparentSidenav,
        whiteSidenav,
        darkMode,
    } = controller;

    const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

    const configsButton = (
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="3.25rem"
        height="3.25rem"
        bgColor="white"
        shadow="sm"
        borderRadius="50%"
        position="fixed"
        right="2rem"
        bottom="2rem"
        zIndex={99}
        color="dark"
        sx={{ cursor: "pointer" }}
        onClick={handleConfiguratorOpen}
      >
        <Icon fontSize="small" color="inherit">
          settings
        </Icon>
      </MDBox>
    );

    return (
            <ThemeProvider theme={darkMode ? themeDark : theme}>
              <CssBaseline />
              {layout === "dashboard" && (
                <>
                  <Sidenav
                    color={'white'}
                    brand={logo}
                    brandName="Epoka filters"
                    routes={props.routes.map(route=>{
                      let new_route = {...route}
                      new_route['route'] = props.prefix + route.route;
                      return new_route
                    })}
                    onMouseEnter={()=>console.log("Something")}
                    onMouseLeave={()=>console.log("Something")}
                  />
                  <Configurator />
                  {configsButton}
                </>
              )}
              {layout === "vr" && <Configurator />}
              {props.children}
            </ThemeProvider>
    );
}

export default PageModel;