import { Request, Response } from "express";

import { SendMessageChatUseCase } from "./SendMessageChatUseCase";

class SendMessageController {
    constructor(private sendMessageChatUseCase: SendMessageChatUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.user;
            const { message } = request.body;
            const { chat_id } = request.params;

            await this.sendMessageChatUseCase.execute({
                chat_id,
                message,
                user_id: id,
            });

            return response.status(201).send();
        } catch (err) {
            return response.status(500).json(err);
        }
    }
}

export { SendMessageController };
