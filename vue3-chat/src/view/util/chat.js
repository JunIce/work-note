import { nanoid, noop, sendDataDecode, sendDataEncode } from "./index.js";

export default class Chat {
  constructor({
    fromUserId,
    socket,
    onDataChange,
    heartbeatsTime,
    openHeart = true,
  }) {
    this.fromUserId = fromUserId;
    this._ws = socket;
    this._connectCount = 0;
    this.onDataChange = onDataChange || noop;
    this.latestMessage = null;
    this._openHeart = openHeart;
    this._connectInterval = Number(heartbeatsTime) || 3000;
    this._heartLock = false;

    // 待发送消息队列
    this._msgQueue = [];
    // 获取id计数
    this._serverIdCount = 0;

    this._currentHistoryChatUserId = null;
    this.msgMap = new Map();
    this.contacts = [];

    this.idManager = new MessageIdsManager({
      limit: 1,
      update: noop,
    });

    this._ws.addCallback("open", [this._onOpen.bind(this)]);
    this._ws.addCallback("message", [this._onMessage.bind(this)]);
  }

  _flush(checkIdCount = true) {
    const send = () => {
      let msg = this._msgQueue.shift();
      this._ws.sendObj(sendDataEncode(msg));
    };

    while (this._msgQueue.length > 0) {
      if (checkIdCount) {
        if (this._serverIdCount > 0) {
          send();
          this._serverIdCount--;
        } else {
          this.fetchIds();
        }
      } else {
        send();
      }
    }
  }

  _onOpen() {
    // 重连之后重新连接
    if (this._connectCount >= 1) {
      this.connect();
    }
  }

  _startHeartbeats() {
    if (this._openHeart) {
      this._sendTimeoutId = setTimeout(() => {
        this.heartbeats();
      }, this._connectInterval);
    }
  }

  _onMessage(event) {
    // 清楚心跳定时器
    if (this._sendTimeoutId) {
      this._clearTimeout();
      this._startHeartbeats();
    }

    let result = sendDataDecode(ConnectAction.decode(event.data));

    switch (result.action) {
      case ConnectAction.ACTION_TYPE.CONNECT:
        console.log("--connect success---");
        this._connectCount++;
        this._startHeartbeats();
        break;

      case ConnectAction.ACTION_TYPE.FETCH_ID:
        this._serverIdCount += result.idList.length;
        this._flush();
        this.idManager.add(result.idList);
        break;

      case ConnectAction.ACTION_TYPE.MESSAGE:
        let chatMsg = new ChatMsg(result.chatMsg);
        this.latestMessage = chatMsg.normalize();

        let refId =
          this.latestMessage.platform == 0
            ? this.latestMessage.toUserId
            : this.latestMessage.fromUserId;
        let list = this.msgMap.get(refId) ? this.msgMap.get(refId) : [];
        list.push(this.latestMessage);
        this.msgMap.set(refId, list);

        break;

      case ConnectAction.ACTION_TYPE.STATUS_NOTICE:
        let noticeMessage = new ChatMsg(result.chatMsg);
        this.noticeMessage = noticeMessage.normalize();

        break;

      case ConnectAction.ACTION_TYPE.HEARTBEATS:
        break;

      case ConnectAction.ACTION_TYPE.CONTACT:
        this.contacts = result.contacts;
        break;

      case ConnectAction.ACTION_TYPE.HISTORY:
        this.msgList = result.historys.concat(this.msgList);

        let historylist = this.msgMap.get(this._currentHistoryChatUserId)
          ? this.msgMap.get(this._currentHistoryChatUserId)
          : [];

        this.msgMap.set(
          this._currentHistoryChatUserId,
          result.historys.concat(historylist)
        );
        break;
    }

    this.onDataChange(this, result.actionType);
  }

  // 发送主函数
  _send({ id, type, toUserId, msg_type, content }) {
    let form = {
      type,
      fromUserId: this.fromUserId,
      toUserId: toUserId,
    };

    let result = null;

    if (msg_type !== undefined && content) {
      result = new ChatMsg({
        fromUserId: this.fromUserId,
        toUserId: toUserId,
        msg_type,
        message: new MessageContent(content),
      });
      form.chatMsg = result; 
    }

    if (type === "STATUS_NOTICE") {
      form.chatMsg = new ChatMsg({
        id,
        status: 2,
      });

      // 改变已读信息状态
      this.noticeMessage = form.chatMsg.normalize();
      this.onDataChange(this, 'STATUS_NOTICE');
    }

    const msg = new ConnectAction(form);

    if (type == "MESSAGE") {
      this._msgQueue.push(msg);
      this.fetchIds();
    } else {
      this._ws.sendObj(sendDataEncode(msg));
    }

    return result && result.normalize();
  }

  _clearTimeout() {
    clearTimeout(this._sendTimeoutId);
  }

  // 连接
  connect() {
    this._send({
      type: "CONNECT",
    });
  }

  // 心跳
  heartbeats() {
    this._send({
      type: "HEARTBEATS",
    });
  }

  // 获取ids
  fetchIds() {
    this._send({
      type: "FETCH_ID",
    });
  }

  // 发送文本
  sendText(toUserId, content) {
    return this._send({
      type: "MESSAGE",
      msg_type: 0,
      content,
      toUserId,
    });
  }

  // 发送文件
  sendFile(toUserId, content) {
    return this._send({
      type: "MESSAGE",
      msg_type: 1,
      content,
      toUserId,
    });
  }

