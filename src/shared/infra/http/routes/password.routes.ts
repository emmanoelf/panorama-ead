import { Router } from "express";

import resetPasswordUserController from "../../../../modules/accounts/useCases/resetPasswordUser";
import sendForgotPasswordMailController from "../../../../modules/accounts/useCases/sendForgotPasswordMail";

const passwordRoutes = Router();

passwordRoutes.post("/forgot-password", (request, response) => {
    return sendForgotPasswordMailController().handle(request, response);
});

passwordRoutes.post("/reset-password", (request, response) => {
    return resetPasswordUserController().handle(request, response);
});

export { passwordRoutes };
