import { ICoursesRepository } from "@modules/courses/repositories/ICoursesRepository";
import { IUpdateSolicitationDTO } from "@modules/solicitations/dto/IUpdateSolicitationDTO";
import { IPeriodOffersRepository } from "@modules/solicitations/repositories/IPeriodOffersRepository";
import { ISolicitationsRepository } from "@modules/solicitations/repositories/ISolicitationsRepository";

import { UpdateSolicitationsErrors } from "./UpdateSolicitationErrors";

class UpdateSolicitationUseCase {
    constructor(
        private solicitationsRepository: ISolicitationsRepository,
        private periodOffersRepository: IPeriodOffersRepository,
        private coursesRepository: ICoursesRepository
    ) {}

    async execute({
        id,
        name,
        description,
        period_offer_id,
        course_id,
        expected_deadline,
        note,
    }: IUpdateSolicitationDTO): Promise<void> {
        const solicitation = await this.solicitationsRepository.findById(id);
        if (!solicitation) {
            throw new UpdateSolicitationsErrors.SolicitationNotFound();
        }

        const periodOffer = await this.periodOffersRepository.findById(
            period_offer_id
        );
        if (!periodOffer) {
            throw new UpdateSolicitationsErrors.PeriodOfferNotFound();
        }

        const course = await this.coursesRepository.findById(course_id);
        if (!course) {
            throw new UpdateSolicitationsErrors.CourseNotFound();
        }

        const findByName = await this.solicitationsRepository.findByName(name);
        if (findByName) {
            throw new UpdateSolicitationsErrors.SolicitationNameAlreadyRegistered();
        }

        if (solicitation.isFinished === true) {
            throw new UpdateSolicitationsErrors.SolicitationIsClosed();
        }

        await this.solicitationsRepository.update({
            id,
            name,
            description,
            period_offer_id,
            course_id,
            expected_deadline,
            note,
        });
    }
}

export { UpdateSolicitationUseCase };
