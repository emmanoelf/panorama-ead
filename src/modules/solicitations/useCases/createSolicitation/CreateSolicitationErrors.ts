// eslint-disable-next-line max-classes-per-file
import { AppError } from "@shared/errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CreateSolicitationErrors {
    export class SolicitationAlreadyExists extends AppError {
        constructor() {
            super("Já existe uma solicitação com esse nome criada", 400);
        }
    }

    export class PeriodOfferNotFound extends AppError {
        constructor() {
            super("O período de oferta informado não foi encontrado.", 404);
        }
    }

    export class CourseNotFound extends AppError {
        constructor() {
            super("O curso informado não foi encontrado.", 404);
        }
    }
}
