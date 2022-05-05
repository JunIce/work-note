const db = require("../db");
const { DataTypes } = require("sequelize");

const OriginArticle = db.define(
    "OriginArticle",
    {
        fromid: DataTypes.NUMBER,
        fromName: DataTypes.STRING,
        title: DataTypes.STRING,
        body: DataTypes.TEXT,
        newstime: DataTypes.STRING,
    },
    {
        tableName: "originArticle",
        timestamps: true,
        paranoid: true,
    }
);

module.exports = OriginArticle;
