const Koa = require("koa");
const Router = require("@koa/router");
const websockify = require("koa-websocket");
const bodyparser = require("koa-bodyparser");
const Queue = require("bull");

const InitRoutes = require("./router");
const { parseAction } = require("./util");

const port = 3002;

const messageQueue = new Queue("message queue", "redis://127.0.0.1:6379");

const app = new Koa();
app.use(bodyparser());
const router = new Router();

app.use(async (ctx, next) => {
    ctx.messageQueue = messageQueue;
    await next();
});

InitRoutes(router);

const websocketApp = websockify(app);

websocketApp.ws.use(
    router.all("/message/ws", (ctx) => {
        ctx.websocket.on("message", (message) => parseAction.call(null, message, ctx));
    })
);

app.use(router.routes())
    .use(router.allowedMethods())
    .listen(port, () => {
        console.log(`listening on port ${port}`);
    });
