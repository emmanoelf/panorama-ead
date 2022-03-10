import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../../../../modules/accounts/repositories/UsersRepository";
import { AuthorizationError } from "../../../errors/AuthorizationError";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AuthorizationError.TokenMissing();
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(
            token,
            process.env.SECRET_TOKEN_APP
        ) as IPayload;

        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new AuthorizationError.UserDoesNotExists();
        }

        request.user = {
            id: user_id,
            permission_id: user.permission_id,
        };

        next();
    } catch {
        throw new AuthorizationError.InvalidToken();
    }
}
