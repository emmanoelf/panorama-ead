import { SolicitationsRepositoryInMemory } from "@modules/solicitations/repositories/in-memory/SolicitationsRepositoryInMemory";

import { ListAllSolicitationsUseCase } from "./ListAllSolicitationsUseCase";

let solicitationsRepositoryInMemory: SolicitationsRepositoryInMemory;
let listAllSolicitationsUseCase: ListAllSolicitationsUseCase;

describe("List All Solicitations", () => {
    beforeEach(() => {
        solicitationsRepositoryInMemory = new SolicitationsRepositoryInMemory();
        listAllSolicitationsUseCase = new ListAllSolicitationsUseCase(
            solicitationsRepositoryInMemory
        );
    });

    it("Should be able to list all solicitations", async () => {
        await solicitationsRepositoryInMemory.create({
            name: "Name solicitation",
            description: "Description solicitation",
            course_id: "some course id",
            period_offer_id: "some period offer id",
            expected_deadline: new Date(),
        });

        const listAll = await listAllSolicitationsUseCase.execute();

        expect(solicitationsRepositoryInMemory.solicitations.length).toBe(1);
        expect(listAll).toEqual(solicitationsRepositoryInMemory.solicitations);
    });
});
