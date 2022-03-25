import { AppError } from "@shared/errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace DeletePeriodOfferErrors {
    export class PeriodOfferNotFound extends AppError {
        constructor() {
            super("O periodo de oferta não foi encontrado", 404);
        }
    }
}
