import React from "react";
import routes from "../../routes/marketing_manager_routes.js";
import MarketingManagerPage from "./marketing_manager_page.js";
import PageModel from "../page_model.js"


function MarketingManagerView() {
    return (
        <PageModel prefix="" routes={routes}>
            <MarketingManagerPage />
        </PageModel>
    )
}

export default MarketingManagerView;