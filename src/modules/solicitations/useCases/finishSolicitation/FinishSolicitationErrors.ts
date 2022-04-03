// eslint-disable-next-line max-classes-per-file
import { AppError } from "@shared/errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace FinishSolicitationErrors {
    export class SolicitationNotFound extends AppError {
        constructor() {
            super("A solicitação não foi encontrada.", 404);
        }
    }
    export class NoUserHasBeenAllocated extends AppError {
        constructor() {
            super(
                "A solicitação não pode ser encerrada enquanto não houver pelo menos um professor para ministrar.",
                406
            );
        }
    }
}
