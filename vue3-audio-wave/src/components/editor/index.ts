import Mparagraph from "./paragraph";
import { addEventListener, getCurrentRange, logger } from "./util";



export class Editor {
    container: any;
    content: any;
    currentBlock: any;

    constructor(options: any) {
        this.container = options.el
        this.content = [];
        this.currentBlock = null;
        this.init()
    }

    init() {
        addEventListener(this.container, 'keypress', this.onKeyPress.bind(this))
        addEventListener(this.container, 'click', this.onClick.bind(this))

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
        this.currentBlock = e.currentTarget
    }

    onSelection(e: Selection) {
        console.log(e)
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

    do(type: string, data1: string) {
        if(type === 'pinyin') {
            let range = getCurrentRange()
            logger(range);

            let rangeClone = range?.cloneRange()         

            let ruby = document.createElement('ruby')
            ruby.setAttribute('type', 'word')
            
            
            if(rangeClone?.toString()) {
                let text = document.createTextNode(rangeClone?.toString())

                let pinyin = document.createElement('rt')
                pinyin.setAttribute('contentEditable', 'false')
                pinyin.appendChild(document.createTextNode(data1))

                ruby.appendChild(text)
                ruby.appendChild(pinyin)


                if(range?.startContainer === range?.endContainer && range?.startContainer.nodeName === '#text') {
                    if(range.commonAncestorContainer.nextSibling?.nodeName === 'RT') {
                        // update
                        range.startContainer?.parentNode?.removeChild(range.commonAncestorContainer.nextSibling)
                        range.startContainer?.parentNode?.appendChild(pinyin)
                        return
                    } else {
                        range?.deleteContents()
                    }
                } else if(range?.commonAncestorContainer.nodeName === 'RUBY') {
                    range?.commonAncestorContainer.parentNode?.removeChild(range?.commonAncestorContainer)
                }

                range?.insertNode(ruby)
            }
        }
    }
}