import { PeriodOffersRepositoryInMemory } from "@modules/solicitations/repositories/in-memory/PeriodOffersRepositoryInMemory";

import { CreatePeriodOfferErrors } from "./CreatePeriodOfferErrors";
import { CreatePeriodOfferUseCase } from "./CreatePeriodOfferUseCase";

let periodOfferRepositoryInMemory: PeriodOffersRepositoryInMemory;
let createOfferUseCase: CreatePeriodOfferUseCase;

describe("Create period offer", () => {
    beforeEach(() => {
        periodOfferRepositoryInMemory = new PeriodOffersRepositoryInMemory();
        createOfferUseCase = new CreatePeriodOfferUseCase(
            periodOfferRepositoryInMemory
        );
    });

    it("Should be able to create a new period offer", async () => {
        const periodOffer = await createOfferUseCase.execute({
            name: "Period Offer name",
            description: "Period Offer description",
        });

        expect(periodOffer).toHaveProperty("id");
        expect(periodOfferRepositoryInMemory.periodOffers.length).toBe(1);
    });

    it("Should not be able to create a new period offer with same name", async () => {
        await createOfferUseCase.execute({
            name: "Period Offer name",
            description: "Period Offer description",
        });

        await expect(
            createOfferUseCase.execute({
                name: "Period Offer name",
                description: "Period Offer description",
            })
        ).rejects.toEqual(
            new CreatePeriodOfferErrors.PeriodOfferAlreadyExists()
        );
        expect(periodOfferRepositoryInMemory.periodOffers.length).toBe(1);
    });
});
