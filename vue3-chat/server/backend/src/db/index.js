const path = require("path")
const { Sequelize } = require('sequelize')
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, 'server/backend/src/db', './chat.data.db'),
    database: 'main'
});

module.exports = sequelize