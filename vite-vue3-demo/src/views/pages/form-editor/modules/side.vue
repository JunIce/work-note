<template>
  <div>
    <div v-for="field in fields" :key="fields.type" class="field-item">
      <span>{{ field.label }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'side',
  setup() {
    const fields = reactive([
      {
        label: '输入框',
        type: 'INPUT'
      },
      {
        label: '单选框',
        type: 'RADIO'
      },
      {
        label: '多选框',
        type: 'CHECKBOX'
      },
      {
        label: '下拉选择框',
        type: 'SELECT'
      },
      {
        label: '开关',
        type: 'SWITCH'
      }
    ])

    return {
      fields
    }
  }
})
</script>
<style style="less" scoped>
.field-item {
  line-height: 35px;
  border: 1px solid #999;
  border-bottom: none;
}
</style>
