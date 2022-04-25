<template>
  <div>
    <editorVue/>
  </div>
</template>

<script>
import editorVue from "./components/editor.vue"

export default {
  name: 'App',
  components: {
    editorVue
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
