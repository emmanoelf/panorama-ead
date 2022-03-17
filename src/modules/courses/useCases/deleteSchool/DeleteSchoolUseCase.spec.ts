import { SchoolsRepositoryInMemory } from "@modules/courses/repositories/in-memory/SchoolsRepositoryInMemory";

import { DeleteSchoolErrors } from "./DeleteSchoolErrors";
import { DeleteSchoolUseCase } from "./DeleteSchoolUseCase";

let schoolsRepositoryInMemory: SchoolsRepositoryInMemory;
let deleteSchoolUseCase: DeleteSchoolUseCase;

describe("Delete school", () => {
    beforeEach(() => {
        schoolsRepositoryInMemory = new SchoolsRepositoryInMemory();
        deleteSchoolUseCase = new DeleteSchoolUseCase(
            schoolsRepositoryInMemory
        );
    });

    it("Should be able to delete a school", async () => {
        const school = await schoolsRepositoryInMemory.create({
            description: "School test",
        });

        await deleteSchoolUseCase.execute(school.id);

        expect(schoolsRepositoryInMemory.schools.length).toBe(0);
    });

    it("Should not be able to delete a school with no exists", async () => {
        await expect(deleteSchoolUseCase.execute("some id")).rejects.toEqual(
            new DeleteSchoolErrors.SchoolNotFound()
        );
    });
});
