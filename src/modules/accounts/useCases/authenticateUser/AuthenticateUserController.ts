import { Request, Response } from "express";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
    constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body;

        const userToken = await this.authenticateUserUseCase.execute({
            email,
            password,
        });

        return response.json(userToken);
    }
}
export { AuthenticateUserController };
