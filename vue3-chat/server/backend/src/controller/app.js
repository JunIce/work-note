const UserModel = require('../model/user');

module.exports = {
    async register(ctx, next) {
        const name = ctx.body.name;
        if(!name) {
            ctx.body = {
                error: -1,
                message: "名称不存在"
            }
            return
        }

        try {
            const user = await UserModel.create({
                name: name
            });
    
            ctx.body = {
                data: user,
                code: 200,
                message: "新增成功"
            }
        } catch (error) {
            ctx.body = {
                error: -1,
                message: error
            }
        }

        
    },
    logout(ctx, next) {

    }
}

