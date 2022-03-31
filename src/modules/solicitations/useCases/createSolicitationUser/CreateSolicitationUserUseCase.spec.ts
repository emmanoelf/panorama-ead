import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { SolicitationsRepositoryInMemory } from "@modules/solicitations/repositories/in-memory/SolicitationsRepositoryInMemory";
import { CreateSolicitationUserUseCase } from "@modules/solicitations/useCases/createSolicitationUser/CreateSolicitationUserUseCase";

let solicitationsRepositoryInMemory: SolicitationsRepositoryInMemory;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createSolicitationUserUseCase: CreateSolicitationUserUseCase;

describe("Create solicitation user", () => {
    beforeEach(() => {
        solicitationsRepositoryInMemory = new SolicitationsRepositoryInMemory();
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        createSolicitationUserUseCase = new CreateSolicitationUserUseCase(
            solicitationsRepositoryInMemory,
            usersRepositoryInMemory
        );
    });

    it("Should be able to create solicitation for a user", async () => {
        const user = await usersRepositoryInMemory.create({
            name: "User name",
            email: "email@email.com",
            password: "123",
            permission_id: "some permission",
            phone: "123456789",
        });

        const solicitation = await solicitationsRepositoryInMemory.create({
            name: "Name solicitation",
            description: "Description solicitation",
            course_id: "some course id",
            period_offer_id: "some period offer id",
            expected_deadline: new Date(),
        });

        const createSolicitation = await createSolicitationUserUseCase.execute({
            solicitation_id: solicitation.id,
            users_id: [user.id],
        });

        expect(createSolicitation).toHaveProperty("users");
        expect(createSolicitation.users.length).toBe(1);
    });
});
