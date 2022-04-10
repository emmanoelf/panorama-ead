import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { Message } from "@modules/solicitations/infra/typeorm/entities/Message";
import { IChatsRepository } from "@modules/solicitations/repositories/IChatsRepository";

import { SendMessageChatErrors } from "./SendMessageChatErrors";

interface IRequest {
    chat_id: string;
    user_id: string;
    message: string;
}

class SendMessageChatUseCase {
    constructor(
        private chatsRepository: IChatsRepository,
        private usersRepository: IUsersRepository
    ) {}

    async execute({ chat_id, user_id, message }: IRequest): Promise<void> {
        const chat = await this.chatsRepository.findById(chat_id);
        if (!chat) {
            throw new SendMessageChatErrors.ChatNotFound();
        }

        const user = await this.usersRepository.findById(user_id);
        if (!user) {
            throw new SendMessageChatErrors.UserNotFound();
        }

        const newMessage = new Message(message, user);

        await this.chatsRepository.sendMessage({
            chat_id,
            message: newMessage,
        });
    }
}

export { SendMessageChatUseCase };
