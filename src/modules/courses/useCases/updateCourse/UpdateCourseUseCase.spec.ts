import { PermissionsRepositoryInMemory } from "@modules/accounts/repositories/in-memory/PermissionsRepositoryInMemory";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CoursesRepositoryInMemory } from "@modules/courses/repositories/in-memory/CoursesRepositoryInMemory";
import { HistoricCoursesRepositoryInMemory } from "@modules/courses/repositories/in-memory/HistoricCoursesRepositoryInMemory";
import { SchoolsRepositoryInMemory } from "@modules/courses/repositories/in-memory/SchoolsRepositoryInMemory";

import { UpdateCourseUseCase } from "./UpdateCourseUseCase";
import { UpdateCourseUseCaseErrors } from "./UpdateCourseUseCaseErrors";

let coursesRepositoryInMemory: CoursesRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let schoolsRepositoryInMemory: SchoolsRepositoryInMemory;
let permissionsRepositoryInMemory: PermissionsRepositoryInMemory;
let historicCoursesRepositoryInMemory: HistoricCoursesRepositoryInMemory;

let updateCourseUseCase: UpdateCourseUseCase;

describe("Update a course", () => {
    beforeEach(() => {
        coursesRepositoryInMemory = new CoursesRepositoryInMemory();
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        schoolsRepositoryInMemory = new SchoolsRepositoryInMemory();
        permissionsRepositoryInMemory = new PermissionsRepositoryInMemory();
        historicCoursesRepositoryInMemory =
            new HistoricCoursesRepositoryInMemory();

        updateCourseUseCase = new UpdateCourseUseCase(
            coursesRepositoryInMemory,
            usersRepositoryInMemory,
            schoolsRepositoryInMemory,
            permissionsRepositoryInMemory,
            historicCoursesRepositoryInMemory
        );
    });

    it("Should be able to update a course and save into HistoricCourses the old data", async () => {
        const school = await schoolsRepositoryInMemory.create({
            description: "School name",
        });

        const permission = await permissionsRepositoryInMemory.create({
            name: "Coordenador",
        });

        const user = await usersRepositoryInMemory.create({
            name: "User name",
            email: "email@email.com",
            password: "123",
            permission_id: permission.id,
            phone: "123456",
        });

        const course = await coursesRepositoryInMemory.create({
            name: "Course name",
            user_id: user.id,
            school_id: school.id,
        });

        const update = await updateCourseUseCase.execute({
            id: course.id,
            name: "New name",
            user_id: user.id,
            user,
            school_id: school.id,
            school,
        });

        expect(update.name).toEqual("New name");
        expect(historicCoursesRepositoryInMemory.historicCourses.length).toBe(
            1
        );
    });

    it("Should not be able to update a course with user is not coordinator or professor autor coordinator", async () => {
        const school = await schoolsRepositoryInMemory.create({
            description: "School name",
        });

        const permission = await permissionsRepositoryInMemory.create({
            name: "A Random permission",
        });

        const user = await usersRepositoryInMemory.create({
            name: "User name",
            email: "email@email.com",
            password: "123",
            permission_id: permission.id,
            phone: "123456",
        });

        const course = await coursesRepositoryInMemory.create({
            name: "Course name",
            user_id: user.id,
            school_id: school.id,
        });

        await expect(
            updateCourseUseCase.execute({
                id: course.id,
                name: "New name",
                user_id: user.id,
                user,
                school_id: school.id,
                school,
            })
        ).rejects.toEqual(
            new UpdateCourseUseCaseErrors.UserNotCoordinatorOrProfessorCoordinator()
        );
        expect(course.name).toEqual("Course name");
        expect(historicCoursesRepositoryInMemory.historicCourses.length).toBe(
            0
        );
    });
});
