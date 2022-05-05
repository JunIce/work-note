const db = require("../db");
const { DataTypes } = require("sequelize");

const Account = db.define(
    "Account",
    {
        name: DataTypes.STRING,
        key: DataTypes.STRING,
        biz: DataTypes.STRING,
        uin: DataTypes.STRING,
        flag: DataTypes.NUMBER,
    },
    {
        tableName: "account",
        timestamps: true,
        paranoid: true,
    }
);

module.exports = Account;
