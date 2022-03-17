import { Request, Response } from "express";

import { CreateSchoolUseCase } from "./CreateSchoolUseCase";

class CreateSchoolController {
    constructor(private createSchoolUseCase: CreateSchoolUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { description } = request.body;

        const school = await this.createSchoolUseCase.execute({ description });

        return response.status(201).json(school);
    }
}

export { CreateSchoolController };
