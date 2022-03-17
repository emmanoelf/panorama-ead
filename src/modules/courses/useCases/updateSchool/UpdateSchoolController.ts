import { Request, Response } from "express";

import { UpdateSchoolUseCase } from "./UpdateSchoolUseCase";

class UpdateSchoolController {
    constructor(private updateSchoolUseCase: UpdateSchoolUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;
        const { description } = request.body;

        await this.updateSchoolUseCase.execute({ id, description });

        return response.status(204).send();
    }
}

export { UpdateSchoolController };
