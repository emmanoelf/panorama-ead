interface ICreateSolicitationDTO {
    name: string;
    description: string;
    period_offer_id: string;
    expected_deadline: Date;
    note?: string;
}

export { ICreateSolicitationDTO };
