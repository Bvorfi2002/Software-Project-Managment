import AdminView from "./pages/admin/admin_view";
import ChiefView from "./pages/chief/chief_view";
import SalesAgentView from "./pages/sales_agent/sales_agent_view"
import PhoneAgentView from "./pages/phone_agent/phone_agent_view"
import MarketingManagerView from './pages/marketing_manager/marketing_manager_view'
import InstallatorView from "./pages/installator/intallator_view"
import InventoryManagerView from "./pages/inventory_manager/inventory_manager_view"
import {Route, Routes} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/admin/*" element={<AdminView />}/>
        <Route path="/chief/*" element={<ChiefView />}/>
        <Route path="/sales_agent/*" element={<SalesAgentView />}/>
        <Route path="/phone_agent/*" element={<PhoneAgentView />}/>
        <Route path="/marketing_manager/*" element={<MarketingManagerView />}/>
        <Route path="/installator/*" element={<InstallatorView />}/>
        <Route path="/inventory_manager/*" element={<InventoryManagerView />}/>
      </Routes>
    </div>
  );
}

export default App;
