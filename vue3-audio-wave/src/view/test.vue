<template>
  <div style="color: blue">
    <h1>123</h1>
  </div>
</template>
<script lang='ts' setup>
import { reactive } from 'vue';


const color = 'red'

const state = reactive({
    size: '12px'
})

</script>
<style scoped>
 h1 {
    color: v-bind(color);
    size: v-bind('state.size')
 }
</style>
