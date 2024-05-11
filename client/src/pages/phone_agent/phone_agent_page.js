
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import routes from "../../routes/phone_agent_routes";

function PhoneAgentPage(){

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
        <Route path="*" element={<Navigate to="/phone_agent/dashboard" />} />
      </Routes>
    );
}

export default PhoneAgentPage;