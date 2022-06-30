<template>
    <div class="article">
        <test></test>
        <!-- <editorVue></editorVue> -->
    </div>
</template>

<script lang="ts">
import editorVue from "./components/editor.vue";
import demo from "./components/demo.vue";
import test from "./view/test.vue"
export default {
    name: "App",
    components: {
        editorVue,
        demo,
        test
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
