// eslint-disable-next-line max-classes-per-file
import { AppError } from "@shared/errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace UpdateSolicitationsErrors {
    export class SolicitationNotFound extends AppError {
        constructor() {
            super("A solicitação informada não foi encontrado.", 404);
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
    export class SolicitationNameAlreadyRegistered extends AppError {
        constructor() {
            super("O nome da solicitação já foi registrado", 400);
        }
    }
    export class SolicitationIsClosed extends AppError {
        constructor() {
            super(
                "A solicitação já foi encerrada, por esse motivo, não é possível fazer alterações.",
                400
            );
        }
    }
}
