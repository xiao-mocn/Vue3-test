
#### 原型和原型链的理解：
  JS中每一个对象都存在一个__proto__属性，一般称其为对象的原型。它是一个指针，指向该对象的构造函数的原型对象。每一个构造函数都存在一个prototype属性，这个属性是个的对象，也称为原型对象。该对象主要是存储函数一些共有的属性和方法。当我们去访问一个对象的属性或者方法时，会先在对象本身去查找，如果没有找到，就会去__proto__中查找，而__proto__指向构造函数的原型对象，所以会在原型对象中查找，而原型对象也存在__proto__属性，就这样一层一层的往下查找，直到Object的原型对象，Object的原型对象的__proto__指向null，这样就找不到了。这样的链式查找就是原型链。

##### 原型链和继承的关系
  JS中原型链式是继承的基础，当我们创建一个对象时，会默认继承Object的原型对象。

  1. 原型链继承 -- 通过修改原型对象来实现继承
  ```js
  function Parent() {}
  function Child() {}
  parent.prototype.say = function() {
    console.log('hello')
  }
  child.prototype = new Parent() // 直接修改原型对象方式来继承
  let child = new Child()
  child.say() // hello
  ```
  缺点：
  + 引用类型的属性被所有实例共享
  + 在创建子类实例时不能向父类传参


  2. 构造函数继承 -- 子类的构造函数中调用父类的构造函数，绑定父类的属性到子类上
  ```js
  function Parent(name) {
    this.name = name;
    this.colors = ['red', 'blue']
  }
  Parent.prototype.say = function() {
    console.log('hello')
  }
  function Child(name) {
    Parent.call(this, name) // this指向Child实例, 通过call方法将Parent的属性绑定到Child实例上
  }
  let child = new Child('mrbao')
  console.log(child.name) // mrbao
  child.colors.push('green')
  console.log(child.colors) // ['red', 'blue', 'green']
  child.say() // error -- say is not a function, 无法继承父类的原型对象
  let child2 = new Child('mrbao2')
  console.log(child2.colors) // ['red', 'blue'] // 解决了引用类型的属性被所有实例共享的问题
  ```
  缺点：构造函数继承可以继承父类的属性，但是无法继承父类的原型对象

  3. 组合继承 -- 结合原型链继承和构造函数继承
  ```js
  function Parent(name) {
    this.name = name;
    this.colors = ['red', 'blue']
  }
  Parent.prototype.say = function() { console.log( this.name ) }
  function Child(name) {
    Parent.call(this, name) // 构造函数继承
  }
  Child.prototype = new Parent() // 原型链继承
  Child.prototype.constructor = Child // 修正构造函数指向
  let child = new Child('mrbao')
  child.colors.push('green')
  console.log(child.colors) // ['red', 'blue', 'green']
  child.say() // mrbao // 继承了父类的属性和原型对象
  let child2 = new Child('mrbao2')
  console.log(child2.colors) // ['red', 'blue'] // 解决了引用类型的属性被所有实例共享的问题
  ```
  缺点：
  + 父类的构造函数被调用了两次

  4. 寄生组合式继承 -- 通过寄生方式，继承父类的原型对象
  ```js
  function Parent(name) {
    this.name = name;
    this.colors = ['red', 'blue']
  }
  Parent.prototype.say = function() { console.log( this.name ) }
  function Child(name) {
    Parent.call(this, name) // 构造函数继承
  }
  // 核心是通过Object.create()方法来创建原型副本，就不会二次调用父类构造函数，
  Child.prototype = Object.create(Parent.prototype) // 原型链继承
  Child.prototype.constructor = Child // 修正构造函数指向
  let child = new Child('mrbao')
  child.colors.push('green')
  console.log(child.colors) // ['red', 'blue', 'green']
  child.say() // mrbao // 继承了父类的属性和原型对象
  ```
  ##### 原型与类型判断 -- instanceof
  ```js
  function myInstanceof(left, right) {
    let protoType = Object.getPrototypeOf(left)
    while (protoType) {
      if (protoType === right.prototype) return true
      protoType = Object.getPrototypeOf(protoType)
    }
    return false
  }
  ```
  instanceof主要是通过判断构造函数的prototype是否在实例对象的原型链上，如果在则返回true，否则返回false


  ##### New操作符的实现
  + 创建一个新对象
  + 将对象的原型指向构造函数的原型对象
  + 将构造函数的作用域赋给新对象（this指向新对象）
  + 执行构造函数中的代码，如果返回值
  ```js
  function myNew(fn, ...args) {
    // 判断是不是fn是不是函数
    if (typeof fn !== 'function') return Error('fn is not function')
    // 创建一个新对象，并且将对象的原型指向构造函数的原型对象
    let obj = Object.create(fn.prototype)
    // 将this指向新对象，并执行构造函数
    let result = fn.apply(obj, args)
    // 如果构造函数返回的是对象，则返回该对象，否则返回新对象
    return (typeof result === 'object' && result !== null) ? result : obj
  }
  ```

