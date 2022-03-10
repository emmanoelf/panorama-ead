import { Router } from "express";

import createPermissionController from "../../../../modules/accounts/useCases/createPermission";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const permissionsRoutes = Router();

permissionsRoutes.use(ensureAuthenticated);
permissionsRoutes.post("/", (request, response) => {
    return createPermissionController().handle(request, response);
});

export { permissionsRoutes };
