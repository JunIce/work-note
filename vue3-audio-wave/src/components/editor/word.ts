import { Editor } from ".";
import Msentence from "./sentence";

type MwordOption = {
    tag?: string;
    text: string;
};

export default class Mword {
    idx?: number;
    word: any;
    el?: HTMLElement | Text | null;
    parent?: HTMLElement | null;
    sentence?: Msentence;
    editor?: Editor;
    pinyin?: string;

    constructor({ tag = "", text }: MwordOption) {
        let wordNode: HTMLElement | Text = tag
            ? document.createElement(tag)
            : document.createTextNode(text);

        if (tag) {
            (wordNode as HTMLElement).contentEditable = "false";
            wordNode.textContent = text;
        }

        //@ts-ignore
        wordNode.__word = this;

        this.el = wordNode;
        this.word = wordNode;
    }

    get value() {
        return this.word;
    }

    setPinyin(pinyin: string) {
        this.pinyin = pinyin;
    }

    get pinyinFragment() {
        if (!this.pinyin) return this.word;
        let ruby = document.createElement("ruby");
        ruby.setAttribute("type", "word");
        ruby.contentEditable = "false"

        let pinyin = document.createElement("rt");
        pinyin.setAttribute("contentEditable", "false");
        pinyin.appendChild(document.createTextNode(this.pinyin));

        ruby.appendChild(this.word);
        ruby.appendChild(pinyin);
        return ruby;
    }



    public static textStringToMwordNode(text: string) {
        let fragment = document.createDocumentFragment()

        for(let i = 0; i < text.length; i++) {
            let word = new Mword({text: text.charAt(i)})
            fragment.appendChild(word.el!)
        }

        return fragment
    }
}
