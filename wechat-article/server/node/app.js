const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const router = require("./router");
const logger = require("./util/log");

const PORT = 3004;

function bootstrapApp() {
    const app = new Koa();

    app.use(bodyparser())

    app.use(router.routes()).use(router.allowedMethods());

    app.listen(PORT, () => {
        logger.info(`server listening at port ${PORT}`);
        console.log(`listening at port ${PORT}`);
    });
}

logger.info("server start .....");
bootstrapApp();
