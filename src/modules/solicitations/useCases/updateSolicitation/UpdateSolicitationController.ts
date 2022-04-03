import { Request, Response } from "express";

import { UpdateSolicitationUseCase } from "./UpdateSolicitationUseCase";

class UpdateSolicitationController {
    constructor(private updateSolicitationUseCase: UpdateSolicitationUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;
            const {
                name,
                description,
                period_offer_id,
                course_id,
                expected_deadline,
                note,
            } = request.body;

            await this.updateSolicitationUseCase.execute({
                id,
                name,
                description,
                period_offer_id,
                course_id,
                expected_deadline,
                note,
            });

            return response.status(204).send();
        } catch (err) {
            return response.status(500).json(err);
        }
    }
}

export { UpdateSolicitationController };
