import { AppError } from "@shared/errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ListChatBySolicitationErrors {
    export class ChatNotFound extends AppError {
        constructor() {
            super("O chat não foi encontrado", 404);
        }
    }
}