#### 作用域和作用域链 | this | 闭包 |执行上下文
  ##### 作用域和作用域链

  作用域：其实主要就是规定的变量和函数的可访问范围，在js中作用域又分成三种：全局作用域、函数作用域、块级作用域。

  + 全局作用域：通常来说全局作用域就是最外层的作用域，它的变量和函数可以在全局都可以被访问。在浏览器中全局作用域就是window对象。

  + 函数作用域：函数作用域就是函数内部的作用域，函数内部的变量和函数在函数内部都可以被访问，在函数外部是无法访问的。

  + 块级作用域：ES6后存在let const这两个关键字，可以声明块级作用域的变量，块级作用域简单来说就是花括号{}内形成一个局部作用域，变量只有在花括号内部才能访问到。

  作用域链：作用域链是一个链式结构，它主要是因为作用域会存在嵌套和js独特的变量查找关系所形成的，当我们访问一个变量时，会先在当前作用域查找，如果没有找到，就会去上一级作用域查找，直到全局作用域，这种链式查找的关系就是作用域链。

  作用域：其保证了变量的可访问范围，作用域链保证了执行环境有权访问的变量的有序访问。

  ##### 闭包以及其作用

  闭包：主要是指有权访问另一个函数作用域内变量的函数，通俗来说其实就是函数之间的嵌套导致的闭包。

  闭包的作用：
  1. 封装私有变量：闭包可以实现数据的隐藏和封装，模仿其他语言的私有变量特性。
  ```js
  function createId() {
    let id = 0
    return function() {
    return id++
  }
  let getId = createId()
  console.log(getId()) // 0
  console.log(getId()) // 1
  ```
  2. 函数柯里化：函数柯里化是指将多个参数的函数转换成单个参数的函数，这样可以实现参数复用。
  ```js
  function multiply(a, b) {
    return function(b) {
      return a * b
    }
  }
  let multiplyBy2 = multiply(2)
  console.log(multiplyBy2(3)) // 6
  ```
  3. 回调函数与异步编程: 在事件监听、定时器等场景中，闭包保留上下文状态。
  ```js
  function delayLog(message, delay) {
    setTimeout(() => {
      console.log(message); // 闭包保留 message
    }, delay);
  }
  delayLog("Hello after 1s", 1000);
  ```
  4. 防抖节流：在前端开发中，防抖和节流是两个常用的性能优化手段，闭包可以保留函数执行前的状态。
  + 防抖
  ```js
    function debounce(fn, delay) {
      let timer = null
      return function() {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          fn.apply(this, arguments)
        }, delay)
      }
    }
  ```
  + 节流
  ```js
    function throttle(fn, delay) {
      let flag = true
      return function() {
        if (!flag) return
        flag = false
        setTimeout(() => {
          fn.apply(this, arguments)
          flag = true
        }, delay)
      }
    }
  ```

  ##### 执行上下文的理解

  执行上下文：它是代码执行的核心机制。是简单来说就是JS引擎执行代码所创建的抽象环境，首先要去理解执行上下文，我们可以从几个方面去理解它：1. 它的类型 2. 核心组成部分3.生命周期。4. 执行上下文栈。

  ###### 类型：

  1. 全局执行上下文：当JS代码执行时，会首先创建一个全局执行上下文，是唯一的。
  2. 函数执行上下文：当函数被调用时，会创建一个函数执行上下文，可以有多个。
  3. eval执行上下文：eval函数执行时，会创建一个eval执行上下文。通常来说不推荐使用Eval函数。会存在安全，性能等问题。

  ###### 核心组成部分：

  1. 词法环境：词法环境是一个存储变量和函数声明的地方，它主要包含两个部分：环境记录和外部环境引用。环境记录是一个存储变量和函数声明的地方，外部环境引用是指向外部环境的引用。
  2. 变量环境：变量环境是词法环境的子集，主要用来存储变量声明和函数声明。作用：存储 var 声明的变量（在 ES6 之前与词法环境合并）。
    特点：
    + 在全局上下文中，变量环境与词法环境是同一个。
    + 在函数上下文中，变量环境用于 var 声明，词法环境用于 let/const 声明。
  3. 作用域链：作用域链是一个由词法环境组成的链式结构，它主要是用来查找变量和函数的。
  4. this指向：确定当前上下文中的 this 值，可以简单的理解谁调用指向谁。

  ###### 生命周期：

  1. 创建阶段：在创建阶段，先确定this指向，然后会创建词法环境和变量环境。
  2. 执行阶段：在执行阶段，会执行代码，创建变量，函数，执行函数等。
  3. 回收阶段：在执行完毕后，会销毁执行上下文，释放内存。

  ###### 执行上下文栈：

  执行上下文栈是一个后进先出的栈结构，主要用来存储执行上下文，当函数执行时，会创建一个函数执行上下文，

  ###### 扩展

  在聊到执行上下文又会涉及到暂时性死区的概念暂时性死区： let 和 const 声明的变量不会被提升，如果在声明之前访问变量，会抛出 ReferenceError 错误。


  ##### this的指向

  this的指向，可以简单的去理解，大部分情况都是谁调用指向谁。
  其中主要分成几种
  1. 默认绑定：在全局环境中，this指向全局对象，在函数中，this指向全局对象。
  2. 隐式绑定：在对象中调用函数，this指向对象。
  3. 显示绑定：通过call, apply, bind方法，改变this的指向。
  4. new绑定：通过new关键字，创建一个新对象，this指向新对象。
  5. 箭头函数：箭头函数的this指向是定义时的this，而不是调用时的this。


  ###### 显式绑定的call，apply，bind

  call的手写
  ```js
  Function.prototype.myCall = function(context, ...args) {
    // 判断调用对象是否为函数
    if (typeof this !== 'function') {
      throw new TypeError('Error')
    }
    context = context || window
    context.fn = this
    let result = context.fn(...args)
    delete context.fn
    return result
  }
  ```

  apply的手写
  ```js
    Function.prototype.myApply = function(context, args) {
      if (typeof this !== 'function') {
        throw new TypeError('Error')
      }
      context = context || window
      context.fn = this
      // 判断 args 是否为数组，若不是则当作空数组处理
      args = Array.isArray(args) ? args : []
      let result = context.fn(...args)
      delete context.fn
      return result
    }
  ```

  bind的手写
  ```js
    Function.prototype.myBind = function(context) {
      // 判断调用对象是否为函数
      if (typeof this !== "function") {
        throw new TypeError("Error");
      }
      // 获取参数
      var args = [...arguments].slice(1),
        fn = this;
      return function Fn() {
        // 根据调用方式，传入不同绑定值
        return fn.apply(
          this instanceof Fn ? this : context,
          args.concat(...arguments)
        );
      };
    };
  ```
  
