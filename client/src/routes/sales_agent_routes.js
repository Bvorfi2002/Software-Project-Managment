import Icon from "@mui/material/Icon";
import ContentModel from "../pages/content_model";
import SalesDashBoardContent from "../pages/sales_agent/content/SalesDashBoardContent";
import SalesScheduleContent from "../pages/sales_agent/content/SalesScheduleContent";
import SalesReferenceContent from "../pages/sales_agent/content/SalesReferenceContent";
import SalesMeetingContent from "../pages/sales_agent/content/SalesMeetingContent";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/",
    component: <SalesDashBoardContent />,
  },
  {
    type: "collapse",
    name: "Schedule management",
    key: "schedule",
    icon: <Icon fontSize="small">calendar_month</Icon>,
    route: "/schedule",
    component: <SalesScheduleContent />,
  },
  {
    type: "collapse",
    name: "Meeting overview",
    key: "meetings",
    icon: <Icon fontSize="small">groups</Icon>,
    route: "/meetings",
    component: <SalesMeetingContent />,
  },
  {
    type: "collapse",
    name: "References",
    key: "references",
    icon: <Icon fontSize="small">link</Icon>,
    route: "/references",
    component: <SalesReferenceContent />,
  },
];

export default routes;