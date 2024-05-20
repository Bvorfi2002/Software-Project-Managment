import Icon from "@mui/material/Icon";
import Test from "../components/test";
import SalesContent from "../pages/chief/content/SalesContent";
import CommissionContent from "../pages/chief/content/CommissionContent";
import DebtContent from "../pages/chief/content/DebtContent";

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
    name: "Commissions",
    key: "commissions",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/commissions",
    component: <CommissionContent />,
  },
  {
    type: "collapse",
    name: "Sales list",
    key: "sales",
    icon: <Icon fontSize="small">attach_money</Icon>,
    route: "/sales",
    component: <SalesContent />,
  },
  {
    type: "collapse",
    name: "Debt list",
    key: "debts",
    icon: <Icon fontSize="small">domain</Icon>,
    route: "/debts",
    component: <DebtContent />,
  },
  {
    type: "collapse",
    name: "Office inventory",
    key: "inventory",
    icon: <Icon fontSize="small">inventory_2</Icon>,
    route: "/inventory",
    component: <Test />,
  },
];

export default routes;