import { AppError } from "@shared/errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ListByFilterHistoricCourseErrors {
    export class NotFoundWithTheseParameters extends AppError {
        constructor() {
            super(
                "Nenhum registro encontrado com os parâmetros informados",
                404
            );
        }
    }
}
