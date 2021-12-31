export const on = (function() {
  if (document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent("on" + event, handler);
      }
    };
  }
})();

export const off = (function() {
  if (document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent("on" + event, handler);
      }
    };
  }
})();

export const saveSelection = () => {
  if (window.getSelection) {
    let sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      return sel.getRangeAt(0);
    }
  } else if (document.selection && document.selection.createRange) {
    return document.selection.createRange();
  }
  return null;
};

export const restoreSelection = (range) => {
  if (range) {
    if (window.getSelection) {
      let sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    } else if (document.selection && range.select) {
      range.select();
    }
  }
};

export function insertTextAtCaret(range, text) {
  if (range) {
    range.deleteContents();
    range.insertNode(document.createTextNode(text));
  } else if (document.selection && document.selection.createRange) {
    document.selection.createRange().text = text;
  }
}

export const noop = () => {};

export const log = (args) => {
  console.error(args);
};

export const sendDataEncode = (data = {}) => {
  data.chatMsg = data.chatMsg || {};
  data.chatMsg.fromUserId = data.fromUserId;
  data.chatMsg.toUserId = data.toUserId;
  return data;
};

export const sendDataDecode = (data = {}) => {
  data.chatMsg = data.chatMsg || {};
  data.fromUserId = data.chatMsg.fromUserId;
  data.toUserId = data.chatMsg.toUserId;
  return data;
};

export const nanoid = () => {
  return Number(
    Math.random()
      .toString()
      .substr(3, 10) + Date.now()
  ).toString(36);
};

export const throttle = (fn, wait, leading = true) => {
  let timeout;
  let previous = 0;
  return function(...args) {
    let context = this;
    let now = new Date().getTime();
    if (!previous && leading === false) previous = now;
    let remaining = wait - (now - previous);
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      fn.apply(context, args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = leading === false ? 0 : new Date().getTime();
        timeout = null;
        fn.apply(context, args);
      }, remaining);
    }
  };
}
