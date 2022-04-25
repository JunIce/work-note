import { Editor } from ".";
import { addEventListener } from "./util";

type MsentenceOption = {
    editor: Editor;
};

export default class Msentence {
    words: any[];
    className: string;
    wrapper: HTMLElement | null;
    editor: Editor | null;

    constructor({ editor }: MsentenceOption) {
        this.className = "sentence";
        this.words = [];
        this.wrapper = null;
        this.editor = editor;
    }

    addWord(word: any) {
        this.words.push(word);
    }

    render() {
        let sentence_wrapper = document.createElement("ruby");
        sentence_wrapper.classList.add(this.className);
        sentence_wrapper.setAttribute("aria-label", "sentence");

        if (this.words.length == 0) {
            sentence_wrapper.classList.add("empty-sentence");
        }

        if (!this.wrapper) {
            this.wrapper = sentence_wrapper;

            this.updateEvents();
        }

        return sentence_wrapper;
    }

    updateEvents() {
        addEventListener(this.wrapper!, "click", (e: KeyboardEvent) => {
            console.log(e);
        });
    }
}
