const Koa = require("koa");
const Router = require("@koa/router");
const websockify = require("koa-websocket");
const Queue = require("bull");

const port = 3002;

const messageQueue = new Queue("message queue", "redis://127.0.0.1:6379");

const app = websockify(new Koa());

const router = new Router();

app.use((context, next) => {
    context.messageQueue = messageQueue;

    next()

})

router.get("/", (ctx, next) => {
    ctx.body = {
        data: "success",
    };
});

app.ws.use(
    router.all("/message/ws", (ctx) => {
        ctx.websocket.send("hello world");
        ctx.websocket.on("message", function (message) {
            // print message from the client
            console.log(message);
        });
    })
);

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
