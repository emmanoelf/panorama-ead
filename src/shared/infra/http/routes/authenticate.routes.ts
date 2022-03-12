import { Router } from "express";

import authenticateUserController from "../../../../modules/accounts/useCases/authenticateUser";
import refreshTokenController from "../../../../modules/accounts/useCases/refreshToken";

const authenticateRoutes = Router();

authenticateRoutes.post("/sessions", (request, response) => {
    return authenticateUserController().handle(request, response);
});

authenticateRoutes.post("/refresh-token", (request, response) => {
    return refreshTokenController().handle(request, response);
});

export { authenticateRoutes };
