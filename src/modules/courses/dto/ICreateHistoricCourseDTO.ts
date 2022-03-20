interface ICreateHistoricCourseDTO {
    id?: string;
    id_course: string;
    name_course: string;
    former_coordinator_name: string;
    former_coordinator_email: string;
    current_coordinator_name: string;
    current_coordinator_email: string;
    note?: string;
}
export { ICreateHistoricCourseDTO };
