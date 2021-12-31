<template>
  <div class="message-item" :data-mid="item.id" :data-isread="item.status">
    <!-- 文本消息 -->
    <template v-if="msgMain.msg_type == 0">
      <div class="msg-box" :class="[isSelf ? 'reverse' : 'custom']">
        <div v-if="!isSelf" class="msg-avatar">
          <img :src="item.user && item.user.avatar" alt="" />
        </div>

        <div class="msg-wrapper">
          <span>{{ msgMain.content }}</span>
          <div v-if="isSelf" class="msg-tip">
            <i class="sending" v-if="item.status == 0"></i>
            <i class="had_send" v-if="item.status == 1"></i>
            <i class="readed" v-if="item.status == 2"></i>
          </div>
        </div>
      </div>
    </template>

    <!-- 模板消息 -->
    <template v-if="msgMain.msg_type == 1">
      <div class="msg-box" :class="[isSelf ? 'reverse' : 'custom']">
        <div v-if="!isSelf" class="msg-avatar">
          <img :src="msgMain.user && msgMain.user.avatar" alt="" />
        </div>

        <template v-if="msgMain.type == 3">
          <div class="msg-resume-requiry-box">
            <div class="msg-content-main">
              <div class="icon-message-resume">
                <img src="../images/icon-message-resume.png" alt="" />
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
      </div>
    </template>

    <!-- 提示消息 -->
    <template v-if="msgMain.msg_type == 2">
      <div class="msg-center">
        <div class="msg-main">{{ msgMain.content }}</div>
      </div>
    </template>
  </div>
</template>

<script>
/**
 * msg_type
 *  0 纯文本
 *  1 模板消息
 *  2 提示消息
 */
export default {
  name: "MessageItem",
  props: {
    item: {
      type: Object,
      default: {},
    },
    fromUserId: {
      type: Number,
      default: "",
    },
    toUserId: {
      type: Number,
      default: "",
    },
  },
  computed: {
    isSelf() {
      return (
        this.item.fromUserId == this.fromUserId &&
        this.item.toUserId == this.toUserId
      );
    },
    msgMain() {
      return this.item.message || {};
    },
  },
};
</script>

<style lang="less" scoped>
.common-msg-margin() {
  margin-left: 20px;
  margin-top: 10px;
}
.message-item {
  margin-top: 20px;
  .msg-box {
    position: relative;

    .msg-avatar {
      width: 34px;
      height: 34px;
      border-radius: 100%;
      overflow: hidden;
      display: inline-block;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }

    .msg-wrapper {
      display: inline-block;
      background-color: #f3f3f3;
      border-radius: 0px 7px 7px 7px;
      padding: 12px 20px;
      .common-msg-margin;

      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
    }

    &.reverse {
      // flex-direction: row-reverse;
      float: right;

      .msg-wrapper {
        color: #fff;
        background: #95beff;
        border-radius: 7px 0px 7px 7px;
        margin-left: 0;
      }
    }

    .msg-tip {
      position: absolute;
      top: 0px;
      left: -40px;

      .sending,
      .had_send,
      .readed {
        width: 20px;
        height: 12px;
        display: inline-block;
        background-repeat: no-repeat;
        background-size: contain;
      }

      .sending {
        background-image: url("../images/sending.svg");
      }

      .readed {
        background-image: url("../images/readed.svg");
      }

      .had_send {
        background-image: url("../images/sended.svg");
      }

      .error {
        background-image: url("../images/error.svg");
      }
    }
  }

  .msg-center {
    justify-content: center;

    .msg-main {
      width: 216px;
      height: 30px;
      background: #ffffff;
      border-radius: 15px;
      border: 1px solid #94bdff;
      margin: 0 auto;

      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #94bdff;
      line-height: 28px;
      padding: 0;
      text-align: center;
      margin: 0 auto;
    }
  }

  .msg-resume-requiry-box {
    width: 270px;
    height: 92px;
    border-radius: 5px;
    border: 1px solid #94bdff;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .common-msg-margin;

    .msg-content-main {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;

      .icon-message-resume {
        display: inline-block;
        width: 32px;
        height: 32px;
        background: #94bdff;
        border-radius: 5px;
        img {
          width: 20px;
          height: 20px;
          display: block;
          margin: 6px auto 0;
        }
      }

      .icon-msg-text {
        flex: 1;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 20px;
        margin-left: 20px;
      }
    }

    .msg-req-btn-section {
      height: 35px;
      background: #f8fbff;
      border-radius: 0px 0px 5px 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #94bdff;

      .btn-item {
        width: 50%;
        height: 35px;
        line-height: 35px;
        text-align: center;

        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #94bdff;
        cursor: pointer;

        &.reject {
          color: #aaaaaa;
          border-right: 1px solid #94bdff;
        }
      }
    }
  }

  &::after {
    display: block;
    visibility: hidden;
    clear: both;
    overflow: hidden;
    content: "";
  }
}
</style>
