import { ChatsRepository } from "@modules/solicitations/infra/typeorm/repositories/ChatsRepository";

import { ListChatBySolicitationController } from "./ListChatBySolicitationController";
import { ListChatBySolicitationUseCase } from "./ListChatBySolicitationUseCase";

export default (): ListChatBySolicitationController => {
    const chatsRepository = new ChatsRepository();
    const listChatBySolicitationUseCase = new ListChatBySolicitationUseCase(
        chatsRepository
    );
    const listChatBySolicitationController =
        new ListChatBySolicitationController(listChatBySolicitationUseCase);

    return listChatBySolicitationController;
};
