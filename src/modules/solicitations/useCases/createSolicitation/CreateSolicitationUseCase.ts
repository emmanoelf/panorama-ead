import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { ICreateSolicitationDTO } from "@modules/solicitations/dto/ICreateSolicitationDTO";
import { Solicitation } from "@modules/solicitations/infra/typeorm/entities/Solicitation";
import { IChatsRepository } from "@modules/solicitations/repositories/IChatsRepository";
import { IPeriodOffersRepository } from "@modules/solicitations/repositories/IPeriodOffersRepository";
import { ISolicitationsRepository } from "@modules/solicitations/repositories/ISolicitationsRepository";

import { CreateSolicitationErrors } from "./CreateSolicitationErrors";

class CreateSolicitationUseCase {
    constructor(
        private solicitationsRepository: ISolicitationsRepository,
        private periodOffersRepository: IPeriodOffersRepository,
        private coursesRepository: ICoursesRepository,
        private chatsRepository: IChatsRepository
    ) {}

    async execute({
        name,
        description,
        expected_deadline,
        period_offer_id,
        course_id,
        note,
    }: ICreateSolicitationDTO): Promise<Solicitation> {
        const search = await this.solicitationsRepository.findByName(name);
        if (search) {
            throw new CreateSolicitationErrors.SolicitationAlreadyExists();
        }

        const searchPeriodOffer = await this.periodOffersRepository.findById(
            period_offer_id
        );
        if (!searchPeriodOffer) {
            throw new CreateSolicitationErrors.PeriodOfferNotFound();
        }

        const searchCourse = await this.coursesRepository.findById(course_id);
        if (!searchCourse) {
            throw new CreateSolicitationErrors.CourseNotFound();
        }

        const solicitation = await this.solicitationsRepository.create({
            name,
            description,
            expected_deadline,
            period_offer_id,
            course_id,
            note,
        });

        await this.chatsRepository.create(solicitation.id);

        return solicitation;
    }
}

export { CreateSolicitationUseCase };
