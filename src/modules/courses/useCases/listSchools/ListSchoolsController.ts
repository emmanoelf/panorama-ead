import { Request, Response } from "express";

import { ListSchoolsUseCase } from "./ListSchoolsUseCase";

class ListSchoolsController {
    constructor(private listSchoolsUseCase: ListSchoolsUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const listAll = await this.listSchoolsUseCase.execute();

        return response.status(200).json(listAll);
    }
}

export { ListSchoolsController };
