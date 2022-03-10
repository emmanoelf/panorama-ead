// eslint-disable-next-line max-classes-per-file
import { AppError } from "./AppError";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AuthorizationError {
    export class TokenMissing extends AppError {
        constructor() {
            super(
                "Token não enviado. Usuário provavelmente não está logado. Por favor, faça login novamente.",
                401
            );
        }
    }

    export class InvalidToken extends AppError {
        constructor() {
            super("Token inválido.", 403);
        }
    }

    export class UserDoesNotExists extends AppError {
        constructor() {
            super("Usuário não cadastrado.");
        }
    }
}
