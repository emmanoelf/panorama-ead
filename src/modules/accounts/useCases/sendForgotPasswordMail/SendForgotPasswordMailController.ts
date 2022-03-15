import { Request, Response } from "express";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

class SendForgotPasswordMailController {
    constructor(
        private sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase
    ) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const { email } = request.body;

        await this.sendForgotPasswordMailUseCase.execute(email);

        return response.status(200).send();
    }
}

export { SendForgotPasswordMailController };
