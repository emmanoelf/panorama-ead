import { AppError } from "../../../../shared/errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CreateUserErrors {
    export class EmailAlreadyExistsError extends AppError {
        constructor() {
            super("O email informado já foi utilizado!");
        }
    }
}