#### ES6的相关考点

  1. let和const 和var的区别：
    + let和const是ES6新增的两个关键字，用来声明块级作用域的变量。
    + let声明的变量可以被修改，const声明的变量不能被修改。
    + let和const不存在变量提升，不能重复声明（会形成暂时性死区）。
    + var声明的变量会被提升，可以重复声明，是全局变量。

  2. const定义的变量能改变吗？
  const定义的变量并不是说不能变动，而且变量指向的内存地址不能改变，如果是引用类型的话，也就是保证其指针不变。变量内的属性是可以改变的。

  3. 箭头函数：
    + 箭头函数是一个匿名函数，更简洁的表示。。
    + 箭头函数没有this，只能通过定义时的上下文来决定this的指向，也没办法通过。apply，call， bind来改变指向。
    + 箭头函数没有arguments，可以通过...args来获取参数。
    + 箭头函数没有constructor, 不能作为构造函数。
    + 箭头函数没有prototype

  4. 解构赋值：
    + 数组解构赋值：let [a, b] = [1, 2]
    + 对象解构赋值：let {a, b} = {a: 1, b: 2}
    + 字符串解构赋值：let [a, b, c] = 'abc'

  5. 扩展运算符：扩展运算符对对象实例的拷贝属于浅拷贝。
    + 数组扩展运算符：let arr = [1, 2, 3]; let arr2 = [...arr]
    + 对象扩展运算符：let obj = {a: 1, b: 2}; let obj2 = {...obj}

  6. rest参数：rest参数是一个数组，用来获取函数的剩余参数。

  7. Promise：Promise是ES6新增的异步编程解决方案，主要解决了回调地狱的问题。
    + Promise有三种状态：pending, fulfilled, rejected
    + Promise有两个方法：then, catch

  8. async/await：async/await是ES7新增的异步编程解决方案，基于Promise实现。
    + async用来声明一个异步函数，返回一个Promise对象。
    + await用来等待一个Promise对象，只能在async函数中使用。

  9. class：class是ES6新增的类的语法糖，其实本质还是原型链。
    + class声明类，constructor构造函数，super继承父类。
    + class声明的类不存在变量提升。

  10. 模块化：ES6新增了模块化的语法，主要有export和import两个关键字。
    + export用来导出模块，可以导出多个。
    + import用来导入模块，可以导入多个。

  11. Map和Set：Map和Set是ES6新增的两种数据结构。
    + Map是一种键值对的集合，可以使用任何类型的值作为键。
    + Set是一种值的集合，值不能重复。

  12. Symbol：Symbol是ES6新增的一种基本数据类型，表示独一无二的值。

  13. Proxy：Proxy是ES6新增的一个对象，用来定义基本操作的自定义行为。

  14. Reflect：Reflect是ES6新增的一个对象，用来操作对象。

  15. Generator：Generator是ES6新增的一种迭代器，可以通过yield关键字来暂停和恢复函数的执行。

  16. 数组方法：ES6新增了很多数组方法，如：map, filter, reduce, forEach, some, every, find, findIndex, includes


