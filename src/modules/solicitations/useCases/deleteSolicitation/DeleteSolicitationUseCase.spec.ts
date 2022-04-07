import { SolicitationsRepositoryInMemory } from "@modules/solicitations/repositories/in-memory/SolicitationsRepositoryInMemory";

import { DeleteSolicitationErrors } from "./DeleteSolicitationErrors";
import { DeleteSolicitationUseCase } from "./DeleteSolicitationUseCase";

let solicitationsRepositoryInMemory: SolicitationsRepositoryInMemory;
let deleteSolicitationUseCase: DeleteSolicitationUseCase;

describe("Delete solicitation", () => {
    beforeEach(() => {
        solicitationsRepositoryInMemory = new SolicitationsRepositoryInMemory();
        deleteSolicitationUseCase = new DeleteSolicitationUseCase(
            solicitationsRepositoryInMemory
        );
    });

    it("Should be able to delete a solicitation", async () => {
        const solicitation = await solicitationsRepositoryInMemory.create({
            name: "Solicitation name",
            description: "Solicitation Description",
            course_id: "Some course id",
            expected_deadline: new Date(),
            period_offer_id: "Some period offer id",
        });

        await deleteSolicitationUseCase.execute(solicitation.id);
        expect(solicitationsRepositoryInMemory.solicitations.length).toBe(0);
    });

    it("Should not be able to delete a solicitation that no exists", async () => {
        await expect(
            deleteSolicitationUseCase.execute("random id")
        ).rejects.toEqual(new DeleteSolicitationErrors.SolicitationNotFound());
    });
});
