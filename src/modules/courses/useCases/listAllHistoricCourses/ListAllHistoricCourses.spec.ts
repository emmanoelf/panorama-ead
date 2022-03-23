import { HistoricCoursesRepositoryInMemory } from "@modules/courses/repositories/in-memory/HistoricCoursesRepositoryInMemory";

import { ListAllHistoricCoursesUseCase } from "./ListAllHistoricCoursesUseCase";

let historicCoursesRepositoryInMemory: HistoricCoursesRepositoryInMemory;
let listAllHistoricCoursesUseCase: ListAllHistoricCoursesUseCase;

describe("List all historic courses", () => {
    beforeEach(() => {
        historicCoursesRepositoryInMemory =
            new HistoricCoursesRepositoryInMemory();
        listAllHistoricCoursesUseCase = new ListAllHistoricCoursesUseCase(
            historicCoursesRepositoryInMemory
        );
    });

    it("Should be able to list all historic courses", async () => {
        await historicCoursesRepositoryInMemory.create({
            id_course: "Some id",
            name_course: "Some name",
            former_coordinator_name: "Former coordinator name",
            former_coordinator_email: "Foormer coordinator email",
            current_coordinator_name: "Current coordinator name",
            current_coordinator_email: "Current coordinate email",
        });

        const list = await listAllHistoricCoursesUseCase.execute();
        expect(historicCoursesRepositoryInMemory.historicCourses.length).toBe(
            1
        );
        expect(list).toEqual(historicCoursesRepositoryInMemory.historicCourses);
    });
});
