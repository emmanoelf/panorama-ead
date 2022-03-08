import { Request, Response } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
    constructor(private createUserUseCase: CreateUserUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { permission_id, name, email, password, phone, ra } =
            request.body;

        const user = await this.createUserUseCase.execute({
            permission_id,
            name,
            email,
            password,
            phone,
            ra,
        });

        return response.status(201).json(user);
    }
}

export { CreateUserController };
