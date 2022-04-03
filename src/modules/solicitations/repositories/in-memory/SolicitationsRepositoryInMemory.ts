import { ICreateSolicitationDTO } from "@modules/solicitations/dto/ICreateSolicitationDTO";
import { IUpdateSolicitationDTO } from "@modules/solicitations/dto/IUpdateSolicitationDTO";
import { Solicitation } from "@modules/solicitations/infra/typeorm/entities/Solicitation";

import { ISolicitationsRepository } from "../ISolicitationsRepository";

class SolicitationsRepositoryInMemory implements ISolicitationsRepository {
    solicitations: Solicitation[] = [];

    async create({
        name,
        description,
        period_offer_id,
        course_id,
        expected_deadline,
        note,
        users,
        id,
    }: ICreateSolicitationDTO): Promise<Solicitation> {
        const solicitation = new Solicitation();
        Object.assign(solicitation, {
            name,
            description,
            period_offer_id,
            course_id,
            expected_deadline,
            note,
            users,
            id,
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

    async isFinished(id: string): Promise<void> {
        const solicitation = await this.findById(id);
        solicitation.isFinished = true;
        solicitation.deadline = new Date();
    }

    async listOneSolicitationUsers(id: string): Promise<any> {
        const solicitation = await this.solicitations.find(
            (solicitation) => solicitation.id === id
        );
        return solicitation;
    }

    async update({
        id,
        name,
        description,
        period_offer_id,
        course_id,
        expected_deadline,
        note,
    }: IUpdateSolicitationDTO): Promise<void> {
        const solicitation = await this.findById(id);
        Object.assign(solicitation, {
            name,
            description,
            period_offer_id,
            course_id,
            expected_deadline,
            note,
            updated_at: new Date(),
        });
    }
}

export { SolicitationsRepositoryInMemory };
