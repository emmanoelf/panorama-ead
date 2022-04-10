import { getRepository, Repository } from "typeorm";

import { ISendMessageChatDTO } from "@modules/solicitations/dto/ISendMessageChatDTO";
import { IChatsRepository } from "@modules/solicitations/repositories/IChatsRepository";

import { Chat } from "../entities/Chat";

class ChatsRepository implements IChatsRepository {
    private repository: Repository<Chat>;

    constructor() {
        this.repository = getRepository(Chat);
    }

    async create(solicitation_id: string): Promise<Chat> {
        const chat = this.repository.create({
            solicitation_id,
        });

        await this.repository.save(chat);
        return chat;
    }

    async findById(id: string): Promise<Chat> {
        const chat = await this.repository.findOne(id);
        return chat;
    }

    async sendMessage({
        chat_id,
        message,
    }: ISendMessageChatDTO): Promise<void> {
        const chat = await this.repository.findOne(chat_id);
        chat.messages = [...chat.messages, message];
        chat.updated_at = new Date();
        await this.repository.save(chat);
    }

    async listBySolicitation(solicitation_id: string): Promise<Chat> {
        const chat = await this.repository.findOne(solicitation_id);
        return chat;
    }
}

export { ChatsRepository };
