import React from "react";
import routes from "../../routes/chief_routes.js";
import ChiefPage from "./chief_page.js";
import PageModel from "../page_model.js"

function ChiefView() {
    return (
        <PageModel prefix="/chief" routes={routes}>
            <ChiefPage />
        </PageModel>
    )
}

export default ChiefView;