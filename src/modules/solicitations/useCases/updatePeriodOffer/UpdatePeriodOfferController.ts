import { Request, Response } from "express";

import { UpdatePeriodOfferUseCase } from "./UpdatePeriodOfferUseCase";

class UpdatePeriodOfferController {
    constructor(private updatePeriodOfferUseCase: UpdatePeriodOfferUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name, description } = request.body;

        await this.updatePeriodOfferUseCase.execute({
            id,
            name,
            description,
        });

        return response.status(204).send();
    }
}

export { UpdatePeriodOfferController };
