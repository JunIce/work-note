<template>
  <p>{{name}}</p>
  <p>1</p>
  <p>2</p>
  <p>3</p>
  <input type="text" v-model="inputValue" >
  <input type="text" :value="inputValue" @update:value="inputValue = $event.target.value">

  <p>{{inputValue}}</p>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
    props: {
        name: String
    },
    setup() {
        const inputValue = ref('')
        

        return {
            inputValue
        }
    }
})
</script>