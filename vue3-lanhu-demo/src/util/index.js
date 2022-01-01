export const throttle = (fn, time) => {
  let prev = Date.now();
  return function () {
    let now = Date.now();
    if (now - prev > time) {
      fn.call(this, ...arguments);
      prev = now;
    }
  };
};
