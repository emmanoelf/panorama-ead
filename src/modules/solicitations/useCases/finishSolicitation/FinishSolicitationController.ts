import { Request, Response } from "express";

import { FinishSolicitationUseCase } from "./FinishSolicitationUseCase";

class FinishSolicitationController {
    constructor(private finishSolicitationUseCase: FinishSolicitationUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;

            await this.finishSolicitationUseCase.execute(id);

            return response.status(204).send();
        } catch (err) {
            return response.status(400).json(err);
        }
    }
}
export { FinishSolicitationController };
