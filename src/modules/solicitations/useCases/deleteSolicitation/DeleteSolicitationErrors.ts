import { AppError } from "@shared/errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DeleteSolicitationErrors {
    export class SolicitationNotFound extends AppError {
        constructor() {
            super("A solicitação não foi encontrada.", 404);
        }
    }
}
