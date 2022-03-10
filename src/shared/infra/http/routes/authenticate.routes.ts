import { Router } from "express";

import authenticateUserController from "../../../../modules/accounts/useCases/authenticateUser";

// import authenticateUserController from "../../../../modules/accounts/useCases/authenticateUser";

const authenticateRoutes = Router();

authenticateRoutes.post("/sessions", (request, response) => {
    return authenticateUserController().handle(request, response);
});

export { authenticateRoutes };
