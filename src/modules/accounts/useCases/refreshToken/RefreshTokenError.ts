import { AppError } from "../../../../shared/errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace RefreshTokenError {
    export class RefreshTokenNotFound extends AppError {
        constructor() {
            super("Refresh token não encontado.");
        }
    }
}
