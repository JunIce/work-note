const db = require('../db')
const { DataTypes } = require('sequelize')

const Users = db.define('User', {
    id: DataTypes.NUMBER,
    name: DataTypes.STRING,
    avatar: DataTypes.STRING
},{
    tableName: 'user',
    timestamps: true,
    paranoid: true
})


module.exports = Users;