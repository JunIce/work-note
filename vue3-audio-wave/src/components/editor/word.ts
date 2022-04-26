import { Editor } from ".";
import Msentence from "./sentence";

export default class Mword {
    idx?: number;
    word: any;
    el?: HTMLElement | null;
    parent?: HTMLElement | null;
    sentence?: Msentence;
    editor?: Editor;
    pinyin?: string;
    
    constructor(word: string) {
        let wordNode = document.createTextNode(word)
        //@ts-ignore
        wordNode.__word = this

        this.word = wordNode
    }

    get value() {
        return this.word
    }


    setPinyin(pinyin: string) {
        this.pinyin = pinyin
    }


    get pinyinFragment() {
        if(!this.pinyin) return this.word
        let ruby = document.createElement('ruby')
        ruby.setAttribute('type', 'word')
        
        let pinyin = document.createElement('rt')
        pinyin.setAttribute('contentEditable', 'false')
        pinyin.appendChild(document.createTextNode(this.pinyin))

        ruby.appendChild(this.word)
        ruby.appendChild(pinyin)
        return ruby
    }
}
