import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { SolicitationsRepositoryInMemory } from "@modules/solicitations/repositories/in-memory/SolicitationsRepositoryInMemory";

import { FinishSolicitationErrors } from "./FinishSolicitationErrors";
import { FinishSolicitationUseCase } from "./FinishSolicitationUseCase";

let solicitationsRepositoryInMemory: SolicitationsRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;

let finishSolicitationUseCase: FinishSolicitationUseCase;

describe("Finish a solicitation", () => {
    beforeEach(() => {
        solicitationsRepositoryInMemory = new SolicitationsRepositoryInMemory();
        usersRepositoryInMemory = new UsersRepositoryInMemory();

        finishSolicitationUseCase = new FinishSolicitationUseCase(
            solicitationsRepositoryInMemory
        );
    });

    it("Should be able to finish a solicitation", async () => {
        const user = await usersRepositoryInMemory.create({
            name: "User name",
            email: "email@email.com",
            password: "123",
            permission_id: "some permission",
            phone: "123456789",
        });

        const solicitation = await solicitationsRepositoryInMemory.create({
            name: "Solicitation name",
            course_id: "some course id",
            period_offer_id: "some period offer id",
            description: "Solictation description",
            expected_deadline: new Date(),
            users: [user],
        });

        await finishSolicitationUseCase.execute(solicitation.id);

        expect(solicitation.isFinished).toBe(true);
    });

    it("Should not be able to finish a solicitation with no professors allocated", async () => {
        const solicitation = await solicitationsRepositoryInMemory.create({
            name: "Solicitation name",
            course_id: "some course id",
            period_offer_id: "some period offer id",
            description: "Solictation description",
            expected_deadline: new Date(),
            users: [],
        });
        await expect(
            finishSolicitationUseCase.execute(solicitation.id)
        ).rejects.toEqual(
            new FinishSolicitationErrors.NoUserHasBeenAllocated()
        );
    });

    it("Should not be able to finish a solicitation with no professors allocated", async () => {
        await expect(
            finishSolicitationUseCase.execute("some solicitation id")
        ).rejects.toEqual(new FinishSolicitationErrors.SolicitationNotFound());
    });
});
