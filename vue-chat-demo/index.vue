<template>
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
            <section class="message-box">
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
                      <div></div>
                    </template>
                    <div class="msg-wrapper" v-else>
                      <span>{{ item.message }}</span>
                    </div>
                  </div>
                </div>
              </template>

              <div class="chat-message-tip">底部提示文字</div>
            </section>
            <section class="chat-tab-menu"></section>
            <section class="chat-input">
              <el-input
                class="input-main"
                type="textarea"
                v-model="message"
                @keyup.enter.native="confirm"
              ></el-input>
              <div class="confirm-section">
                <span class="confirm-txt"
                  >按Enter键发送，按Ctrl+Enter键换行</span
                >
                <button class="confirm-btn">发送</button>
              </div>
            </section>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import socket from "./websockt";

export default {
  data() {
    return {
      message: "",
      userList: new Array(10).fill(0).map((item) => {
        return {
          avatar:
            "https://img1.baidu.com/it/u=1506064908,1725513834&fm=26&fmt=auto",
          name: "这里是名字",
          desc: "这里是描述",
        };
      }),
      currentIndex: null,
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
    this.socket = socket.init("ws://localhost:62912", {
      onOpen: () => {},
      onMessage: (message) => {
        let result = JSON.parse(message);
        this.list.push(result);
      },
      onError: () => {},
    });
  },
  methods: {
    confirm() {
      console.log(1);
      socket.se;
      this.list.push({
        message: this.message,
        type: 0,
      });
      this.socket.send(JSON.stringify({ message: this.message }));
      this.message = "";
    },
  },
};
</script>

<style lang="less" scoped>
.page-chat {
  .chat-header {
    height: 60px;
    line-height: 60px;
    padding: 0 24px;
    background: #ffffff;
    box-shadow: 0px 2px 4px 2px rgba(170, 170, 170, 0.2);

    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
  }

  .chat-wrapper {
    margin-top: 10px;
    display: flex;
    height: 800px;

    .chat-side-box {
      width: 330px;
      // width: 330px;
      height: 100%;
      background: #ffffff;
      box-shadow: -1px 2px 4px 2px rgba(170, 170, 170, 0.2);

      .chat-list {
        padding-top: 10px;
        .chat-list-item {
          display: flex;
          align-items: center;
          padding: 10px 24px;
          box-sizing: border-box;
          position: relative;

          .avatar-box {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
              display: block;
            }
          }

          .item-info {
            flex-grow: 1;
            margin-left: 10px;

            .name {
              font-size: 18px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #666666;
              line-height: 25px;
            }

            .desc {
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #aaaaaa;
              line-height: 20px;
              margin-top: 6px;
            }
          }

          &::before {
            content: "";
            display: block;
            width: 4px;
            height: 100%;
            background-color: transparent;
            position: absolute;
            top: 0;
            left: 0;
          }

          &:hover {
            background-color: #f3f8ff;
          }

          &.active {
            background-color: #f3f8ff;

            &::before {
              background-color: #94bdff;
            }
          }
        }
      }
    }

    .chat-room-wrapper {
      flex: 1;
      height: 100%;
      margin-left: 10px;
      box-shadow: -1px 2px 4px 2px rgba(170, 170, 170, 0.2);
    }

    .chat-room-header {
      width: 100%;
      height: 50px;
      background: #f2f7ff;
      line-height: 50px;
      padding: 0 18px;
      box-sizing: border-box;
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
    }

    .chat-room {
      display: flex;
      flex-direction: column;
      height: calc(100% - 50px);

      .message-box {
        flex: 1;
        padding: 20px;
        position: relative;
        overflow-y: auto;
        overflow-x: hidden;

        .message-item {
          .msg-box {
            display: flex;
            margin-bottom: 20px;

            .msg-avatar {
              width: 34px;
              height: 34px;
              border-radius: 100%;
              overflow: hidden;
              img {
                width: 100%;
                height: 100%;
                display: block;
              }
            }

            .msg-wrapper {
              background-color: #f3f3f3;
              border-radius: 0px 7px 7px 7px;
              padding: 12px 20px;
              margin-left: 20px;
              margin-top: 10px;

              font-size: 18px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #666666;
            }
          }

          &.reverse {
            .msg-box {
              flex-direction: row-reverse;
            }

            .msg-wrapper {
              color: #fff;
              background: #95beff;
              border-radius: 7px 0px 7px 7px;
              margin-left: 0;
              // margin-right: 20px;
            }
          }

          &.center {
            .msg-box {
              justify-content: center;
            }

            .msg-wrapper {
              width: 216px;
              height: 30px;
              background: #ffffff;
              border-radius: 15px;
              border: 1px solid #94bdff;

              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #94bdff;
              line-height: 30px;
              padding: 0;
              text-align: center;
            }
          }
        }

        .chat-message-tip {
          width: 100%;
          height: 40px;
          box-sizing: border-box;
          color: #fff;
          background: #5690f4;
          position: absolute;
          bottom: 0;
          left: 0;
          line-height: 40px;
          padding: 0 18px;
        }
      }

      .chat-tab-menu {
        // width: 920px;
        height: 50px;
        background: #f2f7ff;
      }

      .chat-input {
        height: 190px;
        padding: 20px;
        box-sizing: border-box;
        position: relative;

        .input-main {
          height: 100%;
          /deep/ textarea {
            height: 100%;
            border: none;
            outline: none;
            padding: 0;
          }
        }

        .confirm-section {
          position: absolute;
          bottom: 10px;
          right: 10px;

          .confirm-txt {
            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #d8d8d8;
            line-height: 22px;
          }

          .confirm-btn {
            width: 80px;
            height: 36px;
            margin-left: 10px;
            background: #ffffff;
            border-radius: 18px;
            border: 1px solid #5690f4;

            font-size: 16px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #5690f4;
            text-align: center;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>