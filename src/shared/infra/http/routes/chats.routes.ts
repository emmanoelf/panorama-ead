import { Router } from "express";

import listChatBySolicitationController from "@modules/solicitations/useCases/listChatBySolicitation";
import sendMessageController from "@modules/solicitations/useCases/sendMessageChat/";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const chatsRoutes = Router();

chatsRoutes.use(ensureAuthenticated);
chatsRoutes.put("/:id", (request, response) => {
    return sendMessageController().handle(request, response);
});
chatsRoutes.get("/:id", (request, response) => {
    return listChatBySolicitationController().handle(request, response);
});

export { chatsRoutes };
