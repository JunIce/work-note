<template>
  <input id="child2" type="text" :value="modelValue" @input="onInputChange">
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    props: {
        modelValue: String
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
        const onInputChange = (e: any) => {
            emit('update:modelValue', e.target.value)
        }

        return {
            onInputChange
        }
    }
})
</script>