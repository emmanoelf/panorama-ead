import { Request, Response } from "express";

import { ListAllHistoricCoursesUseCase } from "./ListAllHistoricCoursesUseCase";

class ListAllHistoricCoursesController {
    constructor(
        private listAllHistoricCoursesUseCase: ListAllHistoricCoursesUseCase
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const allHistoricCourses =
                await this.listAllHistoricCoursesUseCase.execute();
            return response.status(200).json(allHistoricCourses);
        } catch (err) {
            return response.status(500).json(err);
        }
    }
}

export { ListAllHistoricCoursesController };
