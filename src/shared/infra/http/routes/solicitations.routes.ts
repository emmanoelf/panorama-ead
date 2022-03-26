import { Router } from "express";

import createSolicitationController from "@modules/solicitations/useCases/createSolicitation";

const solicitationRoutes = Router();

solicitationRoutes.post("/", (request, response) => {
    return createSolicitationController().handle(request, response);
});

export { solicitationRoutes };
