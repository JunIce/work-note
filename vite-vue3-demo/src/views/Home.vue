<template>
  <div class="home-container page-container">
    <img class="vue-element-plus-logo" alt="Vue logo" src="../assets/logo.png" />
    <div class="page-title">Vite2.x + Vue3.x + TypeScript + Element Plus</div>
    {{count}}

    <!-- <Child name="childName"></Child> -->
    <Child3 id="child3" class="child3-demo"></Child3>
    <!-- <Child2 :modelValue="child2Value" @update:modelValue="child2Value = $event"></Child2> -->

    <button ref="btnRef" @click="onIncrease">increase</button>
    <button @click="onDecrease">decrease</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import Child from "./Child.vue"
import Child2 from "./Child2.vue"
import Child3 from "./Child3.vue"

export default defineComponent({
  name: 'Home',
  components: {
    Child,
    Child2,
    Child3
  },
  setup() {

    const count = ref(0)
    const btnRef = ref(null)

    const child2Value = ref('1')

    onMounted(() => {
      console.log(btnRef.value)
    })

    const onIncrease = () => count.value++
    const onDecrease = () => count.value--

    watch(child2Value, () => {
      console.log('change value:', child2Value.value)
    })

    return {
      btnRef,
      count,
      child2Value,
      onIncrease,
      onDecrease
    }
  }
})
</script>

<style scoped lang="stylus">
.home-container {
  .vue-element-plus-logo {
    width 50%
  }
}
</style>
