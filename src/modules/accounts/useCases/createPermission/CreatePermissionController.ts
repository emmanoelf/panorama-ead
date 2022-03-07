import { Request, Response } from "express";

import { CreatePermissionUseCase } from "./CreatePermissionUseCase";

class CreatePermissionController {
    constructor(private createPermissionUseCase: CreatePermissionUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { name } = request.body;

        const permission = await this.createPermissionUseCase.execute({ name });

        return response.json(permission);
    }
}

export { CreatePermissionController };
