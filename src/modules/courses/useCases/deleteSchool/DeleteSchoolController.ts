import { Request, Response } from "express";

import { DeleteSchoolUseCase } from "./DeleteSchoolUseCase";

class DeleteSchoolController {
    constructor(private deleteSchoolUseCase: DeleteSchoolUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        await this.deleteSchoolUseCase.execute(id);

        return response.status(204).send();
    }
}

export { DeleteSchoolController };
