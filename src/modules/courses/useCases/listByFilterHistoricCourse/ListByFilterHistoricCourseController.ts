import { Request, Response } from "express";

import { ListByFilterHistoricCourseUseCase } from "./ListByFilterHistoricCourseUseCase";

class ListByFilterHistoricCourseController {
    constructor(
        private listByFilterHistoricCourseUseCase: ListByFilterHistoricCourseUseCase
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const {
            id_course,
            name_course,
            former_coordinator_name,
            former_coordinator_email,
            current_coordinator_name,
            current_coordinator_email,
        } = request.query;

        const historicCourse =
            await this.listByFilterHistoricCourseUseCase.execute({
                id_course: id_course as string,
                name_course: name_course as string,
                former_coordinator_name: former_coordinator_name as string,
                former_coordinator_email: former_coordinator_email as string,
                current_coordinator_name: current_coordinator_name as string,
                current_coordinator_email: current_coordinator_email as string,
            });

        return response.status(200).json(historicCourse);
    }
}

export { ListByFilterHistoricCourseController };
