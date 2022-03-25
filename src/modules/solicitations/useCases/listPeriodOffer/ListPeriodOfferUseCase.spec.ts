import { PeriodOffersRepositoryInMemory } from "@modules/solicitations/repositories/in-memory/PeriodOffersRepositoryInMemory";

import { ListPeriodOfferUseCase } from "./ListPeriodOfferUseCase";

let periodOffersRepositoryInMemory: PeriodOffersRepositoryInMemory;
let listPeriodOfferUseCase: ListPeriodOfferUseCase;

describe("Should be able to list all period offers", () => {
    beforeEach(() => {
        periodOffersRepositoryInMemory = new PeriodOffersRepositoryInMemory();
        listPeriodOfferUseCase = new ListPeriodOfferUseCase(
            periodOffersRepositoryInMemory
        );
    });

    it("Should be able to return all period offers registered", async () => {
        await periodOffersRepositoryInMemory.create({
            name: "Name period offer",
            description: "Description period offer",
        });

        await periodOffersRepositoryInMemory.create({
            name: "Another Name period offer",
            description: "Another Description period offer",
        });

        const search = await listPeriodOfferUseCase.execute();

        expect(periodOffersRepositoryInMemory.periodOffers).toEqual(search);
        expect(periodOffersRepositoryInMemory.periodOffers.length).toBe(2);
    });
});
