const Router = require("@koa/router");
const Account = require("../model/account");
const Article = require("../model/article");
const OriginArticle = require("../model/originArticle");

const router = new Router();

router
    .get("/", (ctx) => {
        ctx.body = {
            data: "success",
            code: 200,
        };
    })
    .get("/api/account", async (ctx) => {
        try {
            const accounts = await Account.findAll();

            ctx.body = {
                data: accounts,
                code: 200,
            };
        } catch (error) {
            ctx.body = {
                err: error,
                code: -1,
            };
        }
    })
    .put("/api/account", async (ctx) => {
        const id = ctx.request.body.id;
        const key = ctx.request.body.key;

        try {
            const account = await Account.findOne({ id: id });
            if (account) {
                account.key = key;
                await account.save();
            }

            ctx.body = {
                data: account,
                code: 200,
            };
        } catch (error) {
            ctx.body = {
                err: error,
                code: -1,
            };
        }
    })
    .post("/api/account", async (ctx) => {
        const name = ctx.request.body.name;
        const key = ctx.request.body.key;
        const uin = ctx.request.body.uin;
        const biz = ctx.request.body.biz;

        try {
            const account = await Account.create({
                name,
                key,
                uin,
                biz,
            });

            ctx.body = {
                data: account,
                code: 200,
            };
        } catch (error) {
            ctx.body = {
                err: error,
                code: -1,
            };
        }
    })
    // 文章
    .get("/api/article", async (ctx) => {
        try {
            const articles = await Article.findAll();

            ctx.body = {
                data: articles,
                code: 200,
            };
        } catch (error) {
            ctx.body = {
                err: error,
                code: -1,
            };
        }
    })
    .put("/api/article", async (ctx) => {
        const id = ctx.request.body.id;
        const key = ctx.request.body.key;

        try {
            const account = await Article.findOne({ id: id });
            if (account) {
                account.key = key;
                await account.save();
            }

            ctx.body = {
                data: account,
                code: 200,
            };
        } catch (error) {
            ctx.body = {
                err: error,
                code: -1,
            };
        }
    })
    .post("/api/article", async (ctx) => {
        const fromName = ctx.request.body.fromName;
        const fromid = ctx.request.body.fromid;
        const url = ctx.request.body.url;
        const newstime = ctx.request.body.newstime;
        const title = ctx.request.body.title;

        try {
            const article = await Article.create({
                fromName,
                fromid,
                url,
                newstime,
                title
            });

            ctx.body = {
                data: article,
                code: 200,
            };
        } catch (error) {
            ctx.body = {
                err: error,
                code: -1,
            };
        }
    })
    .post("/api/originArticle", async (ctx) => {
        const fromName = ctx.request.body.fromName;
        const fromid = ctx.request.body.fromid;
        const body = ctx.request.body.content;
        const newstime = ctx.request.body.newstime;
        const title = ctx.request.body.title;

        try {
            const article = await OriginArticle.create({
                fromName,
                fromid,
                body,
                newstime,
                title
            });

            ctx.body = {
                data: article,
                code: 200,
            };
        } catch (error) {
            ctx.body = {
                err: error,
                code: -1,
            };
        }
    });

module.exports = router;
