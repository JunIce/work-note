<template>
    <div class="content">
        <button @click="toggle">toggle</button>
        <button @click="getSelection">selection</button>
        <button @click="pinyin">标注拼音</button>
        <button @click="insertMaker">插入标记</button>
        <button @click="collapseRange">折叠选区</button>

        <div id="editor" ref="editorRef" contenteditable="true"></div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, shallowRef } from "vue";
import Mock from "mockjs";
import { Editor } from "./editor";
import "./editor/assets/index.less";

// function genMockData() {
//     return Mock.mock({
//         "data|20": [
//             {
//                 word: "@cword(1)",
//                 py: "@lower(@first)",
//             },
//         ],
//     });
// }

let data = { data: [] };

export default defineComponent({
    setup() {
        const editorRef = ref<HTMLElement | null>(null);
        const ulRef = ref<HTMLElement | null>(null);
        const editorDo = shallowRef<Editor | null>(null);
        const words = ref(data.data);
        const visible = ref(true);
        const toggle = () => (visible.value = !visible.value);
        const getSelection = () => {
            let selection = window.getSelection();
            console.log(selection);
        };

        onMounted(() => {
            editorDo.value = new Editor({
                el: editorRef.value!,
            });

            editorDo.value.render();
        });

        const pinyin = () => {
            editorDo.value!.do("pinyin", Mock.mock("@first"));
        };

        const insertMaker = () => {
            editorDo.value!.do("insertMaker");
        };

        const collapseRange = () => {
            let selection = window.getSelection();
            let range = selection?.getRangeAt(0);
            // range?.collapse()
            setTimeout(() => {
                // selection?.collapseToEnd()
                range?.collapse(false);
                console.log(range);
            }, 1000);
            // selection?.addRange(range!)
        };

        return {
            ulRef,
            editorRef,
            words,
            visible,
            toggle,
            getSelection,
            pinyin,
            insertMaker,
            collapseRange,
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
