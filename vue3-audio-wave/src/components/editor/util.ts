export const addEventListener = (
    el: HTMLElement,
    type: keyof HTMLElementEventMap,
    fn: any,
    options = {}
) => {
    el.addEventListener(type, fn, Object.assign({ passive: false }, options));
    return () => {
        el.removeEventListener(type, fn);
    };
};


export const getCurrentRange = () => {
    let selection = window.getSelection()
    return selection?.getRangeAt(0)
}


export const logger = (data: any) => console.dir(data);
