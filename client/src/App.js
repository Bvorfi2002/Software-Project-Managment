import AdminView from "./pages/admin/admin_view";
import ChiefView from "./pages/chief/chief_view";
import SalesAgentView from "./pages/sales_agent/sales_agent_view"
import PhoneAgentView from "./pages/phone_agent/phone_agent_view"
import MarketingManagerView from './pages/marketing_manager/marketing_manager_view'
import InstallatorView from "./pages/installator/intallator_view"
import InventoryManagerView from "./pages/inventory_manager/inventory_manager_view"
import {Route, Routes, BrowserRouter as Router} from "react-router-dom"
import LoginPage from "./pages/login/LoginPage";
import SafeRoute from "./components/SafeRoute/SafeRoute.js";

function App() {
  return (
      <Router>
        {/* <SafeRoute> */}
          <Routes>
            {/* <Route path="/*" element={<LoginPage />} /> */}
            {/* <Route path="/admin/*" element={<AdminView />}/>
            <Route path="/chief/*" element={<ChiefView />}/> */}
            {/* <Route path="/sales_agent/*" element={<SalesAgentView />}/> */}
            <Route path="/*" element={<PhoneAgentView />}/>
            {/* <Route path="/marketing_manager/*" element={<MarketingManagerView />}/> */}
            {/* <Route path="/installator/*" element={<InstallatorView />}/> */}
            {/* <Route path="/inventory_manager/*" element={<InventoryManagerView />}/> */}
          </Routes>
        {/* </SafeRoute> */}
      </Router>
  );
}

export default App;
