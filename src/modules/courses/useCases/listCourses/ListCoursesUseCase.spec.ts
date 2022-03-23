import { CoursesRepositoryInMemory } from "@modules/courses/repositories/in-memory/CoursesRepositoryInMemory";

import { ListCoursesUseCase } from "./ListCoursesUseCase";

let coursesRepositoryInMemory: CoursesRepositoryInMemory;
let listCoursesUseCase: ListCoursesUseCase;

describe("List all courses", () => {
    beforeEach(() => {
        coursesRepositoryInMemory = new CoursesRepositoryInMemory();
        listCoursesUseCase = new ListCoursesUseCase(coursesRepositoryInMemory);
    });

    it("Should be able to return all courses registered", async () => {
        await coursesRepositoryInMemory.create({
            name: "Course name",
            user_id: "user_id",
            school_id: "school_id",
        });

        await coursesRepositoryInMemory.create({
            name: "Another",
            user_id: "another_user_id",
            school_id: "another_school_id",
        });

        const search = await listCoursesUseCase.execute();

        expect(coursesRepositoryInMemory.courses).toEqual(search);
        expect(coursesRepositoryInMemory.courses.length).toBe(2);
    });
});
