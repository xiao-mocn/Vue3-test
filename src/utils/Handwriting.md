#### 防抖（Debounce）

**核心思想：事件触发后延迟执行函数，若在延迟时间内再次触发，则重新计时**。
**应用场景：搜索框输入联想、窗口大小调整（resize）、表单验证等。**

**基础版：**
```js
function debounce(fnc, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer); // 清除之前的定时器
    timer = setTimeout(() => {
      func.apply(this, args); // 延迟执行
    }, delay);
  }
}
// 使用示例
const handleInput = debounce((text) => {
  console.log("搜索:", text);
}, 500);

input.addEventListener("input", (e) => handleInput(e.target.value));
```

**进阶：立即执行版本**

```js
function debounce(fn, delay, immediate = false) {
  let timer = null;
  return function(...args) {
    const callNow = immediate && !timer;
    timer = setTimeout(() => {
      if (!immediate) fn.apply(this, args);
      timer = null;
    }, delay)
    if (callNow) fn.apply(this, args);
  }
}
```

#### 节流（Throttle）

**核心思想：在固定时间间隔内只执行一次函数，稀释执行频率。**
**应用场景：滚动事件（scroll）、鼠标移动（mousemove）、射击游戏开枪冷却。**

**时间戳实现:**
```js
// 时间戳实现
function throttle(fn, interval) {
  let lastTime = 0;
  return function(...args) {
    let now = Date.now();
    if (now - lastTime >= interval) {
      fn.apply(this, args);
      lastTime = now
    }
  }
}

// 使用示例
const handleScroll = throttle(() => {
  console.log("滚动处理");
}, 1000);

window.addEventListener("scroll", handleScroll);
```

**定时器实现：**
```js
function throttle(func, interval) {
  let timer = null;
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, interval);
    }
  };
}
```

**结合版（首尾均执行）**
```js
function throttle(func, interval) {
  let lastTime = 0;   // 记录上一次执行的时间戳
  let timer = null;   // 存储定时器引用
  
  return function(...args) {
    const now = Date.now();  // 当前时间戳
    // 计算距离下一次执行还需等待的时间
    const remaining = interval - (now - lastTime);
    
    // 情况1：如果等待时间已过，可以立即执行
    if (remaining <= 0) {
      // 清除可能存在的定时器（避免重复执行）
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      // 执行目标函数
      func.apply(this, args);
      // 更新最后执行时间
      lastTime = now;
    } 
    // 情况2：如果还在等待期内且没有设置定时器
    else if (!timer) {
      // 设置一个定时器，在等待时间结束后执行
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;  // 清除定时器引用
        lastTime = Date.now();  // 更新最后执行时间
      }, remaining);
    }
  };
}
```

#### cll的手写

```js
Function.prototype.newCall = function(context, ...args) {
  if (typeof this !== 'function') throw new TypeError('this is not function');
  context = context || window;
  context.fn = this;
  let result = context.fn(...args);
  delete context.fn;
  return result;
}
```

#### apply的手写

```js
Function.prototype.newApply = function(context, argsArray = []) {
  if (typeof this !== 'function') throw new TypeError('this is not function');
  context = context || window;
  context.fn = this;
  const result = context.fn(...argsArray)
  delete context.fn;
  return result;
}
```

#### bind的手写

```js
Function.prototype.newBind = function(context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  // 获取参数
  let args = [...arguments].slice(1);
  let fn = this;
  return function Fn() {
    // 根据调用方式，传入不同绑定值
    return fn.apply(
      this instanceof Fn ? this : context,
      args.concat(...arguments)
    );
  };
}
```

#### 

