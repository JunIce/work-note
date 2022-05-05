const db = require("../db");
const { DataTypes } = require("sequelize");

const Article = db.define(
    "Article",
    {
        fromid: {
            type: DataTypes.NUMBER,
            field: "fromid"
        },
        fromName: {
            type: DataTypes.STRING,
            field: "fromName"
        },
        url: DataTypes.STRING,
        title: DataTypes.STRING,
        newstime: DataTypes.NUMBER,
        level: DataTypes.NUMBER,
    },
    {
        tableName: "article",
        timestamps: true,
        paranoid: true,
    }
);

module.exports = Article;
