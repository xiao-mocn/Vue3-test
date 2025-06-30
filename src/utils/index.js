function throttle(fn, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      return fn(...args);
    }
  };
}

function throttle1(fn, interval) {
  let timer = null;
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args);
        timer = null;
      }, interval);
    }
  }
}

Function.prototype.myBind = function(context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('Function.prototype.myBind - what is trying to be bound is not callable');
  }
  const fn = this;
  return function(...innerArgs) {
    return fn.apply(
      this instanceof fn ? this : context,
      args.concat(innerArgs)
    )
  }
}
