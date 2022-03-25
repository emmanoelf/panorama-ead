import { Request, Response } from "express";

import { CreatePeriodOfferUseCase } from "./CreatePeriodOfferUseCase";

class CreatePeriodOfferController {
    constructor(private createPeriodOfferUseCase: CreatePeriodOfferUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;
        const periodOffer = await this.createPeriodOfferUseCase.execute({
            name,
            description,
        });

        return response.status(200).json(periodOffer);
    }
}

export { CreatePeriodOfferController };
