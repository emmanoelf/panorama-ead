import { Router } from "express";

import createSolicitationController from "@modules/solicitations/useCases/createSolicitation";
import createSolicitationUserController from "@modules/solicitations/useCases/createSolicitationUser";
import listAllSolicitationsController from "@modules/solicitations/useCases/listAllSolicitations";

const solicitationRoutes = Router();

solicitationRoutes.post("/", (request, response) => {
    return createSolicitationController().handle(request, response);
});
solicitationRoutes.get("/", (request, response) => {
    return listAllSolicitationsController().handle(request, response);
});
solicitationRoutes.put("/users/:id", (request, response) => {
    return createSolicitationUserController().handle(request, response);
});

export { solicitationRoutes };
