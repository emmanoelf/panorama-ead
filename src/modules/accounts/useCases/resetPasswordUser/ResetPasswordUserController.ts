import { Request, Response } from "express";

import { ResetPasswordUserUseCase } from "./ResetPasswordUserUseCase";

class ResetPasswordUserController {
    constructor(private resetPasswordUserUseCase: ResetPasswordUserUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { token } = request.query;
        const { password } = request.body;

        await this.resetPasswordUserUseCase.execute({
            token: String(token),
            password,
        });

        return response.send();
    }
}

export { ResetPasswordUserController };
