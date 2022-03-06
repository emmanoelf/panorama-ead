import { AppError } from "../../../../shared/errors/AppError";

export class CreatePermissionError extends AppError {
    constructor() {
        super("Essa permissão já existe!");
    }
}
