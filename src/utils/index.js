
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

// function Left (initMsg) {
//   return new LeftBuild(initMsg);
// }

// class LeftBuild {
//   constructor(initMsg) {
//     this.taskQue = []; // 接收所有的任务数据
//     this.megQue = []; // 最后所执行的任务顺序
//     this.taskQue.push({
//       type: 'message',
//       msg: initMsg
//     })
//     this.scheduleRun();
//   }
//   scheduleRun() {
//     setTimeout(() => {
//       this.runTask();
//     }, 0);
//   }
//   move (msg) {
//     this.taskQue.push({
//       type: 'message',
//       msg
//     });
//     return this;
//   }
//   await (time) {
//     this.taskQue.push({
//       type: 'await',
//       msg: time
//     });
//     return this;
//   }
//   awaitFast (time) {
//     this.taskQue.push({
//       type: 'awaitFast',
//       msg: time
//     });
//     return this;
//   }
//   async runTask() {
//     if (this.taskQue.length === 0) return;
//     console.log('task: ', this.taskQue);
//     for (let task of this.taskQue) {
//       // console.log('task: ', task);
//       switch (task.type) {
//         case 'message':
//           this.megQue.push(task.msg);
//           break;
//         case 'await':
//           // 先执行完前面的消息，再等待时间后，再次对后续的代码执行
//           this.runMessage();
//           await this.delayRun(task.msg);
//           console.log('await ', task.msg);
//           break;
//         case 'awaitFast':
//           await this.delayRun(task.msg);
//           console.log('awaitFast ', task.msg);
//           break;
//       }
//     }
//     this.runMessage();
//   }
//   runMessage() {
//     this.megQue.forEach(msg => {
//       console.log(msg);
//     });
//     this.megQue = []; // 清空消息队列
//   }
//   delayRun(time) {
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve();
//       }, Number(time) * 1000);
//     });
//   }
// }

// // Left('left 1').move('up').await(2).move('down')
// Left('left 2').move('up').awaitFast(2).move('down')


function myCreate (obj) {
  function Fn() {};
  Fn.prototype = obj;
  Fn.prototype.constructor = Fn;
  return new Fn();
}

function NewInstanceOf (left, right) {
  let prototype = Object.getPrototypeOf(left);
  while (prototype) {
    if (prototype === right.prototype) return true;
    prototype = Object.getPrototypeOf(prototype)
  }
  return false;
}

function MyNew (fn, ...args) {
  if (typeof fn !== 'function') {
    return new TypeError('fn is not Funtion')
  }
  let obj = Object.create(fn.prototype);
  const result = fn.apply(obj, args);
  return (typeof result === 'object' && result !== null) ? result : obj
}

// 拦截构造函数的生成
function Person (name) {
  if (new.target === Person) {
    this.name = name
  } else {
    throw new Error('必须New生成实例')
  }
}

// 实现继承
function Parent (name) {
  this.name = name
}
Parent.prototype.say = () => {
  console.log('this is parent method')
}
// 原型链继承 -- 无法解决 共享一个prototype。
// function Child() {}
// Child.prototype = new Parent()
// const child = new Child()
// child.say() // this is parent method

// 构造函数继承 -- 无法继承prototype
// function Child(name) {
//   Parent.call(this, name)
// }
// const child = new Child()
// child.say() // Uncaught TypeError:child.say is not a function

// 组合式继承
// function Child(name) {
//   Parent.call(this, name);
// }
// Child.prototype = new Parent()
// Child.prototype.constructor = Child;


// // 寄生组合式
// function Child(name) {
//   Parent.call(this, name);
// }
// Child.prototype = Object.create(Parent.prototype);
// Child.prototype.constructor = Child;

// 防抖函数 -- 延迟一段时间触发，时间内再触发，会继续延迟
function debounce(fn, delay) {
  let timer = null
  return function () {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn.apply(this, [...arguments])
    }, delay);
  }
}
// 理解执行版本
function debounceImmediate(fn, delay, immediate = false) {
  let timer = null;
  return function (...args) {
    const callNow = immediate && !timer // 判断是否需要立即执行，或者已经执行过了？
    timer = setTimeout(() => {
      if (!immediate) fn.apply(this, args)
        timer = null;
    }, delay);
    if (callNow) fn.apply(this, args)
  }
}


// 节流函数 -- 规定时间内只执行一次
// 使用时间戳来实现
function throttle(fn, delay) {
  let lastTime = 0;
  return function (...args) {
    let now = Date.now();
    if (now - lastTime >= delay) {
      fn.apply(this, args)
      lastTime = now;
    }
  }
}
// 使用定时器来实现
function throttleTimeout(fn, delay) {
  let timer = null;
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        timer = null
      }, delay);
    }
  }
}

function getVariableType (variable) {
  return Object.prototype.toString.call(variable).split(' ').slice(0, -1).toLowerCase();
}

// call
Function.prototype.myCall = (context, ...args) => {
  if (typeof this !== 'function') {
    return new TypeError('this is not function');
  }
  context = context || window;
  context.fn = this;
  const res = context.fn(...args);
  delete context.fn;
  return res
}
// applay
Function.prototype.myApply = (context, args = []) => {
  if (typeof this !== 'function') {
    return new TypeError('this is not function');
  }
  context = context || window;
  context.fn = this;
  const res = context.fn(...args);
  delete context.fn;
  return res
}
// bind
Function.prototype.myBind = (context, ...args) => {
  if (typeof this !== 'function') {
    return new TypeError('this is not function');
  }
  let fn = this;
  return function Fn() {
    // 判断是否作为构造函数了
    return fn.apply(
      // 如果作为构造函数了，则直接用this，否则用context；
      this instanceof Fn ? this : context,
      args.concat(...arguments)
    )
  }
}


function clone(obj) {
  return Object.assign(obj)
}
function deepClone(object) {
  if (object === null || typeof object !== 'object') {
    return object;
  }
  let newObj = Array.isArray(object) ? [] : {}
  for (key in object) {
    if (object.hasOwnProperty(key)) {
      newObj[key] = typeof object[key] === 'object' ? deepClone(object[key]) : object[key] 
    }
  }
  return newObj;
}


