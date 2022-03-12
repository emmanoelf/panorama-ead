import { Request, Response } from "express";

import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

class RefreshTokenController {
    constructor(private refreshTokenUseCase: RefreshTokenUseCase) {}

    async handle(request: Request, response: Response): Promise<Response> {
        const token =
            request.body.token ||
            request.headers["x-access-token"] ||
            request.query.token;

        const refresh_token = await this.refreshTokenUseCase.execute(token);

        return response.status(200).json(refresh_token);
    }
}

export { RefreshTokenController };
