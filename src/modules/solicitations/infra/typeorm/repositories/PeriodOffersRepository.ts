import { getRepository, Repository } from "typeorm";

import { ICreatePeriodOfferDTO } from "@modules/solicitations/dto/ICreatePeriodOfferDTO";
import { IUpdatePeriodOfferDTO } from "@modules/solicitations/dto/IUpdatePeriodOfferDTO";
import { IPeriodOffersRepository } from "@modules/solicitations/repositories/IPeriodOffersRepository";

import { PeriodOffer } from "../entities/PeriodOffer";

class PeriodOffersRepository implements IPeriodOffersRepository {
    private repository: Repository<PeriodOffer>;

    constructor() {
        this.repository = getRepository(PeriodOffer);
    }

    async create({
        name,
        description,
    }: ICreatePeriodOfferDTO): Promise<PeriodOffer> {
        const period_offer = this.repository.create({
            name,
            description,
        });

        this.repository.save(period_offer);
        return period_offer;
    }

    async findAll(): Promise<PeriodOffer[]> {
        const period_offers = await this.repository.find({
            order: { name: "ASC" },
        });
        return period_offers;
    }

    async findById(id: string): Promise<PeriodOffer> {
        const period_offer = await this.repository.findOne({ id });
        return period_offer;
    }

    async findByName(name: string): Promise<PeriodOffer> {
        const period_offer = await this.repository.findOne({ name });
        return period_offer;
    }

    async update({
        id,
        name,
        description,
    }: IUpdatePeriodOfferDTO): Promise<void> {
        await this.repository.save({
            id,
            name,
            description,
            updated_at: new Date(),
        });
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}

export { PeriodOffersRepository };
