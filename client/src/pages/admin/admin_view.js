import React from "react";
import routes from "../../routes/admin_routes.js";
import AdminPage from "./admin_page.js";
import PageModel from "../page_model.js"


function AdminView() {
    return (
        <PageModel prefix="/admin" routes={routes}>
            <AdminPage />
        </PageModel>
    )
}

export default AdminView;