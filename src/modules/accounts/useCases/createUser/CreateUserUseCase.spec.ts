import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserErrors } from "./CreateUserErrors";
import { CreateUserUseCase } from "./CreateUserUseCase";

let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe("Create user Use Case", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("Should be able to create a new user", async () => {
        const user = await createUserUseCase.execute({
            idPermission: "IdPermission",
            name: "Test user name",
            email: "testUser@test.com",
            password: "test password",
            phone: "123456789",
        });

        expect(user).toHaveProperty("id");
        expect(usersRepositoryInMemory.users.length).toBe(1);
    });

    it("Should be not able to create a new user with same email", async () => {
        await createUserUseCase.execute({
            idPermission: "IdPermission",
            name: "Test user name",
            email: "testUser@test.com",
            password: "test password",
            phone: "123456789",
        });

        await expect(
            createUserUseCase.execute({
                idPermission: "New ID Permission",
                name: "New Test user name",
                email: "testUser@test.com",
                password: "new test password",
                phone: "123456789",
            })
        ).rejects.toEqual(new CreateUserErrors.EmailAlreadyExistsError());
    });
});
