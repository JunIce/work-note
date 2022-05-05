<template>
    <div class="article">
        <editorVue></editorVue>
    </div>
</template>

<script lang="ts">
import editorVue from "./components/editor.vue";
import demo from "./components/demo.vue";
export default {
    name: "App",
    components: {
        editorVue,
        demo,
    },
};
</script>

<style>
#app {
    height: 100%;
}

.article {
    height: 100%;
}
</style>
