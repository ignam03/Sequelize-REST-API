import Sequelize from "sequelize";

export const sequelize = new Sequelize('ProjectsDB1', 'postgres', '123root', {
    host: 'localhost',
    dialect: 'postgres',
})