const { Sequelize } = require('sequelize')
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db/chat.data.db'
});

module.exports = sequelize