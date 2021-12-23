<template>
  <CommonSite :footerVisible="false">
    <div class="page-chat">
      <div class="full">
        <div class="chat-header">
          <span>最近联系人（30天内）</span>
        </div>

        <div class="chat-wrapper">
          <div class="chat-side-box">
            <ul v-if="userList.length > 0" class="chat-list">
              <template v-for="item in userList">
                <li
                  class="chat-list-item"
                  :class="currentSelectedUserId == item.id ? 'active' : ''"
                  :key="item.id"
                  @click="chatToUser(item)"
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
            <div v-else class="empty-contact-box">
              <span>暂无30天内联系人</span>
            </div>
          </div>

          <div class="chat-room-wrapper">
            <template v-if="currentSelectedUserId">
              <div class="chat-room-header">
                <span>{{ currentSelectedUser.name }}</span>
              </div>
              <section class="chat-room">
                <section class="message-box-wrapper">
                  <div class="message-box" ref="messageBoxRef">
                    <template v-for="item in list">
                      <MessageItem
                        :item="item"
                        :key="item.id"
                        :fromUserId="fromId"
                        :toUserId="currentSelectedUserId"
                      />
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
            </template>
            <div v-else class="empty-chat-room-fill">
              <span>与您沟通的boss都会在左侧列表显示</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </CommonSite>
</template>

<script>
import MessageItem from "./components/message-item.vue";
import { insertTextAtCaret, saveSelection } from "./util/index.js";
import Chat from "./util/chat.js";
import Socket from "./util/socket.js";
import editorMixin from "./mixin/editor";
import emojiMixin from "./mixin/emoji";

const socketInstance = new Socket("ws://172.24.223.103:8888/im/ws", {});

export default {
  name: "Chat",
  mixins: [emojiMixin, editorMixin],
  components: {
    MessageItem,
  },
  data() {
    return {
      message: "",
      userList: [],
      fromId: 777777,
      currentSelectedUserId: null,
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
          key: "changePhone",
          icon: require("./images/icon_phone.png"),
          disabled: false,
        },
        {
          label: "交换微信",
          key: "weChat",
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

      list: [],
    };
  },
  computed: {
    currentSelectedUser() {
      return (
        this.userList.find((u) => u.id === this.currentSelectedUserId) || {}
      );
    },
  },
  mounted() {
    let vm = this;

    socketInstance.connect().then((ws) => {
      this.chatInstance = new Chat({
        fromUserId: this.fromId, // 发送来源id
        socket: ws,
        // openHeart: false,
        heartbeatsTime: 5000, // 心跳间隔
        onDataChange: (instance, type) => {
          if (type == "STATUS_NOTICE") {
            if(instance.noticeMessage) {
              let index = -1
              // 发送消息后返回值
              if(instance.noticeMessage.fid) {
                index = vm.list.findIndex((item) => item.fid === instance.noticeMessage.fid);
              } else if (instance.noticeMessage.id) { // 服务端推送
                index = vm.list.findIndex((item) => item.id === instance.noticeMessage.id);
              }
              if (index > -1) {
                let messageItem = {
                  ...vm.list[index],
                  status: instance.noticeMessage.status,
                  id: instance.noticeMessage.id
                }
                vm.$set(vm.list, index, messageItem);
              }
            }
          }

          if (type == "CONTACT") {
            vm.userList = [
              {
                id: 12345,
                toUserId: 12345,
                name: 'jack',
                avatar: 'https://img1.baidu.com/it/u=1506064908,1725513834&fm=26&fmt=auto'
              },
              {
                id: 12344,
                toUserId: 12344,
                name: 'sparow',
                avatar: 'https://img1.baidu.com/it/u=1506064908,1725513834&fm=26&fmt=auto'
              },
              {
                id: 12343,
                toUserId: 12343,
                name: 'lee',
                avatar: 'https://img1.baidu.com/it/u=1506064908,1725513834&fm=26&fmt=auto'
              }
            ]
            // vm.userList = (instance.contacts || []).map((item) => {
            //   return {
            //     avatar:
            //       "https://img1.baidu.com/it/u=1506064908,1725513834&fm=26&fmt=auto",
            //     name: item.toName,
            //     id: item.id,
            //     fromUserId: item.fromId,
            //     toUserId: item.toId,
            //     desc: "这里是描述",
            //   };
            // });
          }

          if (type == "MESSAGE") {
            if (instance.latestMessage.fid) {
              let index = vm.list.findIndex(
                (item) => item.fid === instance.latestMessage.fid
              );

              if (index > -1) {
                vm.$set(vm.list, index, instance.latestMessage);
              } else {
                vm.list.push({
                  ...instance.latestMessage,
                  user: vm.currentSelectedUser,
                });
              }
            } else {
              vm.list.push({
                ...instance.latestMessage,
                user: vm.currentSelectedUser,
              });
            }

            vm.$nextTick(() => {
              vm.lastMsgScrollToView(".message-box", () => this.list.length > 5);
            });
          }

          if(type == "HISTORY") {
            vm.list = instance.msgMap.get(vm.currentSelectedUserId);
          }
        },
      });

      this.chatInstance.connect();
      this.chatInstance.fetchContacts();
    });
  },
  methods: {
    // 插入emoji
    insertEmojiToMsg(e) {
      if (e.target.nodeName === "LI") {
        // 直接插入
        if (!this.cacheSelection) {
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

      let msg = {
        msg_type: 0,
        content: message,
      };

      let resp = this.chatInstance.sendText(this.currentSelectedUserId, msg);
      console.log(resp);
      this.list.push(resp);

      setTimeout(() => {
        this.editorRef.innerHTML = "";
        this.lastMsgScrollToView(".message-box", () => this.list.length > 5);
      });
    },
    onTabMenuClick(menu) {
      if (menu.key == "commonSentence") {
      }

      if (menu.key == "changePhone") {
        this.chatInstance.sendText(this.currentSelectedUserId, {
          msg_type: 2,
          content: "请求交换手机",
        });
      }
      if (menu.key == "weChat") {
        this.chatInstance.sendText(this.currentSelectedUserId, {
          msg_type: 2,
          content: "请求交换微信",
        });
      }
    },
    // 关闭简历弹窗
    closeResumePopperCb() {
      this.$refs.resumePopperRef.doClose();
    },
    // 点击单个联系人聊天
    chatToUser(item) {
      this.chatInstance.fetchHistory(item.id)
      this.currentSelectedUserId = item.id
    },
  },
};
</script>

<style lang="less" scoped src="./chat.less"></style>
