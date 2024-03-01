export const EnvConfiguration = () => ({
    environment: process.env.NODE_ENV || 'dev',
    mongoURL: process.env.MONGO_URL,
    port: +process.env.PORT || 3000,
    defaultLimit: +process.env.DEFAULT_LIMIT || 10
})