<template>
  <div class="home-container page-container">
    <div class="box" ref="boxRef"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useDrag } from './hooks'

export default defineComponent({
  name: 'Home',
  setup() {
    const boxRef = ref<HTMLElement | null>(null)

    useDrag(boxRef)

    return {
      boxRef
    }
  }
})
</script>

<style scoped lang="less">
.box {
  width: 200px;
  height: 200px;
  background-color: aqua;
}
</style>
