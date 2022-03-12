import { IDateProvider } from "../../../../shared/providers/DateProvider/IDateProvider";
import { DayjsDateProvider } from "../../../../shared/providers/DateProvider/implementations/DayjsDateProvider";
import { ICreateUserDTO } from "../../dto/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "../../repositories/in-memory/UsersTokensRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserError } from "./AuthenticateUserError";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: IDateProvider;

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate user", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        dateProvider = new DayjsDateProvider();

        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider
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
        expect(result).toHaveProperty("refresh_token");
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
