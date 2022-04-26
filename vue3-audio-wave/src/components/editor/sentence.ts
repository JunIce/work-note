import { Editor } from ".";

type MsentenceOption = {
    editor: Editor;
    text?: string;
};

export default class Msentence {
    words?: string;
    className: string;
    wrapper: HTMLElement | null;
    editor: Editor | null;

    constructor({ editor, text }: MsentenceOption) {
        this.className = "sentence";
        this.words = text;
        this.wrapper = null;
        this.editor = editor;
    }

    render() {
        let sentence_wrapper = document.createElement("ruby");
        sentence_wrapper.classList.add(this.className);
        sentence_wrapper.setAttribute("data-type", "sentence");

        if (this.words?.length == 0) {
            sentence_wrapper.classList.add("empty-sentence");
        }

        if (!this.wrapper) {
            this.wrapper = sentence_wrapper;
            this.updateEvents();
        }

        sentence_wrapper.textContent = this.words || ''

        return sentence_wrapper;
    }

    updateEvents() {
        // addEventListener(this.wrapper!, "click", (e: KeyboardEvent) => {
        //     console.log(e);
        // });
    }
}
