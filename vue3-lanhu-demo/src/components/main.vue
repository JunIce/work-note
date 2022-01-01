<template>
  <div class="container">
    <div
      class="main-box"
      :style="style"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
      @mousemove="onMouseMove"
    ></div>
  </div>
</template>

<script>
import { computed, reactive } from "vue";
import { throttle } from "../util";

export default {
  setup() {
    const boxTransformState = reactive({
      left: 200,
      top: 200,
    });

    const style = computed(() => {
      let transform = `translate(${boxTransformState.left}px, ${boxTransformState.top}px)`;
      return {
        width: "400px",
        height: "400px",
        transform: transform,
      };
    });

    const onMouseDown = (e) => {
      e.target.$isMove = true;
      e.target.currentPosition = {
        offsetX: e.offsetX,
        offsetY: e.offsetY,
        x: e.clientX,
        y: e.clientY,
      };
    };

    const onMouseUp = (e) => {
      e.target.$isMove = false;
      e.target.currentPosition = {};
    };

    const onMouseMove = throttle((e) => {
      if (e.target.$isMove) {
        boxTransformState.left = e.clientX - e.target.currentPosition.offsetX;
        boxTransformState.top = e.clientY - e.target.currentPosition.offsetY;

        e.target.currentPosition.x = e.clientX;
        e.target.currentPosition.y = e.clientY;
      }
    }, 20);

    return {
      style,
      // events
      onMouseDown,
      onMouseUp,
      onMouseMove,
    };
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background: #f1f1f1;
  position: relative;

  .main-box {
    background-color: aqua;
    // position: absolute;
    // z-index: 1;
  }
}
</style>
