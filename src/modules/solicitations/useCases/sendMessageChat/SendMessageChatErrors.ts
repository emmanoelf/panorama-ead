// eslint-disable-next-line max-classes-per-file
import { AppError } from "@shared/errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace SendMessageChatErrors {
    export class ChatNotFound extends AppError {
        constructor() {
            super("O chat não foi encontrado", 404);
        }
    }
    export class UserNotFound extends AppError {
        constructor() {
            super("O usuário não foi encontrado", 404);
        }
    }
}
