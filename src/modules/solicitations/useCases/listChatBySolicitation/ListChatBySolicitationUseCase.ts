import { Chat } from "@modules/solicitations/infra/typeorm/entities/Chat";
import { IChatsRepository } from "@modules/solicitations/repositories/IChatsRepository";

import { ListChatBySolicitationErrors } from "./ListChatBySolicitationErrors";

class ListChatBySolicitationUseCase {
    constructor(private chatsRepository: IChatsRepository) {}

    async execute(solicitation_id: string): Promise<Chat> {
        const chat = await this.chatsRepository.listBySolicitation(
            solicitation_id
        );
        if (!chat) {
            throw new ListChatBySolicitationErrors.ChatNotFound();
        }

        return chat;
    }
}

export { ListChatBySolicitationUseCase };
