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
        let sentence = new Msentence({ editor: this.editor! });
        this.sentences.push(sentence);
    }

    render() {
        let paragraph_wrapper = document.createElement("div");
        paragraph_wrapper.classList.add(this.className);
        paragraph_wrapper.setAttribute("aria-label", "paragraph");

        this.sentences.forEach((sentence) => {
            paragraph_wrapper.appendChild(sentence.render());
        });

        return paragraph_wrapper;
    }
}
