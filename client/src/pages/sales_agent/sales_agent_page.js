
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import routes from "../../routes/sales_agent_routes.js";

function SalesAgentPage(){

    const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

    return (
      <Routes>
        {getRoutes(routes)}
        {/* <Route path="*" element={<Navigate to="/sales_agent/dashboard" />} /> */}
      </Routes>
    );
}

export default SalesAgentPage;