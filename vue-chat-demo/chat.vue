<template>
  <CommonSite :footerVisible="false">
    <div class="page-chat">
      <div class="full">
        <div class="chat-header">
          <span>最近联系人（30天内）</span>
        </div>

        <div class="chat-wrapper">
          <div class="chat-side-box">
            <ul class="chat-list">
              <template v-for="(item, idx) in userList">
                <li
                  class="chat-list-item"
                  :class="currentIndex == idx ? 'active' : ''"
                  :key="idx"
                  @click="currentIndex = idx"
                >
                  <div class="avatar-box">
                    <img :src="item.avatar" alt="" />
                  </div>
                  <div class="item-info">
                    <div class="name">{{ item.name }}</div>
                    <div class="desc">{{ item.desc }}</div>
                  </div>
                </li>
              </template>
            </ul>
          </div>

          <div class="chat-room-wrapper">
            <div class="chat-room-header">
              <span>title</span>
            </div>
            <section class="chat-room">
              <section class="message-box-wrapper">
                <div class="message-box">
                  <template v-for="(item, idx) in list">
                    <div
                      :key="idx"
                      :class="{
                        'message-item': true,
                        reverse: item.type == 2,
                        center: item.type == 4,
                      }"
                    >
                      <div class="msg-box">
                        <div
                          v-if="item.type == 1 || item.type == 3"
                          class="msg-avatar"
                        >
                          <img :src="item.avatar" alt="" />
                        </div>
                        <template v-if="item.type == 3">
                          <div class="msg-resume-requiry-box">
                            <div class="msg-content-main">
                              <div class="icon-message-resume">
                                <img
                                  src="./images/icon-message-resume.png"
                                  alt=""
                                />
                              </div>
                              <span class="icon-msg-text"
                                >我想要一份您的附件简历到 我的邮箱。</span
                              >
                            </div>
                            <div class="msg-req-btn-section">
                              <div class="btn-item reject">拒绝</div>
                              <div class="btn-item">同意</div>
                            </div>
                          </div>
                        </template>
                        <div class="msg-wrapper" v-else>
                          <span>{{ item.message }}</span>
                        </div>
                      </div>
                    </div>
                  </template>
                </div>
                <div class="chat-message-tip">底部提示文字</div>
              </section>
              <section class="chat-tab-menu">
                <template v-for="(m, idx) in tabMenus">
                  <div
                    :key="idx"
                    class="icon-menu"
                    @click="onTabMenuClick(m)"
                    v-popover:[m.ref]
                  >
                    <el-tooltip :content="m.label" placement="bottom">
                      <img :src="m.icon" :alt="m.label" />
                    </el-tooltip>
                  </div>
                </template>

                <!-- emoji弹窗 -->
                <el-popover
                  ref="emojiPopperRef"
                  placement="top-start"
                  popper-class="chat-msg-menu-popper"
                >
                  <div class="popper-emoji-container">
                    <ul @click="insertEmojiToMsg">
                      <template v-for="(e, idx) in emojiList">
                        <li :key="idx" data-attr="emoji">{{ e.char }}</li>
                      </template>
                    </ul>
                  </div>
                </el-popover>
                <!-- 常用语弹窗 -->
                <el-popover
                  ref="sentencePopperRef"
                  placement="top-start"
                  popper-class="chat-msg-menu-popper"
                >
                  <div class="popper-common-sentence-container">
                    <ul>
                      <template v-for="(s, idx) in commonSentenceList">
                        <li :key="idx">{{ s }}</li>
                      </template>
                    </ul>
                  </div>
                </el-popover>
                <!-- 发送简历弹窗 -->
                <el-popover
                  ref="resumePopperRef"
                  placement="top-start"
                  popper-class="chat-msg-menu-popper"
                >
                  <div class="popper-resume-container">
                    <div class="txt-content">是否发送简历?</div>
                    <div class="btn-section">
                      <el-button
                        size="mini"
                        type="text"
                        @click="closeResumePopperCb"
                        >取消</el-button
                      >
                      <el-button type="primary" size="mini">确定</el-button>
                    </div>
                  </div>
                </el-popover>
              </section>
              <section class="chat-input">
                <div
                  ref="editorRef"
                  class="input-main"
                  type="textarea"
                  contenteditable="true"
                ></div>
                <div class="confirm-section">
                  <span class="confirm-txt"
                    >按Enter键发送，按Ctrl+Enter键换行</span
                  >
                  <button class="confirm-btn" @click="confirm">发送</button>
                </div>
              </section>
            </section>
          </div>
        </div>
      </div>
    </div>
  </CommonSite>
</template>

<script>
import socket from "./websockt";
import emojiList from "./emoji.json";

const emojiMap = emojiList.reduce((resultMap, item) => {
  resultMap[item.group] = resultMap[item.group] || [];
  resultMap[item.group].push(item);
  return resultMap;
}, {});
// console.log(emojiMap);

export const on = (function () {
  if (document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent("on" + event, handler);
      }
    };
  }
})();

export const off = (function () {
  if (document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent("on" + event, handler);
      }
    };
  }
})();

