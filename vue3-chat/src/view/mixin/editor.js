import { on, off, saveSelection, throttle } from "../util";
import { filterTargetElements, getHtmlElementSize } from "../util/dom";

export default {
  mounted() {
    // 选区缓存
    this.cacheSelection = null;

    this.$nextTick(() => {
      this.editorRef = this.$refs.editorRef;

      on(this.editorRef, "paste", this._paste);
      on(this.editorRef, "focus", this._focus);
      on(this.editorRef, "blur", this._blur);
      on(this.editorRef, "keyup", this._keyEvents);

      this.msgBoxRef = this.$refs.messageBoxRef;
      if (this.msgBoxRef) {
        on(this.msgBoxRef, "scroll", throttle(this._boxContainerScroll, 100));
      }
    });

    on(document, "visibilitychange", this.onDocumentVisibleChange)
  },
  updated() {
    if (!this.editorRef) {
      this.editorRef = this.$refs.editorRef;

      on(this.editorRef, "paste", this._paste);
      on(this.editorRef, "focus", this._focus);
      on(this.editorRef, "blur", this._blur);
      on(this.editorRef, "keyup", this._keyEvents);

      this.msgBoxRef = this.$refs.messageBoxRef;
      if (this.msgBoxRef) {
        on(this.msgBoxRef, "scroll", this._boxContainerScroll);
      }
    }
  },
  beforeDestroy() {
    off(this.editorRef, "paste", this._paste);
    off(this.editorRef, "focus", this._focus);
    off(this.editorRef, "blur", this._blur);
    off(this.editorRef, "keyup", this._keyEvents);
    off(this.msgBoxRef, "scroll", this._boxContainerScroll);
    off(document, "visibilitychange", this.onDocumentVisibleChange)
  },
  methods: {
    // 键盘事件
    _keyEvents(e) {
      // enter 发送
      if (e.keyCode == 13 && e.ctrlKey == false) {
        typeof this.confirm == "function" && this.confirm();
        e.preventDefault();
      }
      // 换行
      if (e.keyCode == 13 && e.ctrlKey == true) {
        document.execCommand("insertLineBreak");
        // e.preventDefault();
      }
    },
    // 对焦事件
    _focus(e) {
      console.log("---focus event ---");
    },
    // 对焦事件
    _blur() {
      let range = saveSelection();
      let selection = window.getSelection();
      this.cacheSelection = {
        isCollapsed: selection.isCollapsed,
        focusNode: selection.focusNode,
        offset: range.startOffset,
        range: range,
      };

      // console.log("---blur event ---", selection, this.cacheSelection);
    },
    // 粘贴
    _paste(e) {
      let pastedText;
      if (window.clipboardData && window.clipboardData.getData) {
        pastedText = window.clipboardData.getData("Text");
      } else if (
        (e.clipboardData || e.originalEvent.clipboardData) &&
        (e.clipboardData || e.originalEvent.clipboardData).getData
      ) {
        pastedText = (e.originalEvent || e).clipboardData.getData("text/plain");
      }

      this._insertTextAfterCursor(pastedText);

      e.preventDefault();
      console.log(pastedText);
    },
    // 插入文本到输入框
    _insertTextAfterCursor(text) {
      const selection = window.getSelection();
      if (!selection.rangeCount) return false;
      selection.deleteFromDocument();
      selection.getRangeAt(0).insertNode(document.createTextNode(text));
    },
    pasteHtmlAtCaret(html, selectPastedContent) {
      var sel, range;
      if (window.getSelection) {
        // IE9 and non-IE
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
          range = sel.getRangeAt(0);
          range.deleteContents();

          var el = document.createElement("div");
          el.innerHTML = html;
          var frag = document.createDocumentFragment(),
            node,
            lastNode;
          while ((node = el.firstChild)) {
            lastNode = frag.appendChild(node);
          }
          var firstNode = frag.firstChild;
          range.insertNode(frag);

          // Preserve the selection
          if (lastNode) {
            range = range.cloneRange();
            range.setStartAfter(lastNode);
            if (selectPastedContent) {
              range.setStartBefore(firstNode);
            } else {
              range.collapse(true);
            }
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
      } else if ((sel = document.selection) && sel.type != "Control") {
        // IE < 9
        var originalRange = sel.createRange();
        originalRange.collapse(true);
        sel.createRange().pasteHTML(html);
        if (selectPastedContent) {
          range = sel.createRange();
          range.setEndPoint("StartToStart", originalRange);
          range.select();
        }
      }
    },
    lastMsgScrollToView(selector, filter) {
      if (selector && filter) {
        document
          .querySelector(selector)
          .lastChild.scrollIntoView({ behavior: "smooth" });
      }
    },

    // 滚动事件
    _boxContainerScroll() {
      if(this.chatInstance && this.currentSelectedUserId) {
        let ids = this.getUnreadMessageIds();
        ids.forEach(id => this.chatInstance.readedMessage({ msgId: id, toUserId: this.currentSelectedUserId }))
      }
    },

    // 筛选未读信息
    getUnreadMessageIds() {
      let allMessageElements = document.querySelectorAll(".message-item");
      let parentElement = document.querySelector(".message-box");
      let parent = getHtmlElementSize(parentElement);
      let targets = filterTargetElements(allMessageElements, (el) => {
        let isread = el.getAttribute('data-isread')
        if(isread == 0 || isread == 1) {
          // 第一个子元素
          let child = el.firstElementChild;
          // 是否是左侧消息
          if (child && child.classList.contains("custom")) {
            let childPos = getHtmlElementSize(el);
            if (
              childPos.top > parent.top &&
              childPos.top < parent.top + parent.height
            ) {
              return true;
            }
            return false;
          }
        }
        return false;
      });

      return targets.map((el) => el.getAttribute("data-mid"));
    },

    // 页面展现后发出消息已读
    onDocumentVisibleChange() {
      if(this.chatInstance && this.currentSelectedUserId) {
        let ids = this.getUnreadMessageIds();
        ids.forEach(id => this.chatInstance.readedMessage({ msgId: id, toUserId: this.currentSelectedUserId }))
      }
    }
  },
};
