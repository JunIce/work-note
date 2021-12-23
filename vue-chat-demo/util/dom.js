/**
 * 
 * @param {HTMLElement} el 
 * @returns 
 */
export const getHtmlElementSize = (el) => {
  if (el.nodeType != 1) return null;
  const { top, left, width, height } = el.getBoundingClientRect();
  return {
    top,
    left,
    width,
    height,
    scrollTop: el.scrollTop,
  };
};

/**
 * 
 * @param {HTMLElement[]} elements 
 * @param {Function} filter 
 * @returns 
 */
export const filterTargetElements = (elements, filter) => {
  let targets = [];
  let elementsArray = Array.prototype.slice.call(elements)

  elementsArray.forEach(el => {
    if(filter(el, elementsArray)) {
      targets.push(el)
    }
  })

  return targets
}