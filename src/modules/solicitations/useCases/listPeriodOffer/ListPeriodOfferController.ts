import { Request, Response } from "express";

import { ListPeriodOfferUseCase } from "./ListPeriodOfferUseCase";

class ListPeriodOfferController {
    constructor(private listPeriodOfferUseCase: ListPeriodOfferUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const listAll = await this.listPeriodOfferUseCase.execute();
        return response.status(200).json(listAll);
    }
}
export { ListPeriodOfferController };
