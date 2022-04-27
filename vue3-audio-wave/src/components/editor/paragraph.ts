import { Editor } from ".";
import Msentence from "./sentence";

type MparagraphOption = {
    editor: Editor;
};

export default class Mparagraph {
    sentences: any[];
    className: string;
    editor: null | Editor;

    constructor({ editor }: MparagraphOption) {
        this.sentences = [];
        this.className = "m_paragraph";
        this.editor = editor;
        this.init();
    }

    init() {
        this.addSentence();
    }

    get value() {
        return this.sentences;
    }

    addSentence() {
        let sentence = new Msentence({ editor: this.editor!, text: '我的手机手机电视就激动激动激动' });
        
        this.sentences.push(sentence);
    }

    render() {
        let paragraph_wrapper = document.createElement("div");
        paragraph_wrapper.classList.add(this.className);
        paragraph_wrapper.setAttribute("data-type", "paragraph");

        this.sentences.forEach((sentence: Msentence, idx: number) => {
            sentence.idx = idx
            paragraph_wrapper.appendChild(sentence.value);
        });

        return paragraph_wrapper;
    }
}
