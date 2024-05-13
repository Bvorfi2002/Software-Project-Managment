import Icon from "@mui/material/Icon";
import Test from "../components/test";
import ReferenceOverviewContent from "../pages/marketing_manager/content/ReferenceOverviewContent";
import RedListContent from "../pages/marketing_manager/content/RedListContent";
import PhoneCallsContent from "../pages/marketing_manager/content/PhoneCallsContent";
import BuyersContent from "../pages/marketing_manager/content/BuyersContent";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Test />,
  },
  {
    type: "collapse",
    name: "Buyers",
    key: "buyers",
    icon: <Icon fontSize="small">groups_3</Icon>,
    route: "/buyers",
    component: <BuyersContent />,
  },
  {
    type: "collapse",
    name: "Phone calls",
    key: "phone_calls",
    icon: <Icon fontSize="small">phone_in_talk</Icon>,
    route: "/phone_calls",
    component: <PhoneCallsContent />,
  },
  {
    type: "collapse",
    name: "Red listed references",
    key: "red_list",
    icon: <Icon fontSize="small">format_list_bulleted</Icon>,
    route: "/red_list",
    component: <RedListContent />,
  },
  {
    type: "collapse",
    name: "Reference overview",
    key: "reference_overview",
    icon: <Icon fontSize="small">link</Icon>,
    route: "/reference_overview",
    component: <ReferenceOverviewContent />,
  },
];

export default routes;