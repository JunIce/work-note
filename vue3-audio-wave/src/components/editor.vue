<template>
    <div class="header">
        <t-button theme="default" variant="base"> 填充按钮 </t-button>
    </div>
    <div class="menu-section">
        <t-button @click="toggle">切换显示拼音</t-button>
        <t-button @click="pinyin">标注拼音</t-button>
        <t-button @click="insertMaker">插入标记</t-button>
        <t-button @click="collapseRange">折叠选区</t-button>
        <t-button @click="selectedMark">划选标记</t-button>
    </div>
    <div class="content">
        <div id="editor" ref="editorRef" contenteditable="true"></div>
    </div>
    <div class="footer">

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


        const selectedMark = () => {
            // 划选两边加标记
            editorDo.value!.do("between-mark");

        }

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
            selectedMark
        };
    },
});
</script>

<style lang="less" scoped>
.header {
    height: 66px;
}

.menu-section {
    height: 76px;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    background: #f4f6f7;
}

.footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 40px;
    padding: 0 16px;
    border-top: 1px solid #e5e5e5;
    background-color: #f4f4f4;
}

.content {
    width: 100%;
    height: calc(100% - 182px);
    overflow-y: auto;
    overflow-x: hidden;
    padding: 20px 48px;
    box-sizing: border-box;
    font-size: 16px;
    color: #002030;
    background-color: #fff;
    overflow-y: auto;
    position: relative;
    overflow-x: hidden;

    #editor {
        width: 90%;
        height: 400px;
        margin: auto;
        outline: none;

        rt {
            user-select: none;
        }
    }
}
</style>
