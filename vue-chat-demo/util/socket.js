import { on, off, noop, log } from "./index.js";

let socketInstance = null;
export default class Socket {
  constructor(url, options = {}) {
    this._url = url;
    this._ws = null;

    // 连接锁
    this._connectLock = false;

    this._connectionTime = 0;
    // 重试次数
    this._retryCount = -1;
    // 强制关闭
    this._forceClose = false;

    // 待发送消息队列
    this._sendQueue = [];

    // 回调
    this.openCbs = [];
    this.messageCbs = [];
    this.errorCbs = [];
    this.closeCbs = [];

    this.options = Object.assign(
      {
        initialTimeout: 500,
        maxTimeout: 5 * 60 * 1000,
        maxRetryCount: 10,
      },
      options
    );

    this.options.openCbs = options.openCbs || [];
    this.options.messageCbs = options.messageCbs || [];
    this.options.errorCbs = options.errorCbs || [];
    this.options.closeCbs = options.closeCbs || [];

    this.openCbs = [...this.options.openCbs];
    this.messageCbs = [...this.options.messageCbs];
    this.errorCbs = [...this.options.errorCbs];
    this.closeCbs = [...this.options.closeCbs];

    this._resolve = noop;
    this._reject = noop;
  }

  state() {
    return this._ws.readyState;
  }

  _wait() {
    return new Promise((resolve) => {
      setTimeout(resolve, this._getTimeOut(this._retryCount));
    });
  }

  _getTimeOut(attempt) {
    var R = Math.random() + 1;
    var T = this.options.initialTimeout;
    var F = 2;
    var N = attempt;
    var M = this.options.maxTimeout;

    return Math.floor(Math.min(R * T * Math.pow(F, N), M));
  }

  connect() {
    if (socketInstance && socketInstance.readyState == 1)
      return Promise.resolve(this);
    this._wait().then(() => {
      this._retryCount++;
      this._connectLock = true;

      socketInstance = new WebSocket(this._url);
      this._ws = socketInstance;

      this.bindEvent();
    });

    return new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  bindEvent() {
    on(this._ws, "open", this._open.bind(this));
    on(this._ws, "message", this._message.bind(this));
    on(this._ws, "error", this._error.bind(this));
    on(this._ws, "close", this._close.bind(this));
  }

  _flush() {
    while (this._sendQueue.length > 0) {
      if (this.state() == 1) {
        const data = this._sendQueue.shift();
        this._ws.send(data);
      } else {
        console.log("---- reconnecting ----");
        this.connect();
        break;
      }
    }
  }

  send(message) {
    this._sendQueue.push(message);
    this._flush();
  }

  sendObj(message = {}) {
    this._sendQueue.push(JSON.stringify(message));
    this._flush();
  }

  close() {
    this._forceClose = true;
    this._ws.close();
  }

  _open(event) {
    console.log("--websocket open--");
    this._connectLock = false;
    this._retryCount = 0;
    this._clearTimeout();
    this._flush();

    this.openCbs.forEach((cb) => {
      typeof cb === "function" && cb(event);
    });

    this._resolve(this);
  }

  _message(event) {
    console.log("--websocket message--");

    this.messageCbs.forEach((cb) => {
      typeof cb === "function" && cb(event);
    });
  }

  // 添加回调
  addCallback(type, cbs = []) {
    let callbacks = this[`${type}Cbs`];
    // 去重
    cbs.forEach((cb) => {
      if (!callbacks.includes(cb)) {
        callbacks.push(cb);
      }
    });
    this[`${type}Cbs`] = callbacks;
  }

  _error(event) {
    console.log("--websocket error--");

    this.errorCbs.forEach((cb) => {
      typeof cb === "function" && cb(event);
    });
  }

  _close() {
    console.log("--websocket close--");

    this.closeCbs.forEach((cb) => {
      typeof cb === "function" && cb(event);
    });

    if (this._forceClose) return;

    if (this._retryCount <= this.options.maxRetryCount) {
      this.connect();
    } else {
      log("超出最大重连数");
    }
  }

  _clearTimeout() {
    clearTimeout(this._connectionTimeout);
  }

  // 销毁
  destroy() {
    off(this._ws, "open", this._open);
    off(this._ws, "message", this._message);
    off(this._ws, "error", this._error);
    off(this._ws, "close", this._close);

    this._ws = null;
  }
}
