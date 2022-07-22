<template>
<div>
    <!-- 123 -->
    <input type="text" v-model="name">
</div>
</template>
<script lang='ts' setup>
import { ref } from 'vue'

const name = ref('jack');
</script>
<style lang="scss">
input {
    color: #333;
}
</style>
<style>
body {
    color: #999;
}
</style>