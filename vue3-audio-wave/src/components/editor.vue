<template>
    <div class="content">
        <button @click="toggle">toggle</button>
        <button @click="getSelection">selection</button>

        <div id="editor" ref="editorRef" contenteditable="true"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import Mock from "mockjs";
import { Editor } from "./editor";
import "./editor/assets/index.less"

function genMockData() {
    return Mock.mock({
        "data|20": [
            {
                word: "@cword(1)",
                py: "@lower(@first)",
            },
        ],
    });
}

let data = genMockData();


export default defineComponent({
    setup() {
        const editorRef = ref(null);
        const words = ref(data.data);
        const visible = ref(true);
        const toggle = () => (visible.value = !visible.value);
        const getSelection = () => {
            let selection = window.getSelection();
            console.log(selection);
        };

        onMounted(() => {
            new Editor({
                el: editorRef.value,
            });
        });

        return {
            editorRef,
            words,
            visible,
            toggle,
            getSelection,
        };
    },
});
</script>

<style lang="less" scoped>
.content {
    width: 100%;
    height: 100%;

    #editor {
        width: 90%;
        height: 400px;
        padding: 20px;
        border: 1px solid #666;
        margin: auto;

        rt {
            user-select: none;
        }
    }
}
</style>
