import { AppError } from "@shared/errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CreateSchoolError {
    export class SchoolAlreadyExistsError extends AppError {
        constructor() {
            super("A escola informada já foi cadastrada.");
        }
    }
}
