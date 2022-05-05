const logger = require("./log");

module.exports = function catchError(ctx, fn) {
    try {
        typeof fn === "function" && fn.call(ctx);
    } catch (error) {
        logger.error(error);
        ctx.body = {
            err: error,
            code: -1,
        };
    }
};
