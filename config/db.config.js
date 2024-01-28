module.exports = {
    HOST: "localhost",
    USER: "pguser",
    PASSWORD: "123456",
    DB: "gestionProduction",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};