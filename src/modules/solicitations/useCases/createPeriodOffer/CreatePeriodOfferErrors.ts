import { AppError } from "@shared/errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CreatePeriodOfferErrors {
    export class PeriodOfferAlreadyExists extends AppError {
        constructor() {
            super("O período informado já foi cadastrado.", 400);
        }
    }
}
