import { Request, Response } from "express";

import { CreateSolicitationUseCase } from "./CreateSolicitationUseCase";

class CreateSolicitationController {
    constructor(private createSolicitationUseCase: CreateSolicitationUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const {
            name,
            description,
            expected_deadline,
            period_offer_id,
            course_id,
            note,
        } = request.body;

        const solicitation = await this.createSolicitationUseCase.execute({
            name,
            description,
            expected_deadline,
            period_offer_id,
            course_id,
            note,
        });

        return response.status(201).json(solicitation);
    }
}

export { CreateSolicitationController };
