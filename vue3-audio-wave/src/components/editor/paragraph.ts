import { Editor } from ".";
import Msentence from "./sentence";
import Mword from "./word";
import { debounce, throttle } from "./utils";

type MparagraphOption = {
    editor: Editor;
};

export default class Mparagraph {
    sentences: any[];
    className: string;
    editor: null | Editor;
    el: HTMLElement | any;
    observer: MutationObserver;

    private update = debounce(
        (mutations: MutationRecord[], _observer: MutationObserver) => {
            mutations.forEach((mutation) => {
                // text node change
                if (
                    mutation.type === "characterData" &&
                    mutation.target.nodeType === 3
                ) {
                    // if()
                    let target = mutation.target as Text;
                    // 判断是否超过一个字的文本节点
                    if (target.length > 1) {
                        let node = Mword.textStringToMwordNode(
                            target.textContent as string
                        );

                        target.parentNode?.insertBefore(node, target)
                        // target.parentNode?.removeChild(target)
                        target.remove()
                    }
                }
            });
        },
        500
    );

    constructor({ editor }: MparagraphOption) {
        this.sentences = [];
        this.className = "m_paragraph";
        this.editor = editor;
        this.el = this.render();
        this.observer = new MutationObserver(this.update);
        this.init();
    }

    init() {
        this.observer.observe(this.el, {
            childList: true,
            subtree: true,
            // attributes: true,
            characterData: true,
        });
        this.addSentence();
    }

    get value() {
        return this.sentences;
    }

    addSentence() {
        let sentence = new Msentence({
            editor: this.editor!,
            text: "我的手机手机电视就激动激动激动",
        });
        this.sentences.push(sentence);
        this.el.appendChild(sentence.value);
    }

    render() {
        let paragraph_wrapper = document.createElement("div");
        paragraph_wrapper.classList.add(this.className);
        paragraph_wrapper.setAttribute("data-type", "paragraph");
        return paragraph_wrapper;
    }
}
