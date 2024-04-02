import Icon from "@mui/material/Icon";
import Test from "../components/test";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Test />,
  },
];

export default routes;