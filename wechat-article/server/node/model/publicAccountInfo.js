const db = require("../db");
const { DataTypes } = require("sequelize");

const publicAccountInfo = db.define(
    "publicAccountInfo",
    {
        uid: DataTypes.STRING,
        biz: DataTypes.STRING,
        key: DataTypes.STRING,
        flag: DataTypes.NUMBER,
    },
    {
        tableName: "publicAccountInfo",
        timestamps: true,
        paranoid: true,
    }
);

module.exports = publicAccountInfo;