#### 数据类型相关考点

  ##### 基础数据类型：String，Number，Boolean，Null，Undefined，Symbol，BigInt
  + String：字符串类型，主要用来表示文本。
  + Number：数字类型，主要用来表示数字。
  + Boolean：布尔类型，主要用来表示真假。
  + Null：空类型，主要用来表示空值。
  + Undefined：未定义类型，主要用来表示未定义的值。
  + Symbol：表示独一无二的值，主要用来定义对象的私有属性。
  + BigInt：表示任意精度的整数，主要用来解决大整数计算的问题。数据大小固定，直接按值访问，保存在栈内存中。

  ##### 引用数据类型：Object，Array，Function，Date，RegExp
  + Object：对象是一种无序的数据集合，由键值对组成。
  + Array：数组是一种有序的数据集合，可以通过索引访问。
  + Function：函数是一种可执行的对象，可以通过new关键字来创建对象。
  + Date：日期对象，主要用来操作日期和时间。
  + RegExp：正则表达式对象，主要用来匹配字符串。数据大小不固定，保存在堆内存中，通过引用访问。


  ##### 判断数组的方法
  + Array.isArray()：判断是否为数组
  + instanceof：判断是否为数组
  + Object.prototype.toString.call()：判断是否为数组Object.prototype.toString.call(obj) === '[object Array]'

  ##### null和undefined的区别
  + null：表示空值，是一个表示“无”的对象，转为数值时为0。
  + undefined：表示未定义，是一个表示“无”的原始值，转为数值时为NaN。

  ##### isNaN 和 Number.isNaN 函数的区别？
  + isNaN：判断是否为NaN，会先将参数转换为数字，然后再判断是否为NaN(先转换再判断)。
  + Number.isNaN：判断是否为NaN，不会先将参数转换为数字，直接判断是否为NaN（不进行转换直接判断）。

  #####  == 操作符的强制类型转换规则？
  + 首先会判断两者类型是否相同，相同的话就比较两者的大小；
  + 类型不同的话，就会进行类型转换，转换规则如下：
  + 如果是 null 和 undefined，就相等；
  + 如果是 String 和 Number，就把 String 转换成 Number；
  + 如果是 Boolean，就把 Boolean 转换成 Number；
  + 如果是 Object 和 Number 或者 String，就把 Object 转换成原始类型的值，然后再进行比较。

