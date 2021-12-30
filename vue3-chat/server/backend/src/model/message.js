const db = require('../db')
const { DataTypes } = require('sequelize')

const Messages = db.define('Message', {
    id: DataTypes.NUMBER,
    fromid: DataTypes.NUMBER,
    toid: DataTypes.NUMBER,
    timestamp: DataTypes.NUMBER,
    message: DataTypes.TEXT,
    flag: DataTypes.NUMBER,
},{
    tableName: 'message',
    timestamps: true,
    paranoid: true
})


module.exports = Messages;