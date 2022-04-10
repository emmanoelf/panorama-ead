import { Request, Response } from "express";

import { ListChatBySolicitationUseCase } from "./ListChatBySolicitationUseCase";

class ListChatBySolicitationController {
    constructor(
        private listChatBySolicitationUseCase: ListChatBySolicitationUseCase
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { solicitation_id } = request.params;
            const chat = await this.listChatBySolicitationUseCase.execute(
                solicitation_id
            );

            return response.status(200).json(chat);
        } catch (err) {
            return response.status(500).json(err);
        }
    }
}

export { ListChatBySolicitationController };
