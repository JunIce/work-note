const ACTION_TYPE = {
    CONNECT: 1,
    FETCH_ID: 2,
    MESSAGE: 3,
    STATUS_NOTICE: 4,
    HEARTBEATS: 5,

    CONTACT: 11,
    HISTORY: 12,
};

function parseAction({ action, ...rest }) {
    switch (action) {
        case ACTION_TYPE.CONNECT:

        case ACTION_TYPE.FETCH_ID:

        case ACTION_TYPE.MESSAGE:

        case ACTION_TYPE.STATUS_NOTICE:

        case ACTION_TYPE.HEARTBEATS:

        case ACTION_TYPE.CONTACT:

        case ACTION_TYPE.HISTORY:
    }
}

module.exports = {
    ACTION_TYPE,
    parseAction,
};