#### js基础

  ##### New的实现和原理
  + 创建一个新的对象。
  + 将对象的原型指向构造函数的原型对象。
  + 将this指向该对象，并且执行构造函数
  + 判断执行结果，如果结果是对象则返回结果，不然返回新的对象
  ```js
  function myNew(fn, ...args) {
    // 判断是不是fn是不是函数
    if (typeof fn !== 'function') return new Error('fn is not function')
    // 创建一个新对象，并且将对象的原型指向构造函数的原型对象
    let obj = Object.create(fn.prototype)
    // 将this指向新对象，并执行构造函数
    let result = fn.apply(obj, args)
    // 如果构造函数返回的是对象，则返回该对象，否则返回新对象
    return (typeof result === 'object' && result !== null) ? result : obj
  }
  ```

  ##### map和Object的区别
  + key存在差异：map的key是可以任意类型，Object只能是string
  + map的key存在顺序，按插入顺序返回键值。Object是无序的。
  + map可直接迭代，Object是需要手动迭代
  + map存在更多便捷属性，size，has等等
  + map在频繁增删键值对的场景下性能表现更好，而Object并未做出优化。

  ##### map和weakMap的区别

  **map**本质上就是键值对的集合，它的键不限制范围，可以是任意类型，是一种更加完善的Hash结构。

  **WeakMap** 对象也是一组键值对的集合，其中的键是弱引用的。其键必须是对象，原始数据类型不能作为key值，而值可以是任意的。其最主要的一点是：**WeakMap的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。因此，只要所引用的对象的其他引用都被清除，垃圾回收机制就会释放该对象所占用的内存。也就是说，一旦不再需要，WeakMap 里面的键名对象和所对应的键值对会自动消失，不用手动删除引用。**

  ##### 对JSON的理解

  JSON 是一种基于文本的轻量级的数据交换格式。它可以被任何的编程语言读取和作为数据格式来传递。

  在项目开发中，使用 JSON 作为前后端数据交换的方式。在前端通过将一个符合 JSON 格式的数据结构序列化为JSON 字符串，然后将它传递到后端，后端通过 JSON 格式的字符串解析后生成对应的数据结构，以此来实现前后端数据的一个传递。

  在 js 中提供了两个函数来实现 js 数据结构和 JSON 格式的转换处理
  + JSON.stringify 函数，通过传入一个符合 JSON 格式的数据结构，将其转换为一个 JSON 字符串。如果传入的数据结构不符合 JSON 格式，那么在序列化的时候会对这些值进行对应的特殊处理，使其符合规范。在前端向后端发送数据时，可以调用这个函数将数据对象转化为 JSON 格式的字符串。
  + JSON.parse() 函数，这个函数用来将 JSON 格式的字符串转换为一个 js 数据结构，如果传入的字符串不是标准的 JSON 格式的字符串的话，将会抛出错误。当从后端接收到 JSON 格式的字符串时，可以通过这个方法来将其解析为一个 js 数据结构，以此来进行数据的访问。

  ##### JavaScript脚本延迟加载的方式有哪些？

  延迟加载就是等页面加载完成之后再加载 JavaScript 文件。 js 延迟加载有助于提高页面加载速度。通常会有四种方案：
  + **defer属性：**给 js 脚本添加 defer 属性，这个属性会让脚本的加载与文档的解析同步解析，然后在文档解析完成后再执行这个脚本文件，这样的话就能使页面的渲染不被阻塞。多个设置了 defer 属性的脚本按规范来说是顺序执行的，但是在一些浏览器可能会存在异常。
  + **async属性：**给 js 脚本添加 async 属性，这个属性会使脚本异步加载，不会阻塞页面的解析过程，但是当脚本加载完成后立即执行 js 脚本，这个时候如果文档没有解析完成的话同样会阻塞。多个 async 属性的脚本的执行顺序是不可预测的，一般不会按照代码的顺序依次执行。
  + **动态创建 DOM 方式：**动态创建 DOM 标签的方式，可以对文档的加载事件进行监听，当文档加载完成后再动态的创建 script 标签来引入 js 脚本。
  + **让 JS 最后加载：**将 js 脚本放在文档的底部，来使 js 脚本尽可能的在最后来加载执行。

  ##### JavaScript 类数组对象的定义？

  **类数组对象：**一个拥有 length 属性和若干索引属性的对象。类数组对象和数组类似，但是不能调用数组的方法。JS中常见的类数组对象一般有**arguments对象、Dom方法返回值等，一个函数其实也可以称为类数组对象，因为函数也存在length属性，代表可接收多少个参数。

  类数组转换成数组的方法：
  + 通过 call 调用数组的 slice 方法来实现转换
  + 通过 call 调用数组的 splice 方法来实现转换
  + 通过 apply 调用数组的 concat 方法来实现转换
  + 通过 Array.from 方法来实现转换
  ```js
    // slice 方法
    Array.prototype.slice.call(arrayLike);
    // splice
    Array.prototype.splice.call(arrayLike);
    // concat
    Array.prototype.concat.apply([], arrayLike);
    // Array.from
    Array.from(arrayLike);
  ```

  ##### 数组有哪些原生方法？

  + 数组和字符串的转换：toString()、toLocalString()、join()
  + 数组尾部操作的方法： pop() 和 push()
  + 数组首部操作的方法： unshift()、shift()
  + 重排序的方法：sort()、reverse()
  + 数组连接的方法 concat() ，返回的是拼接好的数组，不影响原数组。
  + 数组截取办法 slice()，用于截取数组中的一部分返回，不影响原数组。
  + 数组插入方法 splice()
  + 查找特定项的索引的方法: indexOf() 和 lastIndexOf()
  + 迭代方法: every()、some()、filter()、map() 和 forEach()
  + 数组归并方法 reduce() 和 reduceRight() 方法

  ##### 什么是 DOM 和 BOM？

  **Dom：**指的是文档对象模型，它指的是把文档当做一个对象，这个对象主要定义了处理网页内容的方法和接口。
  **Bom：**指的是浏览器对象模型，它指的是把浏览器当做一个对象来对待，这个对象主要定义了与浏览器进行交互的法和接口。BOM的核心是 window，而 window 对象具有双重角色，它既是通过 js 访问浏览器窗口的一个接口，又是一个 Global（全局）对象。

  ##### 对AJAX的理解，实现一个AJAX请求？

  **AJAX：**指的是通过 JavaScript 的 异步通信，从服务器获取 XML 文档，从中提取数据，再更新当前网页的对应部分，而不用刷新整个网页。

  **AJAX的实现：**
  + 创建一个 **XMLHttpRequest** 对象。
  + 在这个对象上使用 open 方法创建一个 HTTP 请求，open 方法所需要的参数是请求的方法、请求的地址、是否异步和用户的认证信息。
  + 在发起请求前，可以为这个对象添加一些信息和监听函数。比如说可以通过 setRequestHeader 方法来为请求添加头信息。还可以为这个对象添加一个状态监听函数。一个 XMLHttpRequest 对象一共有 5 个状态，当它的状态变化时会触发onreadystatechange 事件，可以通过设置监听函数，来处理请求成功后的结果。当对象的 readyState 变为 4 的时候，代表服务器返回的数据接收完成，这个时候可以通过判断请求的状态，如果状态是 2xx 或者 304 的话则代表返回正常。这个时候就可以通过 response 中的数据来对页面进行更新了。
  + 当对象的属性和监听函数设置完成后，最后调用 sent 方法来向服务器发起请求，可以传入参数作为发送的数据体。

  ```js
    function getJSON(url) {
      return new Promise((resolve, reject) => {
        // 创建 XMLHttpRequest t对象
        let xml = new XMLHttpRequest();
        // 创建一个HTTP请求
        xml.opent('GET', url, true)
        // 设置监听对象
        xml.onreadystatechange = function() {
          if (this.readyState !== 4) return
          if (this.status === 200) {
            resolve(this.response)
          } else {
            reject(new Error(this.statusText))
          }
        }
        xml.onerror = function() {
          reject(new Error(this.statusText))
        }
        // 设置响应的数据类型
        xhr.responseType = "json";
        // 设置请求头信息
        xhr.setRequestHeader("Accept", "application/json");
        // 发送 http 请求
        xhr.send(null);
      })
    }
  ```

  ##### JavaScript为什么要进行变量提升，它导致了什么问题？

  说到变量提升，其实就是变量和函数的声明会被提升到作用域的顶部，变量和函数可以在声明前被访问，但访问的值为undefined。
  **原理：**变量提升的主要原因是js引擎在执行代码之前，都会有一个解析的过程。在解析阶段，JS会检查语法，并对函数进行预编译。解析的时候会先创建一个全局执行上下文环境，先把代码中即将执行的变量、函数声明都拿出来，变量先赋值为undefined。

  **优点：**
  + 提高性能：在JS代码执行之前，会进行语法检查和预编译，并且这一操作只进行一次。在预编译时，会统计声明了哪些变量、创建了哪些函数，并对函数的代码进行压缩，去除注释、不必要的空白等。这样做的好处就是每次执行函数时都可以直接为该函数分配栈空间（不需要再解析一遍去获取代码中声明了哪些变量，创建了哪些函数），并且因为代码压缩的原因，代码执行也更快了。总的来说：解析和预编译过程中的声明提升可以提高性能，让函数可以在执行时预先为变量分配栈空间
  + 提高容错率：声明提升还可以提高JS代码的容错性，使一些不规范的代码也可以正常执行


  ##### forEach和map方法有什么区别

  + forEach()方法会针对每一个元素执行提供的函数，对数据的操作会改变原数组，该方法没有返回值；
  + map()方法不会改变原数组的值，返回一个新数组，新数组中的值为原数组调用函数处理之后的值；


  ##### for...in 和 for...of 的区别

  + for...in 主要适用于遍历普通对象，for...of 适用于数组、类数组对象等可迭代的对象
  + for...in 一般遍历的是key值，而for...of 遍历的事value值
  + for...in 遍历会整个原型链上的属性（一般不推荐使用，性能差），for...of 只会遍历当前对象

  ##### 聊一聊JS中的模块化

  1. CommonJS（CJS）

  **特点：**
    + 同步加载：适用于服务器（如 Node.js），模块在运行时加载。
    + 值拷贝：导出的是值的拷贝，修改导出值不影响原始模块。
    + 缓存机制：模块首次加载后缓存，后续 require() 直接读取缓存。

  ```js
    // 导出
    module.exports = { add: (a, b) => a + b };
    // 或简写
    exports.sub = (a, b) => a - b;

    // 导入
    const math = require('./math');
    math.add(2, 3); // 5
  ```

  2. AMD（Asynchronous Module Definition）

  **特点：**
  + 异步加载：浏览器环境下通过 define 和 require 动态加载。
  + 依赖前置：声明依赖时立即加载所有模块。

  ```js
    // 定义模块
    define(['dependency'], function(dep) {
      return { method: () => dep.action() };
    });

    // 使用模块
    require(['module'], function(mod) {
      mod.method();
    });
  ```
  
  3. ES Modules（ESM）

  **特点：**
    + 静态分析：依赖关系在编译时确定，支持 Tree Shaking。
    + 实时绑定：导出的是值的引用，模块内修改会同步到所有导入方。
    + 浏览器原生支持：通过 ```<script type="module"> ```直接使用。

  ```js
    // 导出
    export const add = (a, b) => a + b;
    export default function multiply(a, b) { return a * b; }

    // 导入
    import { add }, mul from './math.js';
    import * as math from './math.js';
  ```


