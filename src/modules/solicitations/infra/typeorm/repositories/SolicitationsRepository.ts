import { getRepository, Repository } from "typeorm";

import { ICreateSolicitationDTO } from "@modules/solicitations/dto/ICreateSolicitationDTO";
import { ISolicitationsRepository } from "@modules/solicitations/repositories/ISolicitationsRepository";

import { Solicitation } from "../entities/Solicitation";

class SolicitationsRepository implements ISolicitationsRepository {
    private repository: Repository<Solicitation>;

    constructor() {
        this.repository = getRepository(Solicitation);
    }

    async create({
        id,
        name,
        description,
        period_offer_id,
        expected_deadline,
        note,
        users,
    }: ICreateSolicitationDTO): Promise<Solicitation> {
        const solicitation = this.repository.create({
            id,
            name,
            description,
            period_offer_id,
            expected_deadline,
            note,
            users,
        });

        this.repository.save(solicitation);
        return solicitation;
    }

    async findById(id: string): Promise<Solicitation> {
        const solicitation = await this.repository.findOne({ id });
        return solicitation;
    }

    async findByName(name: string): Promise<Solicitation> {
        const solicitation = await this.repository.findOne({ name });
        return solicitation;
    }

    async listAll(): Promise<Solicitation[]> {
        const solicitations = await this.repository.find({
            order: { created_at: "DESC" },
        });
        return solicitations;
    }
}

export { SolicitationsRepository };
