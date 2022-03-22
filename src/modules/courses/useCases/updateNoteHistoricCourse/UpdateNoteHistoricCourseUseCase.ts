import { IHistoricCoursesRepository } from "@modules/courses/repositories/IHistoricCoursesRepository";

import { UpdateNoteHistoricCourseErrors } from "./UpdateNoteHistoricCourseErrors";

interface IRequest {
    id: string;
    note: string;
}

class UpdateNoteHistoricCourseUseCase {
    constructor(
        private historicCoursesRepository: IHistoricCoursesRepository
    ) {}

    async execute({ id, note }: IRequest): Promise<void> {
        const historicCourse = await this.historicCoursesRepository.findById(
            id
        );

        if (!historicCourse) {
            throw new UpdateNoteHistoricCourseErrors.HistoricCourseNotFound();
        }

        this.historicCoursesRepository.updateNote(id, note);
    }
}

export { UpdateNoteHistoricCourseUseCase };