#### 异步编程

  ##### 对Promise的理解

  Promise是异步编程的一种解决方案，它是一个构造函数，接收一个函数作为参数，返回一个 Promise 实例。他的出现大大改善了异步编程的困境，避免了地狱回调。一个 Promise 实例有三种状态，分别是pending、resolved 和 rejected，分别代表了进行中、已成功和已失败。实例的状态只能由 pending 转变 resolved 或者rejected 状态，并且状态一经改变，就凝固了，无法再被改变了。

  其中状态的改变是通过 resolve() 和 reject() 函数来实现的，可以在异步操作结束后调用这两个函数改变 Promise 实例的状态，它的原型上定义了一个 then 方法，使用这个 then 方法可以为两个状态的改变注册回调函数。这个回调函数属于微任务，会在本轮事件循环的末尾执行。

  **需要注意的是：** 在构造 Promise 的时候，构造函数内部的代码是立即执行的，then后的回调函数才是异步任务。

  ##### Promise的基本用法
  **常规的做法**
  + 构造函数--> new Promise --> 内部代码执行后需要根据其执行结果进行resolve或者reject
  + 后续通过 then --> 接收resolve出来的数据进行异步操作
  + 或者通过 catch --> 进行错误的获取
  + 或者是通过 finally --> 不过成功还是失败 --> 进行最后的回调

  **其他用法：**
  + ```Promise.all([promise1,promise2,promise3])```，all方法可以完成并行任务， 它接收一个数组，数组的每一项都是一个promise对象。当数组中所有的promise的状态都达到resolved的时候，all方法的状态就会变成resolved，如果有一个状态变成了rejected，那么all方法的状态就会变成rejected。

  + Promise.race()方法和all一样，接受的参数是一个每项都是promise的数组，但是与all不同的是，当最先执行完的事件执行完之后，就直接返回该promise对象的值。如果第一个promise对象状态变成resolved，那自身的状态变成了resolved；反之第一个promise变成rejected，那自身状态就会变成rejected


  ##### 对 async / await 的理解

  ```async/await``` 其实是 **Generator** 的语法糖，它是为优化then链而开发出来的。从字面上来看，async 是“异步”的简写，await则为等待，所以很好理解 async 用于申明一个 function 是异步的，并且返回了一个Promise对象，函数内如果有return值，则相当于```Promise.resolve(...)```，而 await 用于等待一个异步方法或者说一个表达式执行完成，await 规定只能在 async 函数内执行。

  总的来说，```async/await```最终都是返回一个Promise对象，所以其用法跟Promise有点像，但是优化了then的链式调用，让其代码看起来更加整洁和易懂。

  ##### 异步编程的实现方式？

  + 回调函数 的方式，使用回调函数的方式有一个缺点是，多个回调函数嵌套的时候会造成回调函数地狱，上下两层的回调函数间的代码耦合度太高，不利于代码的可维护。

  + Promise 的方式，使用 Promise 的方式可以将嵌套的回调函数作为链式调用。但是使用这种方法，有时会造成多个 then 的链式调用，可能会造成代码的语义不够明确。

  + generator 的方式，它可以在函数的执行过程中，将函数的执行权转移出去，在函数外部还可以将执行权转移回来。当遇到异步函数执行的时候，将函数执行权转移出去，当异步函数执行完毕时再将执行权给转移回来。因此在 generator 内部对于异步操作的方式，可以以同步的顺序来书写。使用这种方式需要考虑的问题是何时将函数的控制权转移回来，因此需要有一个自动执行 generator 的机制，比如说 co 模块等方式来实现 generator 的自动执行。

  + async 函数 的方式，async 函数是 generator 和 promise 实现的一个自动执行的语法糖，它内部自带执行器，当函数内部执行到一个 await 语句的时候，如果语句返回一个 promise 对象，那么函数将会等待 promise 对象的状态变为 resolve 后再继续向下执行。因此可以将异步逻辑，转化为同步的顺序来书写，并且这个函数可以自动执行。

  ##### setTimeout、Promise、Async/Await 的区别

  可以从执行顺序来说明 --> 就是谈宏任务和微任务 --> 以及谈谈各自的特点，

  setTimeout --> 存在delay --> delay完成后才会扔到宏任务队列中，不阻塞后续代码执行

  Promise --> 是一个异步任务解决方案 --> 是一个构造函数，函数内会被立即执行，then和catch是后续的异步任务，是微任务，--> 也不会阻塞主线任务代码执行

  Async/Await --> 也是一种异步解决方案,优化then的链式调用 --> 跟Promise有点像，存在Await关键字，时，会阻塞async内Await后的代码，并且跳出Async函数，继续执行其他同步代码。但需要注意的事：**Await的代码是会被立即执行的，Await后的代码才会被阻塞**
  ```js
  async function async1(){
   console.log('async1 start');
   // async2 是会被立即执行的，而 console.log('async1 end') 被当成异步任务，后续才会执行
    await async2();
    console.log('async1 end')
  }
  async function async2(){
      console.log('async2')
  }
  console.log('script start');
  async1();
  console.log('script end')
  // 输出顺序：script start->async1 start->async2->script end->async1 end
  ```


