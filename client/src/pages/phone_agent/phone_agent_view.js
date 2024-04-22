import React from "react";
import routes from "../../routes/phone_agent_routes.js";
import PhoneAgentPage from "./phone_agent_page.js";
import PageModel from "../page_model.js"


function PhoneAgentView() {
    return (
        <PageModel prefix="" routes={routes}>
            <PhoneAgentPage />
        </PageModel>
    )
}

export default PhoneAgentView;