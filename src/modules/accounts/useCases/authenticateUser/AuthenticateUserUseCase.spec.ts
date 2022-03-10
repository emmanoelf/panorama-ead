import { ICreateUserDTO } from "../../dto/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserError } from "./AuthenticateUserError";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("Should be able to athenticate a user", async () => {
        const user: ICreateUserDTO = {
            permission_id: "permission_id",
            name: "Test",
            email: "test@test.com",
            password: "1234",
            phone: "956231475",
            ra: "1234",
        };

        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("Should not be able to athenticate a user with incorrect password", async () => {
        const user: ICreateUserDTO = {
            permission_id: "permission_id",
            name: "Test",
            email: "test@test.com",
            password: "1234",
            phone: "956231475",
            ra: "1234",
        };

        await createUserUseCase.execute(user);

        expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: "another password",
            })
        ).rejects.toEqual(new AuthenticateUserError.EmailOrPasswordIncorrect());
    });

    it("Should not be able to athenticate a user with incorrect email", async () => {
        const user: ICreateUserDTO = {
            permission_id: "permission_id",
            name: "Test",
            email: "test@test.com",
            password: "1234",
            phone: "956231475",
            ra: "1234",
        };

        await createUserUseCase.execute(user);

        expect(
            authenticateUserUseCase.execute({
                email: "another@email.com",
                password: user.password,
            })
        ).rejects.toEqual(new AuthenticateUserError.EmailOrPasswordIncorrect());
    });
});
