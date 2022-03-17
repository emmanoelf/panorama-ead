// eslint-disable-next-line max-classes-per-file
import { AppError } from "@shared/errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace UpdateSchoolErrors {
    export class SchoolNotFound extends AppError {
        constructor() {
            super("A escola não foi encontrada", 404);
        }
    }
}
