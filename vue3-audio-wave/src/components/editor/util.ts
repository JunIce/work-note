export const addEventListener = (
    el: HTMLElement,
    type: keyof HTMLElementEventMap,
    fn: any,
    options = {}
) => {
    el.addEventListener(type, fn, Object.assign({ passive: true }, options));
    return () => {
        el.removeEventListener(type, fn);
    };
};
