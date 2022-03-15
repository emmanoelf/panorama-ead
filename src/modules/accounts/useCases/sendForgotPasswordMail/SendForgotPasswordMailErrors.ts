import { AppError } from "../../../../shared/errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace SendForgotPasswordMail {
    export class UnregisteredUser extends AppError {
        constructor() {
            super("Usuário não cadastrado.");
        }
    }
}
