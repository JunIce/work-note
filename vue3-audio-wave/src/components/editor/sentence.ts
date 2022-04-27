import { Editor } from ".";
import SelectionUtils from "./SelectionUtils";
import { addEventListener } from "./util";
import Mword from "./word";

type MsentenceOption = {
    editor: Editor;
    text?: string;
};

export default class Msentence {
    idx?: number;
    words?: string;
    wordsList: Mword[];
    className: string;
    wrapper: HTMLElement | null;
    editor?: Editor;

    constructor({ editor, text }: MsentenceOption) {
        this.className = "sentence";
        this.wordsList = [];
        this.wrapper = null;
        this.editor = editor;

        this._toCreateTextNodes(text);
    }

    _toCreateTextNodes(wordStr: string = "") {
        for (let i = 0; i < wordStr.length; i++) {
            let word = new Mword({ text: wordStr.charAt(i) });
            word.sentence = this;
            word.editor = this.editor;

            this.wordsList.push(word);
        }
    }

    get wordsFragment() {
        let frag = document.createDocumentFragment();

        this.wordsList.forEach((word: Mword, idx: number) => {
            word.idx = idx;
            frag.appendChild(word.word);
        });

        return frag;
    }

    get value() {
        let sentence_wrapper = document.createElement("ruby");
        sentence_wrapper.classList.add(this.className);
        sentence_wrapper.setAttribute("data-type", "sentence");
        //@ts-ignore
        sentence_wrapper.__sentence = this;

        if (this.words?.length == 0) {
            sentence_wrapper.classList.add("empty-sentence");
        }

        if (!this.wrapper) {
            this.wrapper = sentence_wrapper;
            // this.updateEvents();
        }

        sentence_wrapper.appendChild(this.wordsFragment);

        return sentence_wrapper;
    }

    highlight() {
        this.wrapper!.classList.add('highlight')
    }

    insertMaker() {
        let currentSelectRange = this.editor?.currentSelectRange;
        let maker = new Mword({ tag: 'maker', text:'200' });

        console.log(currentSelectRange);
        

        ;(maker.el as HTMLElement).classList.add("maker1");
        currentSelectRange!.insertNode(maker.el!);
        SelectionUtils.setCursor(maker.el!.nextSibling!, 0);
    }

    updateEvents() {
        addEventListener(this.wrapper!, "click", (e: KeyboardEvent) => {
            console.log(e);
        });
    }
}
