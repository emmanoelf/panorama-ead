import { Request, Response } from "express";

import { ListCoursesUseCase } from "./ListCoursesUseCase";

class ListCoursesController {
    constructor(private listCoursesUseCase: ListCoursesUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const listAll = await this.listCoursesUseCase.execute();
        return response.status(200).json(listAll);
    }
}

export { ListCoursesController };
