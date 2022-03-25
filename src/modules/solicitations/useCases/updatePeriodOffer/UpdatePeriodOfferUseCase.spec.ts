import { PeriodOffersRepositoryInMemory } from "@modules/solicitations/repositories/in-memory/PeriodOffersRepositoryInMemory";

import { UpdatePeriodOfferErrors } from "./UpdatePeriodOfferErrors";
import { UpdatePeriodOfferUseCase } from "./UpdatePeriodOfferUseCase";

let periodOffersRepositoryInMemory: PeriodOffersRepositoryInMemory;
let updatePeriodOfferUseCase: UpdatePeriodOfferUseCase;

describe("Update a period offer", () => {
    beforeEach(() => {
        periodOffersRepositoryInMemory = new PeriodOffersRepositoryInMemory();
        updatePeriodOfferUseCase = new UpdatePeriodOfferUseCase(
            periodOffersRepositoryInMemory
        );
    });

    it("Should be able to update a period offer", async () => {
        const periodOffer = await periodOffersRepositoryInMemory.create({
            name: "Period Offer Name",
            description: "Period Offer Description",
        });

        await updatePeriodOfferUseCase.execute({
            id: periodOffer.id,
            name: "Name Updated",
            description: "Description updated",
        });

        expect(periodOffer.name).toEqual("Name Updated");
    });

    it("Should not be able to update a period offer with same name", async () => {
        const periodOffer = await periodOffersRepositoryInMemory.create({
            name: "Period Offer Name",
            description: "Period Offer Description",
        });

        await expect(
            updatePeriodOfferUseCase.execute({
                id: periodOffer.id,
                name: "Period Offer Name",
                description: "Description updated",
            })
        ).rejects.toEqual(
            new UpdatePeriodOfferErrors.PeriodOfferAlreadyExists()
        );
    });

    it("Should not be able to update a period offer with same name", async () => {
        await periodOffersRepositoryInMemory.create({
            name: "Period Offer Name",
            description: "Period Offer Description",
        });

        await expect(
            updatePeriodOfferUseCase.execute({
                id: "period offer id",
                name: "Period Offer Name",
                description: "Description updated",
            })
        ).rejects.toEqual(new UpdatePeriodOfferErrors.PeriodOfferNotFound());
    });
});
