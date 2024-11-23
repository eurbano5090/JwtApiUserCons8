const { Sequelize } = require("sequelize");

const conexion = new Sequelize({
    host: 'localhost',
    port: 5432,
    database: 'db_bootcamp',
    username: 'postgres',
    password: 'admin',
    dialect: 'postgres',
//    logging: console.log,
});

module.exports = conexion;