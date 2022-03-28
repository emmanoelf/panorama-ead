import { CoursesRepositoryInMemory } from "@modules/courses/repositories/in-memory/CoursesRepositoryInMemory";
import { PeriodOffersRepositoryInMemory } from "@modules/solicitations/repositories/in-memory/PeriodOffersRepositoryInMemory";
import { SolicitationsRepositoryInMemory } from "@modules/solicitations/repositories/in-memory/SolicitationsRepositoryInMemory";

import { CreateSolicitationErrors } from "./CreateSolicitationErrors";
import { CreateSolicitationUseCase } from "./CreateSolicitationUseCase";

let solicitationsRepositoryInMemory: SolicitationsRepositoryInMemory;
let periodOffersRepositoryInMemory: PeriodOffersRepositoryInMemory;
let coursesRepositoryInMemory: CoursesRepositoryInMemory;
let createSolicitationUseCase: CreateSolicitationUseCase;

describe("Create solicitation use case", () => {
    beforeEach(() => {
        solicitationsRepositoryInMemory = new SolicitationsRepositoryInMemory();
        periodOffersRepositoryInMemory = new PeriodOffersRepositoryInMemory();
        coursesRepositoryInMemory = new CoursesRepositoryInMemory();
        createSolicitationUseCase = new CreateSolicitationUseCase(
            solicitationsRepositoryInMemory,
            periodOffersRepositoryInMemory,
            coursesRepositoryInMemory
        );
    });

    it("Should be able to create a new solicitation", async () => {
        const periodOffer = await periodOffersRepositoryInMemory.create({
            name: "Period name test",
            description: "Description test",
        });

        const course = await coursesRepositoryInMemory.create({
            name: "Course name",
            school_id: "school_id",
            user_id: "user_id",
        });

        const solicitation = await createSolicitationUseCase.execute({
            name: "Solicitation name",
            description: "Description name",
            period_offer_id: periodOffer.id,
            course_id: course.id,
            expected_deadline: new Date(),
        });

        expect(solicitation).toHaveProperty("id");
        expect(solicitationsRepositoryInMemory.solicitations.length).toBe(1);
    });

    it("Should not be able to create a new solicitation with same name", async () => {
        const periodOffer = await periodOffersRepositoryInMemory.create({
            name: "Period name test",
            description: "Description test",
        });

        const course = await coursesRepositoryInMemory.create({
            name: "Course name",
            school_id: "school_id",
            user_id: "user_id",
        });

        await createSolicitationUseCase.execute({
            name: "Solicitation name",
            description: "Description name",
            period_offer_id: periodOffer.id,
            course_id: course.id,
            expected_deadline: new Date(),
        });

        await expect(
            createSolicitationUseCase.execute({
                name: "Solicitation name",
                description: "Description name",
                period_offer_id: periodOffer.id,
                course_id: course.id,
                expected_deadline: new Date(),
            })
        ).rejects.toEqual(
            new CreateSolicitationErrors.SolicitationAlreadyExists()
        );
        expect(solicitationsRepositoryInMemory.solicitations.length).toBe(1);
    });

    it("Should not be able to create a new solicitation if period offer not exists", async () => {
        const course = await coursesRepositoryInMemory.create({
            name: "Course name",
            school_id: "school_id",
            user_id: "user_id",
        });

        await expect(
            createSolicitationUseCase.execute({
                name: "Solicitation name",
                description: "Description name",
                period_offer_id: "periodOffer.id",
                course_id: course.id,
                expected_deadline: new Date(),
            })
        ).rejects.toEqual(new CreateSolicitationErrors.PeriodOfferNotFound());
        expect(solicitationsRepositoryInMemory.solicitations.length).toBe(0);
    });

    it("Should not be able to create a new solicitation if course not exists", async () => {
        const periodOffer = await periodOffersRepositoryInMemory.create({
            name: "Period name test",
            description: "Description test",
        });

        await expect(
            createSolicitationUseCase.execute({
                name: "Solicitation name",
                description: "Description name",
                period_offer_id: periodOffer.id,
                course_id: "course.id",
                expected_deadline: new Date(),
            })
        ).rejects.toEqual(new CreateSolicitationErrors.CourseNotFound());
        expect(solicitationsRepositoryInMemory.solicitations.length).toBe(0);
    });
});
