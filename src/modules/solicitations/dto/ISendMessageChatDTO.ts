import { Message } from "../infra/typeorm/entities/Message";

interface ISendMessageChatDTO {
    chat_id: string;
    message: Message;
}

export { ISendMessageChatDTO };
