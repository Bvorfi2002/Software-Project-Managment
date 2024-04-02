import React from "react";
import routes from "../../routes/inventory_manager_routes.js";
import InventoryManagerPage from "./inventory_manager_page.js";
import PageModel from "../page_model.js"


function InventoryManagerView() {
    return (
        <PageModel prefix="/inventory_manager" routes={routes}>
            <InventoryManagerPage />
        </PageModel>
    )
}

export default InventoryManagerView;