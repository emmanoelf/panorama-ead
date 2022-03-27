import { Request, Response } from "express";

import { CreateSolicitationUserUseCase } from "./CreateSolicitationUserUseCase";

class CreateSolicitationUserController {
    constructor(
        private createSolicitationUserUseCase: CreateSolicitationUserUseCase
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { users_id } = request.body;

        const solicitationUser =
            await this.createSolicitationUserUseCase.execute({
                solicitation_id: id,
                users_id,
            });

        return response.status(200).json(solicitationUser);
    }
}

export { CreateSolicitationUserController };
