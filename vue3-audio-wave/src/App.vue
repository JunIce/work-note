<template>
    <div class="flex">
        <div style="width: 70%">
            <editorVue />
        </div>
        <div style="width: 30%">
            <demo />
        </div>
    </div>
</template>

<script>
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
.flex {
    display: flex;
}
</style>
