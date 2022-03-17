import { AppError } from "@shared/errors/AppError";

export class CreatePermissionError extends AppError {
    constructor() {
        super("Permisão já existe", 400);
    }
}