#### ESM 模块与 commonjs 模块方案有什么异同？

+ 语法：
  + CommonJS 使用 require(<module-path>) 导入模块，并使用 module.exports 导出模块
  + ES Module 使用 import 导入模块，并使用 export 导出模块
+ 加载机制
  + CommonJS的加载机制是同步的，即：在加载和解析模块时，JavaScript 会停止代码的执行直到文件被加载完成。这对于服务器端的 Node.js 应用来说是可以接受的，因为文件都存储在本地硬盘，读取速度快。然而，对于运行在浏览器的代码，这将导致执行阻塞，降低性能。
  + ESM 的加载机制是异步的，模块的导入、解析和执行是在解析阶段就已经完成的。这意味着浏览器可以并行请求多个模块，然后在所有模块都加载完毕后，再一起执行。这种方式非常适合浏览器环境，因为这样就不用因等待文件加载而阻塞代码执行，从而提高性能。
+ 顶层作用域以及运行环境：
  + CommonJS在每个模块的顶层作用域中，有许多预定义的变量，如 __filename, __dirname, 和 NODE_PATH。而 ESM 没有这些变量。
  + CommonJS 是 Node.js 所有版本都支持的模块系统，而 ESM 需要 Node.js v12 或更高版本，并且在浏览器中也有支持。
  + 在 CommonJS 模块中，this 指向当前模块的 exports 对象；但是在 ESM 中，this 是 undefined。
+ 文件扩展名:
  + Node.js 默认将.js和.ts当作CommonJS模块处理。
  + CommonJS 使用 .cjs 扩展名编写 JavaScript，并使用 .cts 扩展名编写 TypeScript。
  + ESM 使用 .mjs 扩展名编写 JavaScript，并使用 .mts 扩展名编写 TypeScript。
