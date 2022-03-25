import { ICreatePeriodOfferDTO } from "../dto/ICreatePeriodOfferDTO";
import { IUpdatePeriodOfferDTO } from "../dto/IUpdatePeriodOfferDTO";
import { PeriodOffer } from "../infra/typeorm/entities/PeriodOffer";

interface IPeriodOffersRepository {
    create(data: ICreatePeriodOfferDTO): Promise<PeriodOffer>;
    findAll(): Promise<PeriodOffer[]>;
    findById(id: string): Promise<PeriodOffer>;
    findByName(name: string): Promise<PeriodOffer>;
    update(data: IUpdatePeriodOfferDTO): Promise<void>;
    deleteById(id: string): Promise<void>;
}

export { IPeriodOffersRepository };
