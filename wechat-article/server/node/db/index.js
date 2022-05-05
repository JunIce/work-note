const path = require("path")
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: "127.0.0.1",
    port: "3312",
    username: "root",
    password: '123456',
    database: 'wechat-article'
});

module.exports = sequelize