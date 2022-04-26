<template>
    <div class="content">
        <div>
            <div id="test">一定不要把别人<i>都当傻子，</i><span>事实上，</span><i>所有你能遇到的人都比你聪明。</i>如果你能抱着这样的心态为人处世，那么你的人脉会越来越宽，财富越来越多，人生也就越来越好！</div>
            <ul ref="ulRef">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
                <li>5</li>
                <li>6</li>
                <li>7</li>
            </ul>
        </div>
        <button @click="toggle">toggle</button>
        <button @click="getSelection">selection</button>
        <button @click="pinyin">标注</button>
        <button @click="createRange">createRange</button>

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
                el: editorRef.value,
            });

            editorDo.value.render();
        });

        const pinyin = () => {
            editorDo.value!.do("pinyin", Mock.mock("@first"));
        };

        const createRange = () => {
            let sel = window.getSelection()
            sel?.removeAllRanges()
            // let crange = sel?.getRangeAt(0)
            // console.log(crange)


            let container = document.querySelector('#test')
            // let firstChild = container?.firstChild
            console.log(container?.childNodes)
            let target = container?.childNodes[2]
            let childElement = container?.children[0]


            // let first = ulRef.value!.childNodes[0];

            let range = document.createRange();
            // range.setStartBefore(target!)
            range.setStart(container!, 0);
            range.setEnd(container!, 3);
            // range

            // let clone = range.

            // range.selectNode(first);
            // range.deleteContents()

            // let c = document.createElement("b")
            // c.textContent = clone
            // c.classList.add('toblod')
            // range.insertNode(c)


            //     sel?.addRange(range)
            console.log(range);
        };

        return {
            ulRef,
            editorRef,
            words,
            visible,
            toggle,
            getSelection,
            pinyin,
            createRange,
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
