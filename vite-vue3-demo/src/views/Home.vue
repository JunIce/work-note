<template>
  <div class="home-container page-container">
    <img class="vue-element-plus-logo" alt="Vue logo" src="../assets/logo.png" />
    <div class="page-title">Vite2.x + Vue3.x + TypeScript + Element Plus</div>
    {{count}}

    <!-- <Child name="childName"></Child> -->
    <!-- <Child3 id="child3" class="child3-demo"></Child3> -->
    <!-- <Child2 :modelValue="child2Value" @update:modelValue="child2Value = $event"></Child2> -->
    <Child4 :list="list"></Child4>

    <button ref="btnRef" @click="onIncrease">increase</button>
    <button @click="onDecrease">decrease</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import Child from "./Child.vue"
import Child2 from "./Child2.vue"
import Child3 from "./Child3.vue"
import Child4 from "./Child4.vue"

export default defineComponent({
  name: 'Home',
  components: {
    Child,
    Child2,
    Child3,
    Child4
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

    const list = ref([
      {
        label: 'label1',
        value: 1
      },
      {
        label: 'label2',
        value: 2
      },
      {
        label: 'label3',
        value: 3
      },
      {
        label: 'label4',
        value: 4
      },
      {
        label: 'label5',
        value: 5
      }
    ])

    return {
      btnRef,
      count,
      child2Value,
      list,
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
