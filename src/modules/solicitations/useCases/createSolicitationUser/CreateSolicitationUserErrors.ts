// eslint-disable-next-line max-classes-per-file
import { AppError } from "@shared/errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CreateSolicitationUserErrors {
    export class SolicitationNotFound extends AppError {
        constructor() {
            super("A solicitação não foi encontrada", 404);
        }
    }
    export class NoUserHasBeenAllocated extends AppError {
        constructor() {
            super("Nenhum usuário foi alocado para essa solicitação.");
        }
    }
}
