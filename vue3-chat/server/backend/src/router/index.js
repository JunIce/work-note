const homeController = require('../controller/app');

module.exports = (router) => {
    router
        .post("/api/user/register", homeController.register)
        .post("/api/user/logout", homeController.logout)
}
