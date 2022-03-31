import { PeriodOffersRepositoryInMemory } from "@modules/solicitations/repositories/in-memory/PeriodOffersRepositoryInMemory";

import { DeletePeriodOfferErrors } from "./DeletePeriodOfferErrors";
import { DeletePeriodOfferUseCase } from "./DeletePeriodOfferUseCase";

let periodOffersRepositoryInMemory: PeriodOffersRepositoryInMemory;
let deletePeriodOfferUseCase: DeletePeriodOfferUseCase;

describe("Delete a period offer", () => {
    beforeEach(() => {
        periodOffersRepositoryInMemory = new PeriodOffersRepositoryInMemory();
        deletePeriodOfferUseCase = new DeletePeriodOfferUseCase(
            periodOffersRepositoryInMemory
        );
    });

    it("Should be able to delete a period offer", async () => {
        const periodOffer = await periodOffersRepositoryInMemory.create({
            name: "Period offer name",
            description: "Period offer description",
        });

        await deletePeriodOfferUseCase.execute(periodOffer.id);

        expect(periodOffersRepositoryInMemory.periodOffers.length).toBe(0);
    });

    it("Should not be able to delete a period off that does not exists", async () => {
        await expect(
            deletePeriodOfferUseCase.execute("random id")
        ).rejects.toEqual(new DeletePeriodOfferErrors.PeriodOfferNotFound());
    });
});
