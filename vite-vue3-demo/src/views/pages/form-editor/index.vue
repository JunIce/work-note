<template>
  <div class="test-container page-container">
    <a-row>
      <a-col :span="6">
        <Side></Side>
      </a-col>
      <a-col :span="12">
        <Content></Content>
      </a-col>
      <a-col :span="6">
        <Field></Field>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Side from './modules/side.vue'
import Content from './modules/content.vue'
import Field from './modules/field.vue'

export default defineComponent({
  name: 'Vuex',
  components: {
    Side,
    Content,
    Field
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="stylus"></style>
