const Sequelize = require('sequelize')


const instancia = new Sequelize(
    process.env.PORT,
    process.env.USER,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        dialect: 'mysql'
    }
)

module.exports = instancia