import { AppError } from "@shared/errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CreateSolicitationErrors {
    export class SolicitationAlreadyExists extends AppError {
        constructor() {
            super("Já existe uma solicitação com esse nome criada", 400);
        }
    }
}
