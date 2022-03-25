import { Request, Response } from "express";

import { DeletePeriodOfferUseCase } from "./DeletePeriodOfferUseCase";

class DeletePeriodOfferController {
    constructor(private deletePeriodOfferUseCase: DeletePeriodOfferUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        await this.deletePeriodOfferUseCase.execute(id);

        return response.status(204).send();
    }
}
export { DeletePeriodOfferController };
