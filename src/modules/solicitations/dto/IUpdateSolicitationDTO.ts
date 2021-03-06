interface IUpdateSolicitationDTO {
    id: string;
    name?: string;
    description?: string;
    period_offer_id?: string;
    course_id?: string;
    expected_deadline?: Date;
    note?: string;
}

export { IUpdateSolicitationDTO };