  // 获取联系人
  fetchContacts() {
    this._send({
      type: "CONTACT",
    });
  }

  // 获取历史消息
  fetchHistory(toUserId) {
    this._currentHistoryChatUserId = toUserId;
    this.msgMap = new Map();
    this._send({
      type: "HISTORY",
      toUserId,
    });
  }

  // 已读消息推送
  readedMessage({ msgId, toUserId }) {
    this._send({
      type: "STATUS_NOTICE",
      id: msgId,
      toUserId,
    });
  }
}

export class ConnectAction {
  static ACTION_TYPE = {
    CONNECT: 1,
    FETCH_ID: 2,
    MESSAGE: 3,
    STATUS_NOTICE: 4,
    HEARTBEATS: 5,

    CONTACT: 11,
    HISTORY: 12,
  };

  constructor(
    { type, action, fromUserId, toUserId, baseMsgId, chatMsg },
    decode = false
  ) {
    if (decode == false) {
      this.action = ConnectAction.ACTION_TYPE[type];

      switch (this.action) {
        case 1: // 连接
        case 2: // 获取ID
        case 5: // 心跳
        case 11: // 获取联系人列表
          this.fromUserId = fromUserId;
          break;

        case 3: // 发送消息
        case 4: // 客户端确认已读
          this.fromUserId = fromUserId;
          this.toUserId = toUserId;
          this.chatMsg = chatMsg;
          break;

        case 12: // 获取历史
          this.fromUserId = fromUserId;
          this.toUserId = toUserId;
          this.baseMsgId = baseMsgId;
          this.pageSize = 10;
          break;
      }
    } else {
      this.action = action;
      this.actionType = "";

      Object.keys(ConnectAction.ACTION_TYPE).forEach((key) => {
        if (ConnectAction.ACTION_TYPE[key] === this.action) {
          this.actionType = key;
        }
      });

      switch (Number(this.action)) {
        // 心跳
        case ConnectAction.ACTION_TYPE.HEARTBEATS:
        // 连接成功
        case ConnectAction.ACTION_TYPE.CONNECT:
          break;
        // 获取ids
        case ConnectAction.ACTION_TYPE.FETCH_ID:
          this.toUserId = toUserId;
          this.idList = chatMsg.message.split(",") || [];
          break;

        // 发送消息
        case ConnectAction.ACTION_TYPE.MESSAGE:
        // 消息状态变更
        case ConnectAction.ACTION_TYPE.STATUS_NOTICE:
          this.fromUserId = fromUserId;
          this.toUserId = toUserId;
          if (typeof chatMsg.message == "string") {
            chatMsg.message = JSON.parse(chatMsg.message);
          }
          this.chatMsg = chatMsg;

          break;

        // 联系人
        case ConnectAction.ACTION_TYPE.CONTACT:
          this.toUserId = toUserId;
          let contacts = [];
          if (typeof chatMsg.message === "string") {
            contacts = JSON.parse(chatMsg.message);
          }
          this.contacts = contacts;
          break;
        // 历史记录
        case ConnectAction.ACTION_TYPE.HISTORY:
          this.historys = [];
          let historys = JSON.parse(chatMsg.message) || [];
          if (historys.length > 0) {
            this.historys = historys.map((h) => {
              let cache = h.message || '{}'

              h.message = JSON.parse(cache);
              h.fromUserId = h.fromId;
              h.toUserId = h.toId;
              h.originMessage = cache;

              if (h.message) {
                let cache = h.message;

                if (cache.fid) {
                  h.fid = cache.fid;
                }

                if (cache && cache.content) {
                  h.message = cache.content;
                }
              }
              return h;
            });
          }
          break;
      }
    }
  }

  static decode(content) {
    try {
      const result = JSON.parse(content);
      return new ConnectAction(result, true);
    } catch (err) {
      throw new Error(err);
    }
  }
}

export class ChatMsg {
  constructor({ id, msg_type, message, status = 0, fromUserId, toUserId }) {
    this.id = id;
    this.status = status;
    this.type = msg_type; // 0 文本 1 文件

    if (fromUserId) {
      this.fromUserId = fromUserId;
    }

    if (toUserId) {
      this.toUserId = toUserId;
    }

    if (message) {
      this.message = message;
    }
  }

  normalize() {
    let chatMsg = this;
    let result = {
      fromUserId: this.fromUserId,
      toUserId: this.toUserId,
      ...chatMsg,
    };

    if (result.message) {
      let cache = result.message;

      if (cache.fid) {
        result.fid = cache.fid;
      }

      if (cache && cache.content) {
        result.message = cache.content;
      }

      result.platform = cache.platform;
    }

    return result;
  }
}

/**
 * 消息id储存器
 */
export class MessageIdsManager {
  _limit;
  constructor({ limit = 3, update }) {
    this.container = [];
    this._limit = limit;
    this.update = update;
  }

  first() {
    const id = this.container.shift();
    if (this.container.length < this._limit) {
      this.update();
    }

    return id;
  }

  add(list = []) {
    this.container = this.container.concat(list);
  }
}

export class MessageContent {
  constructor(content) {
    // platform 0 客户端
    this.platform = 0;
    this.fid = nanoid();
    this.content = content;
  }

  static decode(data) {}
}

class BaseMessage {
  constructor(options) {
    this.fromUserId = options.fromUserId;
    this.toUserId = options.toUserId;

    if (options.id) {
      this.id = options.id;
    }
  }
}
