import { SchoolsRepositoryInMemory } from "@modules/courses/repositories/in-memory/SchoolsRepositoryInMemory";

import { ListSchoolsUseCase } from "./ListSchoolsUseCase";

let schoolsRepositoryInMemory: SchoolsRepositoryInMemory;
let listSchoolsUseCase: ListSchoolsUseCase;

describe("List all schools", () => {
    beforeEach(() => {
        schoolsRepositoryInMemory = new SchoolsRepositoryInMemory();
        listSchoolsUseCase = new ListSchoolsUseCase(schoolsRepositoryInMemory);
    });

    it("Should be able to return all schools registered", async () => {
        const school = await schoolsRepositoryInMemory.create({
            description: "School 1",
        });

        const school2 = await schoolsRepositoryInMemory.create({
            description: "School 2",
        });

        const schools = await listSchoolsUseCase.execute();

        expect(schools).toEqual([school, school2]);
        expect(schoolsRepositoryInMemory.schools.length).toBe(2);
    });
});
