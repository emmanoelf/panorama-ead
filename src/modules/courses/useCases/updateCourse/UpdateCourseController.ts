import { Request, Response } from "express";

import { UpdateCourseUseCase } from "./UpdateCourseUseCase";

class UpdateCourseController {
    constructor(private updateCourseUseCase: UpdateCourseUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { name, user_id, user, school_id, school } = request.body;

        const update = await this.updateCourseUseCase.execute({
            id,
            name,
            user_id,
            user,
            school_id,
            school,
        });

        return response.status(201).json(update);
    }
}
export { UpdateCourseController };
