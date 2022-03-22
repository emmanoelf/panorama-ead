import { AppError } from "@shared/errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace UpdateNoteHistoricCourseErrors {
    export class HistoricCourseNotFound extends AppError {
        constructor() {
            super("O histórico do curso não foi encontrado", 404);
        }
    }
}
