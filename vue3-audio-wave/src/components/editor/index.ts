import Mparagraph from "./paragraph";
import { addEventListener } from "./util";



export class Editor {
    container: any;
    content: any;

    constructor(options: any) {
        this.container = options.el
        this.content = [];
        console.log(options);
        this.init()
    }

    init() {
        addEventListener(this.container, 'keypress', this.onKeyPress)

        if(this.content.length == 0) {
            this.addNewParagraph()
        }
    }


    onKeyPress(e:KeyboardEvent) {
        // console.log(e)
        if(e.keyCode === 13) {
            this.addNewParagraph()
        }
    }


    addNewParagraph() {
        let paragraph = new Mparagraph({ editor: this })
        this.content.push(paragraph)

        this._render()
    }

    _render() {
        let content = this.content.slice()

        content.forEach((paragraph: Mparagraph) => {
            this.container.appendChild(paragraph.render())
        })
    }
}