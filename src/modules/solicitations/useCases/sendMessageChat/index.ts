import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { ChatsRepository } from "@modules/solicitations/infra/typeorm/repositories/ChatsRepository";

import { SendMessageController } from "./SendMessageChatController";
import { SendMessageChatUseCase } from "./SendMessageChatUseCase";

export default (): SendMessageController => {
    const chatsRepository = new ChatsRepository();
    const usersRepository = new UsersRepository();
    const sendMessageChatUseCase = new SendMessageChatUseCase(
        chatsRepository,
        usersRepository
    );
    const sendMessageController = new SendMessageController(
        sendMessageChatUseCase
    );

    return sendMessageController;
};
