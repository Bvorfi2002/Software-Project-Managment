import React from "react";
import routes from "../../routes/installator_routes.js";
import InstallatorPage from "./installator_page.js";
import PageModel from "../page_model.js"


function InstallatorView() {
    return (
        <PageModel prefix="/installator" routes={routes}>
            <InstallatorPage />
        </PageModel>
    )
}

export default InstallatorView;