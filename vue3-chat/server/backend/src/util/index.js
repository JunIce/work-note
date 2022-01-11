const ACTION_TYPE = {
    CONNECT: 1,
    FETCH_ID: 2,
    MESSAGE: 3,
    STATUS_NOTICE: 4,
    HEARTBEATS: 5,

    CONTACT: 11,
    HISTORY: 12,
};

const userOnlineMap = new Map();
const userOnlineIds = new Set();

function parseAction({ action, ...rest }, ctx) {
    switch (action) {
        // 连接
        case ACTION_TYPE.CONNECT:
            const { fromId } = rest.chatMsg;
            if (fromId && !userOnlineIds.has(fromId)) {
                userOnlineIds.set(fromId);
                userOnlineMap.set(fromId, ctx.websocket);
            }
        break;

        case ACTION_TYPE.FETCH_ID:
        
        break;

        case ACTION_TYPE.MESSAGE:
            const { toId } = rest.chatMsg;
            // 在线
            if(userOnlineIds.has(toId)) {
                let socket = userOnlineMap.get(toId);
                socket.send("hello world")
            }
        break;

        case ACTION_TYPE.STATUS_NOTICE:

        case ACTION_TYPE.HEARTBEATS:

        case ACTION_TYPE.CONTACT:

        case ACTION_TYPE.HISTORY:
    }
}

const wait = (time) => new Promise(resolve => setTimeout(resolve, time))

module.exports = {
    ACTION_TYPE,
    parseAction,
    wait
};
