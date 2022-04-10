import { ISendMessageChatDTO } from "../dto/ISendMessageChatDTO";
import { Chat } from "../infra/typeorm/entities/Chat";

interface IChatsRepository {
    create(solicitation_id: string): Promise<Chat>;
    findById(id: string): Promise<Chat>;
    sendMessage(data: ISendMessageChatDTO): Promise<void>;
    listBySolicitation(solicitation_id: string): Promise<Chat>;
}

export { IChatsRepository };
