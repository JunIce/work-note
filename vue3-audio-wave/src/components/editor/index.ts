import Mparagraph from "./paragraph";
import SelectionUtils from "./SelectionUtils";
import Msentence from "./sentence";
import { addEventListener, getCurrentRange, logger } from "./util";
import Mword from "./word";


type EditorOption = {
    el: HTMLElement
}

export class Editor {
    container: HTMLElement;
    content: any;
    currentBlock: Msentence|null;
    currentSelectRange?: Range|null;
    sel: SelectionUtils;

    constructor(options: EditorOption) {
        this.container = options.el
        this.container.classList.add(SelectionUtils.CSS.editorZone)
        this.content = [];
        this.currentBlock = null;
        this.currentSelectRange = null;
        this.sel = new SelectionUtils();
        this.init()
    }

    get value() {
        return this
    }


    get selectAWord() {
        return this.currentSelectRange?.startContainer.nodeType === 3 && this.currentSelectRange?.startContainer === this.currentSelectRange?.endContainer
    }

    init() {
        addEventListener(this.container, 'keypress', this.onKeyPress.bind(this))
        addEventListener(this.container, 'click', this.onClick.bind(this))
        addEventListener(document, 'selectionchange', this.onSelection.bind(this))

        if(this.content.length == 0) {
            this.addNewParagraph()
        }
    }


    onKeyPress(e:KeyboardEvent) {
        if(e.keyCode === 13) {
            this.addNewParagraph()
        }
    }


    onClick(e: PointerEvent) {

        let target = e.target as HTMLElement
        if(target.nodeName === 'RUBY' && target.getAttribute("data-type") === "sentence") {
            //@ts-ignore
            this.currentBlock = target.__sentence
            if(!this.currentSelectRange) {
                this.sel.collapseToEnd()
            }
        } else {
            this.sel.collapseToEnd()
        }
        console.log(target.getAttribute("data-type"))
        // this.currentBlock = e.currentTarget
    }

    onSelection(e: Selection) {
        let range = SelectionUtils.range as Range
        this.currentSelectRange = null
        
        if(SelectionUtils.isRangeAtEditor(range)) {
            this.currentSelectRange = range
        }
    }


    addNewParagraph() {
        let paragraph = new Mparagraph({ editor: this })
        this.content.push(paragraph)
    }

    render() {
        let content = this.content.slice()

        content.forEach((paragraph: Mparagraph) => {
            this.container.appendChild(paragraph.render())
        })
    }

    do(type: string, data1?: string) {
        if(type === 'insertMaker') {
            // 光标折叠
            if(this.currentSelectRange?.collapse) {
                this.currentBlock?.insertMaker()
            }
        }

        if(type === 'pinyin') {
            // 是否选择的单个字
            if(this.selectAWord) {
                let textNode = this.currentSelectRange?.startContainer

                //@ts-ignore
                let cword = textNode.__word as Mword
                cword.setPinyin(data1!)

                // textNode?.parentNode?.removeChild(textNode)

                let temp = document.createTextNode("")
                let parentNode = textNode?.parentNode
                parentNode?.insertBefore(temp, textNode!)
                parentNode?.removeChild(textNode!)
                parentNode?.insertBefore(cword.pinyinFragment, temp)
                parentNode?.removeChild(temp)



                // textNode?.parentNode?.insertBefore(cword.pinyinFragment, textNode)



                console.dir(parentNode)
            }

            // let range = getCurrentRange()
            // logger(range);

            // let rangeClone = range?.cloneRange()         

            // let ruby = document.createElement('ruby')
            // ruby.setAttribute('type', 'word')
            
            
            // if(rangeClone?.toString()) {
            //     let text = document.createTextNode(rangeClone?.toString())

            //     let pinyin = document.createElement('rt')
            //     pinyin.setAttribute('contentEditable', 'false')
            //     pinyin.appendChild(document.createTextNode(data1))

            //     ruby.appendChild(text)
            //     ruby.appendChild(pinyin)


            //     if(range?.startContainer === range?.endContainer && range?.startContainer.nodeName === '#text') {
            //         if(range.commonAncestorContainer.nextSibling?.nodeName === 'RT') {
            //             // update
            //             range.startContainer?.parentNode?.removeChild(range.commonAncestorContainer.nextSibling)
            //             range.startContainer?.parentNode?.appendChild(pinyin)
            //             return
            //         } else {
            //             range?.deleteContents()
            //         }
            //     } else if(range?.commonAncestorContainer.nodeName === 'RUBY') {
            //         range?.commonAncestorContainer.parentNode?.removeChild(range?.commonAncestorContainer)
            //     }

            //     range?.insertNode(ruby)
            // }
        }
    }
}