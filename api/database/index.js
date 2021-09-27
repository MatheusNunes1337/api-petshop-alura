const Sequelize = require('sequelize')
require('dotenv').config()

console.log('senha', process.env.PASS)

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