+ tree-shaking 支持
  + CJS 不支持 tree-shaking：因为 cjs 需要运行起来之后，才知道有哪些依赖；
  + ESM (ES Module) 可以支持 Tree Shaking，主要原因在于其静态的结构。在 ES Module 中，导入（import）和导出（export）语句在编译阶段就确定下来了，也就是说模块之间的依赖关系在这一阶段就已经明确了。这种特性使得构建工具如 Webpack 或 Rollup 可以轻松地在编译阶段检测出哪些代码被使用，哪些未被使用，从而实现所谓的 "dead code elimination"，删除未被使用的代码。

  综上，ESM 方案在多数时候表现更好，性能更佳，安全性、稳定性更强，体现在：
  
  1. 静态分析和优化：由于 ESM 的 import 和 export 声明均在编译阶段（而非执行阶段）解析，因此更适合于静态分析。例如，这使得诸如 Tree Shaking（在打包过程中删除未使用的代码）这样的优化变得可能。
  2. 实时绑定：ESM 支持实时绑定：当导出项发生变化时，所有导入相应模块的地方都能获取到最新的值，这能确保模块值“唯一真实”，确保不会被错误更改；
  3. 更好的安全性：在 ESM 中，导出的变量是只读的，外部不能修改。这意味着一旦模块的输出被导入，就不能被改变(除非原始模块中发生了变更)，有助于保护模块内部的逻辑不被外部修改。
  5. 更好的兼容性：由于 ESM 是 ECMAScript 标准的一部分，因此在最新的浏览器和 Node.js 环境中都能得到良好支持。
  6. 更有利于重构：基于 ESM 的静态特性，我们完全可以通过代码静态分析方式找到模块导入导出的具体使用情况，在下次重构时(例如文件重命名、导出结构变化)更容易找到所有关联改动点，做出变更。

#### symbol 是什么？可用于做什么？

```Symbol``` 是 ES6 引入的一种新的基础数据类型，```Symbol``` 的特点在于它是唯一的，即使我们创建了两个具有相同描述的 ```Symbol```，他们也是不同的，因此，```Symbol``` 的主要作用就是生成一个唯一的标识符。

```js
let symbol1 = Symbol();
let symbol2 = Symbol('symbol');

console.log(typeof symbol1); // "symbol"
console.log(symbol1 === symbol2); // false，即使描述符相同，生成的Symbol还是唯一的
```

**Symbol 与元编程:**

元编程就是程序能够对其自身进行操作的一种策略，ES6 引入了一些内置的 ```Symbol``` 值，用于实现元编程的。比如这里的 ```Symbol.iterator```，这是一个特殊的 ```Symbol```，被用于定义产生一个对象默认遍历器的接口

```js
let obj = {
  [Symbol.iterator]: function* () {
    yield 1;
    yield 2;
    yield 3;
  }
}

for (let value of obj) {
  console.log(value); // 分别输出 1, 2, 3
}
```


#### 数据类型检测的方式有哪些？

+ ```typeof``` 数组、对象、null都会被判断为object，其他判断都正确。

  ```js
  console.log(typeof 2);               // number
  console.log(typeof true);            // boolean
  console.log(typeof 'str');           // string
  console.log(typeof []);              // object    
  console.log(typeof function(){});    // function
  console.log(typeof {});              // object
  console.log(typeof undefined);       // undefined
  console.log(typeof null);            // object
  ```

+ ```instanceof``` 可以正确判断对象的类型，其内部运行机制是判断在其原型链中能否找到该类型的原型。

  ```js
  console.log(2 instanceof Number);                    // false
  console.log(true instanceof Boolean);                // false 
  console.log('str' instanceof String);                // false 
  
  console.log([] instanceof Array);                    // true
  console.log(function(){} instanceof Function);       // true
  console.log({} instanceof Object);                   // true
  ```

+ ```constructor``` 有两个作用，一是判断数据的类型，二是对象实例通过 constrcutor 对象访问它的构造函数。需要注意，如果创建一个对象来改变它的原型， ```constructor``` 就不能用来判断数据类型了

  ```js
  console.log((2).constructor === Number); // true
  console.log((true).constructor === Boolean); // true
  console.log(('str').constructor === String); // true
  console.log(([]).constructor === Array); // true
  console.log((function() {}).constructor === Function); // true
  console.log(({}).constructor === Object); // true
  ```

+ ```Object.prototype.toString.call()``` 使用 Object 对象的原型方法 toString 来判断数据类型

  ```js
  var a = Object.prototype.toString;
  console.log(a.call(2)); // [object Number]
  console.log(a.call(true)); // [object Boolean]
  console.log(a.call('str')); // [object String]
  console.log(a.call([])); // [object Array]
  console.log(a.call(function(){})); // [object Function]
  console.log(a.call({})); // [object Object]
  console.log(a.call(undefined)); // [object Undefined]
  console.log(a.call(null)); // [object Null]

  ```

#### JS 中的 Proxy 与 Reflect 分别是什么？两者有什么关系?

























