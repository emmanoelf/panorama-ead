import { AppError } from "@shared/errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace CreateCourseErrors {
    export class CourseAlreadyExists extends AppError {
        constructor() {
            super("O curso já foi cadastrado");
        }
    }
}
