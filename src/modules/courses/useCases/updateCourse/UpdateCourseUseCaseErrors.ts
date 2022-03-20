// eslint-disable-next-line max-classes-per-file
import { AppError } from "@shared/errors/AppError";

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace UpdateCourseUseCaseErrors {
    export class CourseNotFound extends AppError {
        constructor() {
            super("O curso não foi encontrado.");
        }
    }

    export class UserNotFound extends AppError {
        constructor() {
            super("O usuário não foi encontrado.");
        }
    }

    export class SchoolNotFound extends AppError {
        constructor() {
            super("A escola não foi encontrada.");
        }
    }

    export class NameRegistered extends AppError {
        constructor() {
            super("O nome deste curso já está em uso.");
        }
    }

    export class UserNotCoordinatorOrProfessorCoordinator extends AppError {
        constructor() {
            super(
                "O usuário selecionado não é coordenador e nem professor coordenador"
            );
        }
    }
}
