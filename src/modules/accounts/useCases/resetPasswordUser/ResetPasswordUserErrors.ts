// eslint-disable-next-line max-classes-per-file
import { AppError } from "../../../../shared/errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ResetPasswordUserErrors {
    export class ExpiredToken extends AppError {
        constructor() {
            super(
                "Token expirado. Por favor, solicite a troca de senha novamente."
            );
        }
    }

    export class InvalidToken extends AppError {
        constructor() {
            super("Token inválido");
        }
    }
}