const saveSelection = () => {
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

const restoreSelection = (range) => {
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

function insertTextAtCaret(range, text) {
  if (range) {
    range.deleteContents();
    range.insertNode(document.createTextNode(text));
  } else if (document.selection && document.selection.createRange) {
    document.selection.createRange().text = text;
  }
}

export default {
  data() {
    return {
      message: "",
      userList: new Array(20).fill(0).map((item) => {
        return {
          avatar:
            "https://img1.baidu.com/it/u=1506064908,1725513834&fm=26&fmt=auto",
          name: "这里是名字",
          desc: "这里是描述",
        };
      }),
      currentIndex: null,
      emojiList: emojiMap["Smileys & Emotion"],
      tabMenus: [
        {
          label: "表情",
          icon: require("./images/icon_emoji.png"),
          disabled: false,
          key: "emojiPopper",
          ref: "emojiPopperRef",
        },
        {
          key: "commonSentencePopper",
          ref: "sentencePopperRef",
          label: "常用语",
          icon: require("./images/icon_common_sentence.png"),
          disabled: false,
        },
        {
          ref: "resumePopperRef",
          label: "发送简历",
          icon: require("./images/icon_resume.png"),
          disabled: false,
        },
        {
          label: "交换手机",
          icon: require("./images/icon_phone.png"),
          disabled: false,
        },
        {
          label: "交换微信",
          icon: require("./images/icon_wechat.png"),
          disabled: false,
        },
      ],

      commonSentenceList: [
        "您好，看见你的简历信息，和我们公司的要求非常匹配。0",
        "您好，看见你的简历信息，和我们公司的要求非常匹配。1",
        "您好，看见你的简历信息，和我们公司的要求非常匹配。2",
        "您好，看见你的简历信息，和我们公司的要求非常匹配。3",
        "您好，看见你的简历信息，和我们公司的要求非常匹配。4",
        "您好，看见你的简历信息，和我们公司的要求非常匹配。5",
        "您好，看见你的简历信息，和我们公司的要求非常匹配。6",
        "您好，看见你的简历信息，和我们公司的要求非常匹配。6",
        "您好，看见你的简历信息，和我们公司的要求非常匹配。6",
        "您好，看见你的简历信息，和我们公司的要求非常匹配。6",
        "您好，看见你的简历信息，和我们公司的要求非常匹配。6",
      ],

      list: [
        {
          avatar:
            "https://img1.baidu.com/it/u=1506064908,1725513834&fm=26&fmt=auto",
          message: "您好，看见你的简历信息，和我们公司的要求非常匹配。",
          type: 1,
        },
        {
          avatar:
            "https://img1.baidu.com/it/u=1506064908,1725513834&fm=26&fmt=auto",
          message: "区域垂直生活服务",
          type: 2,
        },
        {
          avatar:
            "https://img1.baidu.com/it/u=1506064908,1725513834&fm=26&fmt=auto",
          message: "区域垂直生活服务",
          type: 3,
        },
        {
          avatar:
            "https://img1.baidu.com/it/u=1506064908,1725513834&fm=26&fmt=auto",
          message: "区域垂直生活服务",
          type: 4,
        },
      ],
    };
  },
  mounted() {
    // this.socket = socket.init("ws://localhost:62912", {
    //   onOpen: () => {},
    //   onMessage: (message) => {
    //     let result = JSON.parse(message);
    //     this.list.push(result);
    //   },
    //   onError: () => {},
    // });

    // 选区缓存
    this.cacheSelection = null;

    this.$nextTick(() => {
      this.editorRef = this.$refs.editorRef;

      on(this.editorRef, "paste", this._paste);
      on(this.editorRef, "focus", this._focus);
      on(this.editorRef, "blur", this._blur);
      on(this.editorRef, "keyup", this._keyEvents);
    });
  },
  beforeDestroy() {
    off(this.editorRef, "paste", this._paste);
    off(this.editorRef, "focus", this._focus);
    off(this.editorRef, "blur", this._blur);
    off(this.editorRef, "keyup", this._keyEvents);
  },
  methods: {
    // 键盘事件
    _keyEvents(e) {
      // enter 发送
      if (e.keyCode == 13 && e.ctrlKey == false) {
        this.confirm();
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

      console.log("---blur event ---", selection, this.cacheSelection);
    },
    _selectionchange(selection) {
      console.log("_selectionchange: ", selection);
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
    // 插入emoji
    insertEmojiToMsg(e) {
      if (e.target.nodeName === "LI") {
        // 直接插入
        if(!this.cacheSelection) {
          this.editorRef.focus();
          let range = saveSelection();
          let selection = window.getSelection();
          this.cacheSelection = {
            isCollapsed: selection.isCollapsed,
            focusNode: selection.focusNode,
            offset: range.startOffset,
            range: range,
          };
        }

        if (this.cacheSelection.range) {
          insertTextAtCaret(this.cacheSelection.range, e.target.textContent);

          // 移动光标
          let range = document.createRange();
          let node = this.cacheSelection.focusNode.nextSibling;
          range.setStart(node, node.length);
          range.setEnd(node, node.length);
          let selection = window.getSelection();
          selection.removeAllRanges();
          selection.addRange(range);
          selection.collapseToEnd();
        }
      }
    },
    // 发送
    confirm() {
      console.log(this.editorRef.textContent);
      let message = this.editorRef.textContent;

      if (!message) {
        this.$message.error("请输入发送内容");
        return;
      }

      this.list.push({
        message: message,
        type: 2,
      });
      // this.socket.send(JSON.stringify({ message: message }));
      setTimeout(() => {
        this.editorRef.innerHTML = "";
        this._lastMsgScrollToView();
      });
    },
    _lastMsgScrollToView() {
      document
        .querySelector(".message-box")
        .lastChild.scrollIntoView({ behavior: "smooth" });
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
    onTabMenuClick(menu) {
      if (menu.key == "commonSentence") {
      }
    },
    // 关闭简历弹窗
    closeResumePopperCb() {
      this.$refs.resumePopperRef.doClose();
    },
  },
};
</script>

<style lang="less" scoped src="./chat.less"></style>