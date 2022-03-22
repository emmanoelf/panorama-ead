import { CoursesRepositoryInMemory } from "@modules/courses/repositories/in-memory/CoursesRepositoryInMemory";

import { CreateCourseErrors } from "./CreateCourseErrors";
import { CreateCourseUseCase } from "./CreateCourseUseCase";

let coursesRepositoryInMemory: CoursesRepositoryInMemory;
let createCourseUseCase: CreateCourseUseCase;

describe("Create a course", () => {
    beforeEach(() => {
        coursesRepositoryInMemory = new CoursesRepositoryInMemory();
        createCourseUseCase = new CreateCourseUseCase(
            coursesRepositoryInMemory
        );
    });

    it("Should be able to create new course", async () => {
        const course = await createCourseUseCase.execute({
            name: "Name course",
            user_id: "some user_id",
            school_id: "some school_id",
        });
        expect(course).toHaveProperty("id");
        expect(coursesRepositoryInMemory.courses.length).toBe(1);
    });

    it("Should not be able to crate a new course with the same name", async () => {
        const course = await createCourseUseCase.execute({
            name: "Name course",
            user_id: "some user_id",
            school_id: "some school_id",
        });

        await expect(createCourseUseCase.execute(course)).rejects.toEqual(
            new CreateCourseErrors.CourseAlreadyExists()
        );
        expect(coursesRepositoryInMemory.courses.length).toBe(1);
    });
});
