const db = require('../db')
const { DataTypes } = require('sequelize')

const Users = db.define('User', {
    id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true
    },
    name: DataTypes.STRING,
    avatar: {
        type: DataTypes.STRING,
        defaultValue: "https://p.qqan.com/up/2021-12/16394435096522657.jpg"
    }
},{
    tableName: 'user',
    timestamps: true,
    paranoid: true
})


module.exports = Users; 