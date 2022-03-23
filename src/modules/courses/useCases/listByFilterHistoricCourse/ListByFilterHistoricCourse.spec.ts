import { HistoricCoursesRepositoryInMemory } from "@modules/courses/repositories/in-memory/HistoricCoursesRepositoryInMemory";

import { ListByFilterHistoricCourseErrors } from "./ListByFilterHistoricCourseErrors";
import { ListByFilterHistoricCourseUseCase } from "./ListByFilterHistoricCourseUseCase";

let historicCoursesRepositoryInMemory: HistoricCoursesRepositoryInMemory;
let listByFilterHistoricCourseUseCase: ListByFilterHistoricCourseUseCase;

describe("List historic course by filter", () => {
    beforeEach(() => {
        historicCoursesRepositoryInMemory =
            new HistoricCoursesRepositoryInMemory();
        listByFilterHistoricCourseUseCase =
            new ListByFilterHistoricCourseUseCase(
                historicCoursesRepositoryInMemory
            );
    });

    it("Should be able to list historic course using filter by name course", async () => {
        const historicCourse = await historicCoursesRepositoryInMemory.create({
            id_course: "Some id",
            name_course: "Some name",
            former_coordinator_name: "Former coordinator name",
            former_coordinator_email: "Foormer coordinator email",
            current_coordinator_name: "Current coordinator name",
            current_coordinator_email: "Current coordinate email",
        });

        await historicCoursesRepositoryInMemory.create({
            id_course: "Another id",
            name_course: "Another name",
            former_coordinator_name: "Another Former coordinator name",
            former_coordinator_email: "Another Foormer coordinator email",
            current_coordinator_name: "Another Current coordinator name",
            current_coordinator_email: "Another Current coordinate email",
        });

        const search = await listByFilterHistoricCourseUseCase.execute({
            name_course: "Some name",
        });

        expect([historicCourse]).toEqual(search);
    });

    it("Should be able to list historic course using filter by former coordinator name", async () => {
        await historicCoursesRepositoryInMemory.create({
            id_course: "Some id",
            name_course: "Some name",
            former_coordinator_name: "Former coordinator name",
            former_coordinator_email: "Foormer coordinator email",
            current_coordinator_name: "Current coordinator name",
            current_coordinator_email: "Current coordinate email",
        });

        const historicCourse = await historicCoursesRepositoryInMemory.create({
            id_course: "Another id",
            name_course: "Another name",
            former_coordinator_name: "Another Former coordinator name",
            former_coordinator_email: "Another Foormer coordinator email",
            current_coordinator_name: "Another Current coordinator name",
            current_coordinator_email: "Another Current coordinate email",
        });

        const search = await listByFilterHistoricCourseUseCase.execute({
            former_coordinator_name: "Another Former coordinator name",
        });

        expect([historicCourse]).toEqual(search);
    });

    it("Should be able to list historic course using filter by current coordinator email", async () => {
        const historicCourse = await historicCoursesRepositoryInMemory.create({
            id_course: "Some id",
            name_course: "Some name",
            former_coordinator_name: "Former coordinator name",
            former_coordinator_email: "Foormer coordinator email",
            current_coordinator_name: "Current coordinator name",
            current_coordinator_email: "Current coordinatort email",
        });

        const search = await listByFilterHistoricCourseUseCase.execute({
            current_coordinator_email: "Current coordinatort email",
        });

        expect([historicCourse]).toEqual(search);
    });

    it("Should be able to list historic course using filter by former coordinator name with more than 1 register", async () => {
        await historicCoursesRepositoryInMemory.create({
            id_course: "Some id",
            name_course: "Some name",
            former_coordinator_name: "Former coordinator name",
            former_coordinator_email: "Foormer coordinator email",
            current_coordinator_name: "Same current coordinator name",
            current_coordinator_email: "Current coordinate email",
        });

        await historicCoursesRepositoryInMemory.create({
            id_course: "Another id",
            name_course: "Another name",
            former_coordinator_name: "Another Former coordinator name",
            former_coordinator_email: "Another Foormer coordinator email",
            current_coordinator_name: "Same current coordinator name",
            current_coordinator_email: "Another Current coordinate email",
        });

        const search = await listByFilterHistoricCourseUseCase.execute({
            current_coordinator_name: "Same current coordinator name",
        });

        expect(historicCoursesRepositoryInMemory.historicCourses).toEqual(
            search
        );
    });

    it("Should be return error message from registers not found with specific parameters", async () => {
        await historicCoursesRepositoryInMemory.create({
            id_course: "Some id",
            name_course: "Some name",
            former_coordinator_name: "Former coordinator name",
            former_coordinator_email: "Foormer coordinator email",
            current_coordinator_name: "Current coordinator name",
            current_coordinator_email: "Current coordinate email",
        });

        await expect(
            listByFilterHistoricCourseUseCase.execute({
                former_coordinator_name: "No such registers",
            })
        ).rejects.toEqual(
            new ListByFilterHistoricCourseErrors.NotFoundWithTheseParameters()
        );
    });
});
