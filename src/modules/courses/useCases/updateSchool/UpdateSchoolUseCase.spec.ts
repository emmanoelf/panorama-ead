import { SchoolsRepositoryInMemory } from "@modules/courses/repositories/in-memory/SchoolsRepositoryInMemory";

import { CreateSchoolError } from "../createSchool/CreateSchoolErrors";
import { UpdateSchoolErrors } from "./UpdateSchoolErrors";
import { UpdateSchoolUseCase } from "./UpdateSchoolUseCase";

let schoolsRepositoryInMemory: SchoolsRepositoryInMemory;
let updateSchoolUseCase: UpdateSchoolUseCase;

describe("Update School", () => {
    beforeEach(() => {
        schoolsRepositoryInMemory = new SchoolsRepositoryInMemory();
        updateSchoolUseCase = new UpdateSchoolUseCase(
            schoolsRepositoryInMemory
        );
    });

    it("Should be able to update a school", async () => {
        const school = await schoolsRepositoryInMemory.create({
            description: "description test",
        });

        await updateSchoolUseCase.execute({
            id: school.id,
            description: "New description",
        });

        expect(school.description).toEqual("New description");
        expect(schoolsRepositoryInMemory.schools.length).toBe(1);
    });

    it("Should not be able to update a school with existing name", async () => {
        await schoolsRepositoryInMemory.create({
            description: "description test",
        });

        const school2 = await schoolsRepositoryInMemory.create({
            description: "not possible update",
        });

        await expect(
            updateSchoolUseCase.execute({
                id: school2.id,
                description: school2.description,
            })
        ).rejects.toEqual(new CreateSchoolError.SchoolAlreadyExistsError());
        expect(schoolsRepositoryInMemory.schools.length).toBe(2);
        expect(school2.description).toBe("not possible update");
    });

    it("Should not be able to update school with no exists", async () => {
        await expect(
            updateSchoolUseCase.execute({
                id: "some id",
                description: "some description",
            })
        ).rejects.toEqual(new UpdateSchoolErrors.SchoolNotFound());
    });
});
