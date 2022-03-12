export default {
    secret: process.env.SECRET_TOKEN_APP,
    token_expires_in: "15m",
    secret_refresh_token: process.env.REFRESH_SECRET_TOKEN_APP,
    refresh_token_expires_in: "15d",
    refresh_token_expires_days: 15,
};
