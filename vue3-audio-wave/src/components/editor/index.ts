import Mparagraph from "./paragraph";
import SelectionUtils from "./SelectionUtils";
import Msentence from "./sentence";
import { addEventListener, logger } from "./util";
import Mword from "./word";

type EditorOption = {
    el: HTMLElement;
};

export class Editor {
    container: HTMLElement;
    content: any;
    currentBlock: Msentence | null;
    currentSelectRange?: Range | null;
    sel: SelectionUtils;

    _caretBaseNode: any;

    constructor(options: EditorOption) {
        this.container = options.el;
        this.container.classList.add(SelectionUtils.CSS.editorZone);
        this.content = [];
        this.currentBlock = null;
        this.currentSelectRange = null;
        this.sel = new SelectionUtils();

        // this._caretBaseNode = null;

        this.init();
    }

    get value() {
        return this;
    }

    get selectAWord() {
        return (
            this.currentSelectRange?.startContainer.nodeType === 3 &&
            this.currentSelectRange?.startContainer ===
                this.currentSelectRange?.endContainer
        );
    }

    init() {
        addEventListener(
            this.container,
            "keypress",
            this.onKeyPress.bind(this)
        );
        addEventListener(this.container, "click", this.onClick.bind(this));
        addEventListener(
            document,
            "selectionchange",
            this.onSelection.bind(this)
        );
        addEventListener(this.container, "focus", this.onFocus.bind(this));
        // addEventListener(this.container, "change", this.onInput.bind(this))

        if (this.content.length == 0) {
            this.addNewParagraph();
        }
    }

    onKeyPress(e: KeyboardEvent) {
        if (e.keyCode === 13) {
            e.preventDefault();
            this.addNewParagraph();
        }
    }

    onInput(e: KeyboardEvent) {
        logger(e);
    }

    onFocus() {
        logger(SelectionUtils.anchorNode);
    }

    onClick(e: PointerEvent) {
        let target = e.target as HTMLElement;
        if (
            target.nodeName === "RUBY" &&
            target.getAttribute("data-type") === "sentence"
        ) {
            //@ts-ignore
            this.currentBlock = target.__sentence;
        } else {
            this.sel.collapseToEnd();
        }
        // console.log(target.getAttribute("data-type"))
    }

    onSelection(e: Selection) {
        let range = SelectionUtils.range as Range;
        this.currentSelectRange = null;
        let selection = window.getSelection();

        if (SelectionUtils.isRangeAtEditor(range)) {
            this.currentSelectRange = range;

            if (selection?.type === "Caret") {
                // console.log(range.startContainer)
                this._caretBaseNode = range.startContainer;
            }
        }
    }

    addNewParagraph() {
        let paragraph = new Mparagraph({ editor: this });
        this.content.push(paragraph);

        console.log(this.content);
    }

    render() {
        let content = this.content.slice();

        content.forEach((paragraph: Mparagraph) => {
            this.container.appendChild(paragraph.el);
        });
    }

    do(type: string, data1?: string) {
        if (type === "insertMaker") {
            // 光标折叠
            if (this.currentSelectRange?.collapse) {
                this.currentBlock?.insertMaker();
            }
        }

        if (type === "pinyin") {
            // 是否选择的单个字
            if (this.selectAWord) {
                let textNode = this.currentSelectRange?.startContainer;

                //@ts-ignore
                let cword = textNode.__word as Mword;
                cword.setPinyin(data1!);

                // textNode?.parentNode?.removeChild(textNode)

                let temp = document.createTextNode("");
                let parentNode = textNode?.parentNode;
                parentNode?.insertBefore(temp, textNode!);
                parentNode?.removeChild(textNode!);
                parentNode?.insertBefore(cword.pinyinFragment, temp);
                parentNode?.removeChild(temp);

                console.dir(parentNode);
            }
        }


        if(type === 'between-mark') {
            let mark = document.createElement("mark")

            mark.appendChild(this.currentSelectRange?.extractContents()!)
            this.currentSelectRange?.insertNode(mark)
            
        }
    }
}
