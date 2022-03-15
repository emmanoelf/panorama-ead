interface ICreateUserDTO {
    permission_id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    ra?: string;
    id?: string;
}

export { ICreateUserDTO };
