import { Editor } from ".";
import Msentence from "./sentence";

type MparagraphOption = {
    editor: Editor;
};

export default class Mparagraph {
    sentences: any[];
    className: string;
    editor: null | Editor;
    el: HTMLElement | any;
    observer: MutationObserver;

    constructor({ editor }: MparagraphOption) {
        this.sentences = [];
        this.className = "m_paragraph";
        this.editor = editor;
        this.el = this.render();
        this.observer = new MutationObserver(this.mutationObserverCallback);
        this.init();
    }

    init() {
        this.observer.observe(this.el, {
            childList: true,
            subtree: true,
            attributes: true
        });
        this.addSentence();
        // this.el = this.render()
    }

    mutationObserverCallback(
        mutations: MutationRecord[],
        observer: MutationObserver
    ) {
        console.log(mutations, observer);
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
