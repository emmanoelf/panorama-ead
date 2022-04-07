import { Request, Response } from "express";

import { DeleteSolicitationUseCase } from "./DeleteSolicitationUseCase";

class DeleteSolicitationController {
    constructor(private deleteSolicitationUseCase: DeleteSolicitationUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;

            await this.deleteSolicitationUseCase.execute(id);

            return response.status(204).send();
        } catch (err) {
            return response.status(500).json(err);
        }
    }
}

export { DeleteSolicitationController };
