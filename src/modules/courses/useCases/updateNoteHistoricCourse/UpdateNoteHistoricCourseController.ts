import { Request, Response } from "express";

import { UpdateNoteHistoricCourseUseCase } from "./UpdateNoteHistoricCourseUseCase";

class UpdateNoteHistoricCourseController {
    constructor(
        private updateNoteHistoricCourseUseCase: UpdateNoteHistoricCourseUseCase
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;
            const { note } = request.body;

            await this.updateNoteHistoricCourseUseCase.execute({ id, note });
            return response.status(204).send();
        } catch (err) {
            return response.status(500).json(err);
        }
    }
}

export { UpdateNoteHistoricCourseController };
