import { createQueryBuilder, getRepository, Repository } from "typeorm";

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
        course_id,
        expected_deadline,
        note,
        users,
    }: ICreateSolicitationDTO): Promise<Solicitation> {
        const solicitation = this.repository.create({
            id,
            name,
            description,
            period_offer_id,
            course_id,
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

    async listAll(): Promise<any[]> {
        const solicitations = await createQueryBuilder(
            "solicitations",
            "solicitation"
        )
            .leftJoinAndSelect("solicitation.periodOffer", "periodOffer")
            .leftJoinAndSelect("solicitation.course", "course")
            .leftJoinAndSelect("solicitation.users", "user")
            .select([
                "solicitation.id",
                "solicitation.name",
                "solicitation.description",
                "solicitation.expected_deadline",
                "periodOffer.id",
                "periodOffer.name",
                "periodOffer.description",
                "course.id",
                "course.name",
                "user.id",
                "user.name",
                "user.email",
                "user.permission_id",
            ])
            .orderBy("solicitation.name", "ASC")
            .addOrderBy("solicitation.created_at", "DESC")
            .getMany();

        return solicitations;
    }
}

export { SolicitationsRepository };
