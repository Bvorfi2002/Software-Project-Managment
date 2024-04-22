import Icon from "@mui/material/Icon";
import Test from "../components/test";
import DashboardContent from "../pages/phone_agent/content/DashboardContent";
import CallLogContent from "../pages/phone_agent/content/CallLogContent";
import ReferencesContent from "../pages/phone_agent/content/ReferencesContent";
import ReservedCallContent from "../pages/phone_agent/content/ReservedCallContent";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <DashboardContent />,
  },
  {
    type: "collapse",
    name: "Call History",
    key: "calls",
    icon: <Icon fontSize="small">phone_in_talk</Icon>,
    route: "/calls",
    component: <CallLogContent />,
  },
  {
    type: "collapse",
    name: "Latest references",
    key: "references",
    icon: <Icon fontSize="small">link</Icon>,
    route: "/references",
    component: <ReferencesContent />,
  },
  {
    type: "collapse",
    name: "Reserved Calls",
    key: "reserved_calls",
    icon: <Icon fontSize="small">contacts</Icon>,
    route: "/reserved_calls",
    component: <ReservedCallContent />,
  },
];

export default routes;