import { ICreateSolicitationDTO } from "@modules/solicitations/dto/ICreateSolicitationDTO";
import { Solicitation } from "@modules/solicitations/infra/typeorm/entities/Solicitation";

import { ISolicitationsRepository } from "../ISolicitationsRepository";

class SolicitationsRepositoryInMemory implements ISolicitationsRepository {
    solicitations: Solicitation[] = [];

    async create({
        id,
        name,
        description,
        period_offer_id,
        course_id,
        expected_deadline,
        note,
        users,
    }: ICreateSolicitationDTO): Promise<Solicitation> {
        const solicitation = new Solicitation();
        Object.assign(solicitation, {
            id,
            name,
            description,
            period_offer_id,
            course_id,
            expected_deadline,
            note,
            users,
        });

        this.solicitations.push(solicitation);

        return solicitation;
    }

    async findById(id: string): Promise<Solicitation> {
        const solicitation = await this.solicitations.find(
            (solicitation) => solicitation.id === id
        );
        return solicitation;
    }

    async findByName(name: string): Promise<Solicitation> {
        const solicitation = await this.solicitations.find(
            (solicitation) => solicitation.name === name
        );
        return solicitation;
    }

    async listAll(): Promise<any[]> {
        const { solicitations } = this;
        return solicitations;
    }
}

export { SolicitationsRepositoryInMemory };
