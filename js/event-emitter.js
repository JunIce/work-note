let eventEmitter = {};

function on(event, fn) {
  (eventEmitter[event] || (eventEmitter[event] = [])).push(fn);
}

function off(event, fn) {
  if (!fn) {
    eventEmitter[event] = null;
    return;
  }

  let cbs = eventEmitter[event];

  let i = cbs.length;

  while (i--) {
    if (cbs[i] === fn || cbs[i] === fn.fn) {
      cbs.splice(i, 1);
      break;
    }
  }
}

function once(event, fn) {
  function invoke() {
    off(event, invoke);
    fn.apply(null, arguments);
  }
  invoke.fn = fn;
  on(event, invoke);
}

function emit() {
  let _arguments = Array.prototype.slice.call(arguments);
  let event = _arguments[0];

  let _args = [];

  for (let _i = 1; _i < _arguments.length; _i++) {
    _args.push(_arguments[_i]);
  }

  let cbs = eventEmitter[event];

  for (let i = 0; i < cbs.length; i++) {
    cbs[i].apply(null, _args);
  }
}

export default eventEmitter;
