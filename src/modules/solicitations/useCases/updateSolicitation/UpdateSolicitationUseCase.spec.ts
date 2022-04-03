import { CoursesRepositoryInMemory } from "@modules/courses/repositories/in-memory/CoursesRepositoryInMemory";
import { PeriodOffersRepositoryInMemory } from "@modules/solicitations/repositories/in-memory/PeriodOffersRepositoryInMemory";
import { SolicitationsRepositoryInMemory } from "@modules/solicitations/repositories/in-memory/SolicitationsRepositoryInMemory";

import { UpdateSolicitationsErrors } from "./UpdateSolicitationErrors";
import { UpdateSolicitationUseCase } from "./UpdateSolicitationUseCase";

let solicitationsRepositoryInMemory: SolicitationsRepositoryInMemory;
let periodOffersRepositoryInMemory: PeriodOffersRepositoryInMemory;
let coursesRepositoryInMemory: CoursesRepositoryInMemory;
let updateSolicitationsUseCase: UpdateSolicitationUseCase;

describe("Update Solicitation", () => {
    beforeEach(() => {
        solicitationsRepositoryInMemory = new SolicitationsRepositoryInMemory();
        periodOffersRepositoryInMemory = new PeriodOffersRepositoryInMemory();
        coursesRepositoryInMemory = new CoursesRepositoryInMemory();
        updateSolicitationsUseCase = new UpdateSolicitationUseCase(
            solicitationsRepositoryInMemory,
            periodOffersRepositoryInMemory,
            coursesRepositoryInMemory
        );
    });

    it("Should be able to update a solicitation", async () => {
        const course = await coursesRepositoryInMemory.create({
            name: "name course",
            school_id: "some school id",
            user_id: "some user id",
        });

        const periodOffer = await periodOffersRepositoryInMemory.create({
            name: "Name period offer",
            description: "description period offer",
        });

        const solicitation = await solicitationsRepositoryInMemory.create({
            name: "Some name solicitation",
            description: "Some solicitation description",
            course_id: "course.id",
            period_offer_id: "periodOffer.id",
            expected_deadline: new Date(),
        });

        await updateSolicitationsUseCase.execute({
            id: solicitation.id,
            name: "Change name",
            description: "Change description",
            course_id: course.id,
            period_offer_id: periodOffer.id,
            note: "Added note",
        });

        expect(solicitation.period_offer_id).toEqual(periodOffer.id);
        expect(solicitation.name).toEqual("Change name");
    });

    it("Should not be able to update a solicitation if already finished", async () => {
        const course = await coursesRepositoryInMemory.create({
            name: "name course",
            school_id: "some school id",
            user_id: "some user id",
        });

        const periodOffer = await periodOffersRepositoryInMemory.create({
            name: "Name period offer",
            description: "description period offer",
        });

        const solicitation = await solicitationsRepositoryInMemory.create({
            name: "Some name solicitation",
            description: "Some solicitation description",
            course_id: "course.id",
            period_offer_id: "periodOffer.id",
            expected_deadline: new Date(),
        });

        solicitation.isFinished = true;

        await expect(
            updateSolicitationsUseCase.execute({
                id: solicitation.id,
                name: "Change name",
                description: "Some solicitation description",
                course_id: course.id,
                period_offer_id: periodOffer.id,
                expected_deadline: new Date(),
            })
        ).rejects.toEqual(new UpdateSolicitationsErrors.SolicitationIsClosed());
    });
});
