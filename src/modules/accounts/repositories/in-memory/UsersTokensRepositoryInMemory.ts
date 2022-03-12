import { ICreateUserTokenDTO } from "../../dto/ICreateUserTokenDTO";
import { UserTokens } from "../../entities/UserTokens";
import { IUserTokensRepository } from "../IUserTokensRepository";

class UsersTokensRepositoryInMemory implements IUserTokensRepository {
    userTokens: UserTokens[] = [];

    async create({
        user_id,
        expires_date,
        refresh_token,
    }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userTokens = new UserTokens();

        Object.assign(userTokens, {
            user_id,
            expires_date,
            refresh_token,
        });

        this.userTokens.push(userTokens);

        return userTokens;
    }

    async findByUserIdAndRefreshToken(
        user_id: string,
        refresh_token: string
    ): Promise<UserTokens> {
        const userTokens = this.userTokens.find(
            (userTokens) =>
                userTokens.user_id === user_id &&
                userTokens.refresh_token === refresh_token
        );
        return userTokens;
    }

    async deleteById(id: string): Promise<void> {
        const userTokens = this.userTokens.find(
            (userTokens) => userTokens.id === id
        );
        this.userTokens.splice(this.userTokens.indexOf(userTokens));
    }
}
export { UsersTokensRepositoryInMemory };
