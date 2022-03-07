import { Router } from "express";

import createPermissionController from "../../../../modules/accounts/useCases/createPermission";

const permissionsRoutes = Router();

permissionsRoutes.post("/", (request, response) => {
    return createPermissionController().handle(request, response);
});

export { permissionsRoutes };
