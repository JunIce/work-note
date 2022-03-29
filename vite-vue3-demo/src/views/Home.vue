<template>
  <div class="home-container page-container">
    {{count}}

    <!-- <Child name="childName"></Child> -->
    <!-- <Child3 id="child3" class="child3-demo"></Child3> -->
    <!-- <Child2 :modelValue="child2Value" @update:modelValue="child2Value = $event"></Child2> -->
    <!-- <Child4 :list="list"></Child4> -->
    <Child5></Child5>

    <button ref="btnRef" @click="onIncrease">increase</button>
    <button @click="onDecrease">decrease</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, effect, stop, reactive } from 'vue'
import Child from "./Child.vue"
import Child2 from "./Child2.vue"
import Child3 from "./Child3.vue"
import Child4 from "./Child4.vue"
import Child5 from "./Child5.ts"

export default defineComponent({
  name: 'Home',
  components: {
    Child,
    Child2,
    Child3,
    Child4,
    Child5
  },
  setup() {

    const count = ref(0)
    const btnRef = ref(null)

    const child2Value = ref('1')

    effect(() => {
      console.log(1)
    })

    let c = effect(() => {
      console.log(2, count.value)
    }, {
      lazy: true,
      onStop: () => {
        console.log('stop cb')
      }
    })

    
    const state = reactive({num1: 0, num2: 0})

    let d = 0
    let countc = 0
    
    effect(() => {
      d = state.num1 + state.num1 + state.num2
      console.log(d)
      countc++
      console.log("run times: ", countc)
    })



    onMounted(() => {
      console.log(btnRef.value)

      setTimeout(() => {
        c()
      }, 3000)

      setTimeout(() => {
        stop(c)
      }, 5000)
    })

    const onIncrease = () => count.value++
    const onDecrease = () => {
      state.num2 = state.num1 = 7
    }

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
