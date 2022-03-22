import { HistoricCoursesRepositoryInMemory } from "@modules/courses/repositories/in-memory/HistoricCoursesRepositoryInMemory";

import { UpdateNoteHistoricCourseUseCase } from "./UpdateNoteHistoricCourseUseCase";

let historicCoursesRepositoryInMemory: HistoricCoursesRepositoryInMemory;
let updateNoteHistoricCourseUseCase: UpdateNoteHistoricCourseUseCase;

describe("Update note in historic course", () => {
    beforeEach(() => {
        historicCoursesRepositoryInMemory =
            new HistoricCoursesRepositoryInMemory();
        updateNoteHistoricCourseUseCase = new UpdateNoteHistoricCourseUseCase(
            historicCoursesRepositoryInMemory
        );
    });

    it("Should be able to update a note in historic course", async () => {
        const historicCourse = await historicCoursesRepositoryInMemory.create({
            id_course: "Some id_course",
            name_course: "Some name course",
            former_coordinator_name: "Some former name coordinator",
            former_coordinator_email: "Some former email coordinator",
            current_coordinator_name: "Some current name coordinator",
            current_coordinator_email: "Some current email coordinator",
        });

        await updateNoteHistoricCourseUseCase.execute({
            id: historicCourse.id,
            note: "Note now is not null anymore",
        });

        expect(historicCourse.note).toEqual("Note now is not null anymore");
    });
});
