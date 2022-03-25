import { ICreatePeriodOfferDTO } from "@modules/solicitations/dto/ICreatePeriodOfferDTO";
import { IUpdatePeriodOfferDTO } from "@modules/solicitations/dto/IUpdatePeriodOfferDTO";
import { PeriodOffer } from "@modules/solicitations/infra/typeorm/entities/PeriodOffer";

import { IPeriodOffersRepository } from "../IPeriodOffersRepository";

class PeriodOffersRepositoryInMemory implements IPeriodOffersRepository {
    periodOffers: PeriodOffer[] = [];

    async create({
        name,
        description,
    }: ICreatePeriodOfferDTO): Promise<PeriodOffer> {
        const periodOffer = new PeriodOffer();
        Object.assign(periodOffer, {
            name,
            description,
        });

        this.periodOffers.push(periodOffer);
        return periodOffer;
    }

    async findAll(): Promise<PeriodOffer[]> {
        const { periodOffers } = this;
        return periodOffers;
    }

    async findById(id: string): Promise<PeriodOffer> {
        const periodOffer = await this.periodOffers.find(
            (periodOffer) => periodOffer.id === id
        );
        return periodOffer;
    }

    async findByName(name: string): Promise<PeriodOffer> {
        const periodOffer = await this.periodOffers.find(
            (periodOffer) => periodOffer.name === name
        );
        return periodOffer;
    }

    async update({
        id,
        name,
        description,
    }: IUpdatePeriodOfferDTO): Promise<void> {
        const periodOffer = this.findById(id);
        Object.assign(periodOffer, {
            name,
            description,
            updated_at: new Date(),
        });
    }

    async deleteById(id: string): Promise<void> {
        const periodOffer = this.periodOffers.find(
            (periodOffer) => periodOffer.id === id
        );
        this.periodOffers.splice(this.periodOffers.indexOf(periodOffer));
    }
}

export { PeriodOffersRepositoryInMemory };
