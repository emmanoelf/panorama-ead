// eslint-disable-next-line max-classes-per-file
import { AppError } from "@shared/errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace UpdatePeriodOfferErrors {
    export class PeriodOfferNotFound extends AppError {
        constructor() {
            super("O período de oferta não foi encontrado", 404);
        }
    }

    export class PeriodOfferAlreadyExists extends AppError {
        constructor() {
            super("Esse nome de período de oferta já foi cadastrado", 400);
        }
    }
}
