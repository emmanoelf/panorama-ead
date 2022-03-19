import { Request, Response } from "express";

import { CreateCourseUseCase } from "./CreateCourseUseCase";

class CreateCourseController {
    constructor(private createCourseUseCase: CreateCourseUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, user_id, school_id } = request.body;
        const course = await this.createCourseUseCase.execute({
            name,
            user_id,
            school_id,
        });

        return response.status(201).json(course);
    }
}

export { CreateCourseController };
