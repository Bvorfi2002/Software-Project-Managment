import React from "react";
import SalesAgentPage from "./sales_agent_page";
import routes from "../../routes/sales_agent_routes.js";
import PageModel from "../page_model.js"

function SalesAgentView() {
    return (
        <PageModel prefix="/sales_agent" routes={routes}>
            <SalesAgentPage />
        </PageModel>
    )
}

export default SalesAgentView;