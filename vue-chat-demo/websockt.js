let socket = null;
let lockFlag = false;

export default {
  timeout: 3000,
  timeoutObj: null,
  reconnetInstance: null,
  heartsReset() {
    this.timeoutObj && clearTimeout(this.timeoutObj);
    this.heartsStart();
  },
  heartsStart() {
    this.timeoutObj = setTimeout(() => {
      this.socket.send("heartbeats");
    }, this.timeout);
  },
  reconnect(url, cbMap) {
    if (lockFlag) {
      return;
    }
    lockFlag = true;
    let self = this;
    //没连接上会一直重连，设置延迟避免请求过多
    this.reconnetInstance && clearTimeout(this.reconnetInstance);
    this.reconnetInstance = setTimeout(function() {
      self.init(url, cbMap);
      lockFlag = false;
    }, 3000);
  },
  init(url, cbMap) {
    let self = this;
    let { onMessage, onOpen, onError } = cbMap;
    // 实例化
    socket = new WebSocket(url);
    // open
    socket.onopen = function(data) {
      self.heartsStart();
      console.log("---websockt open ---", data);
      typeof onOpen == "function" && onOpen(socket);
    };
    // message
    socket.onmessage = function(data) {
      self.heartsReset();
      console.log("---websockt message---", data);
      typeof onMessage == "function" && onMessage(data.data);
    };
    // error
    socket.onerror = function(err) {
      console.log("---websockt error ---");
      self.reconnect(url, cbMap);
      typeof onError == "function" && onError(err);
    };

    // close
    socket.onclose = function() {
      console.log("---websockt close ---");
      self.reconnect(url, cbMap);
      typeof onClose == "function" && onClose();
    };

    return socket;
  },
  destroy() {
    socket = null;
    this.timeoutObj && clearTimeout(this.timeoutObj);
    this.reconnetInstance && clearTimeout(this.reconnetInstance);
  },
};
