import { AppError } from "../../../../shared/errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AuthenticateUserError {
    export class EmailOrPasswordIncorrect extends AppError {
        constructor() {
            super("Email ou senha incorretos!");
        }
    }
}
