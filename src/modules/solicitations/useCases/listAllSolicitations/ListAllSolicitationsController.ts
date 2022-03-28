import { Request, Response } from "express";

import { ListAllSolicitationsUseCase } from "./ListAllSolicitationsUseCase";

class ListAllSolicitationsController {
    constructor(
        private listAllSolicitationsUseCase: ListAllSolicitationsUseCase
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const listAll = await this.listAllSolicitationsUseCase.execute();
        return response.status(200).json(listAll);
    }
}

export { ListAllSolicitationsController };
