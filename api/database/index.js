const Sequelize = require('sequelize')
require('dotenv').config()

const instancia = new Sequelize(
    process.env.DB,
    process.env.USER,
    process.env.PASS,
    {
        host: process.env.HOST,
        dialect: 'mysql'
    }
)

module.exports = instancia