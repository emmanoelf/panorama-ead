import { SchoolsRepositoryInMemory } from "@modules/courses/repositories/in-memory/SchoolsRepositoryInMemory";

import { CreateSchoolError } from "./CreateSchoolErrors";
import { CreateSchoolUseCase } from "./CreateSchoolUseCase";

let schoolsRepositoryInMemory: SchoolsRepositoryInMemory;
let createSchoolUseCase: CreateSchoolUseCase;

describe("Create School", () => {
    beforeEach(() => {
        schoolsRepositoryInMemory = new SchoolsRepositoryInMemory();
        createSchoolUseCase = new CreateSchoolUseCase(
            schoolsRepositoryInMemory
        );
    });

    it("Should be able to create a new school", async () => {
        const school = await createSchoolUseCase.execute({
            description: "Description test",
        });

        expect(school).toHaveProperty("id");
        expect(schoolsRepositoryInMemory.schools.length).toBe(1);
    });

    it("Should not be able to crate a new school with the same name", async () => {
        const school = await createSchoolUseCase.execute({
            description: "Description test",
        });

        await expect(createSchoolUseCase.execute(school)).rejects.toEqual(
            new CreateSchoolError.SchoolAlreadyExistsError()
        );
        expect(schoolsRepositoryInMemory.schools.length).toBe(1);
    });
});
