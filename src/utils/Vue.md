#### Vue

  ##### 谈谈你对vue的理解

  Vue是一个渐进式JavaScript框架，它专注于构建用户界面。Vue的核心思想是数据驱动和组件化。通过将页面拆分成独立的组件，可以更好地管理代码，提高代码的复用性和可维护性。

  Vue的优势在于其简单易用、灵活性高、性能卓越和扩展性强。Vue的模板语法易于理解和学习，可以快速构建交互式的Web应用程序。同时，Vue的生命周期钩子和自定义指令等功能，使得Vue可以满足各种复杂的需求。另外，Vue还提供了Vuex、Vue Router等官方插件，可以进一步扩展Vue的功能。

  Vue的响应式数据绑定机制是Vue最核心的特性之一。通过对数据进行劫持和监听，可以实现数据的双向绑定，即数据变化会自动更新视图，同时视图的变化也会反映到数据上。这种机制使得Vue的数据流非常清晰和可预测，同时也减少了开发的工作量。

  总之，我认为Vue是一个优秀的JavaScript框架，它简单易用、功能强大、扩展性好，并且有着极佳的性能表现。对于前端开发人员来说，Vue是一个值得深入学习和使用的框架。

  ##### Vue的 nextTick 的原理

  nextTick的用法：在某些情况下，我们需要在 DOM 更新完成后执行一些操作，这时就需要使用 Vue.nextTick() 方法。

  Vue.nextTick() 方法的实现原理是基于浏览器的异步任务队列，采用微任务优先的方式。Vue.js 采用异步更新机制来提高渲染效率，当我们修改数据时，Vue.js 不会立即更新 DOM，而是将 DOM 更新操作放到一个异步队列中，等到下一次事件循环时再执行。这样做可以避免频繁的 DOM 操作，提高性能。而 Vue.nextTick() 方法则是将一个回调函数推入到异步任务队列中，等待 DOM 更新完成后执行。具体实现方式有以下几种：
  + 使用原生的 setTimeout 方法：在 Vue.js 2.x 中，如果浏览器支持 Promise，则会优先使用 Promise.then() 方法。如果不支持 Promise，则会使用原生的 setTimeout 方法模拟异步操作。
  + 使用 MutationObserver：如果浏览器支持 MutationObserver，Vue.js 会使用 MutationObserver 监听 DOM 更新，并在 DOM 更新完成后执行回调函数。
  + 使用 setImmediate：在 IE 中，setImmediate 方法可以用来延迟异步执行任务。在 Vue.js 2.x 中，如果浏览器支持 setImmediate，则会优先使用 setImmediate，否则会使用 setTimeout。

  **最后收敛：**
  总之，Vue.nextTick() 的实现原理是利用浏览器的异步任务队列，在 DOM 更新完成后执行回调函数。不同浏览器支持的异步任务方法不同，Vue.js 会根据浏览器的支持情况选择合适的异步任务方法。

  ##### vue 在渲染列表的时候，为什么不建议用数组的下标当做列表的key值

  主要是要**保证渲染列表的性能和正确性。**

  在Vue渲染列表时，每个元素需要一个唯一的key值来标识自己，这个key值后续在更新中会被用来判断列表中哪些元素需要更新、删除或新增。如果使用数组的下标作为key值，虽然可以满足每个元素key值唯一的需求，但是由于Vue的更新机制是基于diff算法实现的，如果将数组下标作为key值，那么当列表发生变化时，可能会导致key值发生改变，从而引发不必要的组件重新渲染，甚至会导致性能问题。例如，当删除列表中某个元素时，其后面的所有元素的下标都会发生改变，导致Vue重新渲染整个列表。为了避免这个问题，我们需要为每个元素提供一个稳定的、与其内容相关的唯一key值，例如使用元素的id属性作为key值。这样，当列表中某个元素的内容发生变化时，其对应的key值也会发生改变，从而告诉Vue需要更新该元素。

  ##### 谈一下对vuex的理解

  Vuex是一个专门为Vue.js开发的状态管理库，它提供了一个集中式的状态管理机制，用于管理Vue应用中的所有组件的共享状态。

  Vuex的核心概念包括：state、mutations、actions和getters。其中，state是应用的状态，而mutations用于修改state中的状态。actions则用于处理异步操作或批量的同步操作，最终通过mutations来改变state。getters则用于对state中的数据进行计算或过滤。在Vuex中，数据流的流向是单向的，即从state到组件，再从组件到mutations/actions。这种单向数据流的机制使得数据的流动更加清晰，同时也更容易进行调试和维护。

  总之，Vuex是Vue.js生态中的一个非常重要的插件，适用于中大型的Vue.js应用，它通过提供集中式的状态管理机制，帮助我们更好地管理数据流，提高应用的可维护性和可扩展性。

  ##### vue-router有哪几种导航钩子

  Vue Router 提供了多种导航钩子（导航守卫），用于在路由导航过程中进行控制和处理。

  ###### 全局导航钩子
  + **```beforeEach```:** 在导航触发时，全局前置守卫。常用于权限验证、登录检查等。
  ```js
  router.beforeEach((to, from, next) => {
    // 必须调用 next() 继续导航
  });
  ```

  + **```beforeResolve```:** 在导航被确认前，所有组件内守卫和异步路由组件解析后调用。适合处理需要确保数据就绪的场景。
  ```js
  router.beforeResolve((to, from, next) => {
    next();
  });
  ```

  + **```afterEach```:** 在每次路由跳转之后执行，可以用来进行路由跳转后的操作，比如页面滚动、统计PV等操作。
  ```js
  router.afterEach((to, from) => {}); // 无next()参数
  ```

  ###### 路由独享钩子
  + **```beforeEnter```**
  在路由配置中定义，仅对当前路由生效。优先级高于全局 beforeEach。
  ```js
  const routes = [
    {
      path: '/user',
      component: User,
      beforeEnter: (to, from, next) => {
        next();
      }
    }
  ];
  ```
  
  ###### 组件内导航钩子
  + **```beforeRouteEnter```:** 在进入路由之前执行，与全局beforeEach的区别是它可以针对某个具体路由进行设置。
  ```js
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 通过 vm 访问组件实例
    });
  }
  ```

  + **```beforeRouteUpdate```:** 在路由更新时执行，比如路由参数发生变化时，可用于获取当前路径，匹配激活菜单。
  ```js
  beforeRouteUpdate(to, from, next) {
    this.data = fetchData(to.params.id); // 可访问 this
    next();
  }
  ```

  + **```beforeRouteLeave```:** 在离开当前路由时执行，可以用来进行页面数据的保存或弹出提示等操作。
  ```js
  beforeRouteLeave(to, from, next) {
    if (this.hasUnsavedChanges) { // 可访问this
      if (confirm('确定离开？')) next();
      else next(false);
    } else next();
  }
  ```

  ##### Vue-Router的原理

  Vue Router是Vue.js官方提供的一款路由管理器，它通过监听URL变化，匹配路由规则，展示对应的组件内容，从而实现单页应用的路由控制。

  Vue Router的核心原理包括以下几个方面（这玩意记不住就先说下面的总结收敛的，然后再回忆，相对低频）：
  + 路由匹配：Vue Router通过定义路由规则来匹配URL路径，并根据匹配结果展示对应的组件内容。路由规则可以使用路径、参数、查询参数等多种方式进行定义，同时支持嵌套路由和命名路由等高级特性。

  + 路由模式：Vue Router支持两种路由模式，分别是Hash模式和History模式。在Hash模式下，路由信息会被保存在URL的Hash部分，通过监听Hash变化来进行路由控制；在History模式下，路由信息会被保存在浏览器的History API中，通过修改浏览器历史记录来进行路由控制。

  + 路由导航：Vue Router中的导航钩子可以监听路由变化，进行路由拦截、身份验证等操作。导航钩子包括全局导航钩子和组件内导航钩子，可以在路由跳转前、跳转后、路由更新等不同阶段执行相应的逻辑。

  + 路由组件：Vue Router通过组件的动态加载来实现异步路由组件，可以根据需要动态加载路由组件，从而提高应用的性能和用户体验。同时，Vue Router还支持路由懒加载、路由元信息等高级特性，可以进一步提高应用的灵活性和可维护性。

  总的来说：Vue-Router通过路由匹配、路由模式、路由导航、路由组件等多个方面实现了完整的路由控制逻辑，为开发者提供了强大的路由控制能力

  ##### Vue Router history 模式为什么刷新出现404

  history模式，它利用了HTML5的 History API，比如pushState和replaceState。这些方法可以改变URL的路径部分而不会重新加载页面。比如```http://example.com/about```。但是当用户直接访问这个URL时，服务器需要返回正确的页面，否则会出现404错误。所以history模式需要服务器支持，把所有路由都指向同一个index.html。前端的话，当用户点击前进或后退按钮，会触发popstate事件，这时候Vue Router会根据当前路径加载对应的组件。如果是通过pushState导航的话，就需要手动处理路由的变化。

  ##### mounted生命周期和keep-alive中activated的优先级

  在 Vue 中，mounted 生命周期是指一个组件被挂载到 DOM 中后触发的钩子函数。而 keep-alive 是一个用来缓存组件的抽象组件，它自身没有任何展示效果，只是将内部包含的组件缓存起来，从而能够在需要时快速地切换到缓存的组件。

  当一个组件第一次被挂载时，mounted 生命周期会被触发，同时 keep-alive 中的缓存组件还没有被渲染，因此 activated 生命周期并不会被触发。只有当一个被缓存的组件被激活后（比如从其他页面返回到该组件所在的页面），activated 生命周期才会被触发。因此，优先级上 mounted 生命周期高于 activated 生命周期。

  ##### vue父子组件钩子的执行顺序是什么？

  在 Vue 中，父子组件之间的生命周期钩子执行顺序如下：
  1. 加载阶段

  2. 父组件 beforeCreate 钩子
  3. 父组件 created 钩子
  4. 父组件 beforeMount 钩子
  5. 子组件 beforeCreate 钩子
  6. 子组件 created 钩子
  7. 子组件 beforeMount 钩子
  8. 子组件 mounted 钩子
  9. 父组件 mounted 钩子

  10. 更新阶段
  11. 父组件 beforeUpdate 钩子
  12. 子组件 beforeUpdate 钩子
  13. 子组件 updated 钩子
  14. 父组件 updated 钩子

  15. 销毁阶段
  16. 父组件 beforeDestroy 钩子
  17. 子组件 beforeDestroy 钩子
  18. 子组件 destroyed 钩子
  19. 父组件 destroyed 钩子

  在这个过程中，子组件的生命周期钩子的执行顺序总是在父组件的生命周期钩子之后。在 keep-alive 组件中，由于缓存组件会被 keep-alive 管理，因此在组件被激活或停用时，执行的生命周期钩子会发生变化：

  1. 激活（activated）缓存中的组件时：
  2. 父组件 activated 钩子
  3. 子组件 activated 钩子
  4. 停用（deactivated）缓存中的组件时：
  5. 父组件 deactivated 钩子
  6. 子组件 deactivated 钩子
  
  ##### vue 父子组件传值有哪些方式

  Vue父子组件之间传递数据的方式有以下几种：

  **Props：** 通过向子组件传递属性的方式实现数据传递。在父组件中通过v-bind绑定子组件的属性，子组件中通过props接收父组件传递的数据。这是一种单向数据流的方式，父组件可以向子组件传递数据，但是子组件不能直接修改传递过来的数据，需要通过触发事件的方式通知父组件进行修改。

  **事件：** 父组件通过$emit方法触发子组件的自定义事件，子组件中通过$on监听事件并接收参数，从而实现数据的传递。这也是一种单向数据流的方式，父组件通过事件向子组件传递数据，子组件可以通过触发事件的方式通知父组件进行修改。

  **$parent/$children：** 通过访问父组件或子组件的实例属性来实现数据的传递。但是这种方式不够直观，且容易出现问题，因为父组件或子组件的实例属性可能会在不同的组件结构中发生变化。

  **$refs：** 通过在父组件中使用ref属性来获取子组件的实例，从而可以直接访问子组件的属性和方法。这种方式也不够直观，且容易出现问题，因为在组件结构复杂的情况下，$refs可能会变得混乱。

  其中，Props是最常用的一种方式，因为它不仅可以实现数据的传递，还可以进行数据类型检查和默认值设置，使得数据的传递更加稳定和安全。

  ##### 用vue-router hash模式实现锚点？

  ##### Vue 中 v-if 和 v-for 能否同时使用？

  首先，这两者可以同时使用，但是在不同版本中会有不同的反应：

  Vue2版本中，因为```v-for```的优先级大于```v-if```,程序并不会报错，但是可能会出现性能问题。例如：两者一起使用的情况下，渲染函数中可以看出会先执行循环再判断条件，哪怕我们只渲染列表中一小部分元素，也得在每次重渲染的时候遍历整个列表，会严重浪费性能。通常官方不建议同时使用，或者是通过 **外层包裹** 或者**计算属性filter后再进行渲染**

  Vue3版本中，则```v-if```的优先级大于```v-for```,这就导致，如果 v-if 如果依赖某个列表中的元素的某个属性，而 v-if 判断的变量还不存在，就会导致报错。解决方案跟Vue2大致一样。

  ##### Vue 中 v-if 和 v-show 有什么不一样？

  v-if 和 v-show 在Vue中都是条件渲染，本质上都是为了控制元素是否显示在页面上。

  两者之间的区别：

  + 控制手段不同：
    + v-show 隐藏是为该元素添加 css--display:none，dom元素依旧还在；
    + v-if 显示隐藏是将 dom 元素整个添加或删除；

  + 编译过程不同：
    + v-show 只是简单的基于 CSS 切换；
    + v-if 切换有一个局部卸载的过程，切换过程中合适地销毁和重建内部的事件监听和子组件；

  + 编译条件不同：
    + v-if 是真正的条件渲染，它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。渲染条件为假时，并不做操作，直到为真才渲染。
    + v-show 由 false 变为 true 的时候不会触发组件的生命周期

  + 用法上的区别：
    + v-if 相比 v-show 开销更大的（直接操作dom节点增加与删除）
    + 如果需要非常频繁地切换，则使用 v-show 较好
    + 如果在运行时条件很少改变，则使用 v-if 较好
  
  ##### Vue 生命周期详解
  
  [![image.png](https://i.postimg.cc/9FWSm3Z5/image.png)](https://postimg.cc/rzPgjPfQ)

  **需要注意的点是：** 

  + 选项式和组合式两者用法上不一样，组合式API需要引入，再进行使用。

  + ```beforeCreate``` 和 ```created``` 在Vue3中已经不存在，```setup``` 贯穿了这两个周期。
  
  + ```mounted``` ```beforeUpdate``` ```update``` ```activated``` deactivated等几个生命周期函数，变成了```onmounted``` ```onbeforeUpdate``` ```onupdate``` ```onactivated```

  + ```beforeDestroy``` 和 ```destroyed``` 变成了 ```onbeforeUnmounted``` 和 ```onunmounted```

  + Vue3 还添加了两个开发过程可使用的调式生命周期函数
    + ```renderTracked``` :此钩子事件能够实现当组件渲染时，追踪到响应式依赖的调用。
    + ```renderTriggered``` :此钩子事件告诉你是什么操作触发了重新渲染，以及该操作的目标对象和键。

#### 如何理解 Vue 中的自定义指令

  在 Vue 中，自定义指令（Custom Directives） 是一种扩展 Vue 原生指令（如 v-model、v-show）的机制，它的原理主要是通过钩子函数和 binding 对象，允许你直接操作底层 DOM 元素。当内置指令无法满足特定需求时，自定义指令提供了一种灵活的方式处理 DOM 行为。适用于需要精确控制元素行为的场景（如元素级别的权限控制，图像按需加载，自定义埋点等等）。

#### Vue 的数据双向绑定(v-model)原理？

**核心点：**
  1. 理解什么是 Vue 中的双向绑定，带来的好处是什么？
  2. 单向绑定和双向绑定的优缺点是什么？
  3. 理解 Vue 中，对于 input、checkbox、radio、自定义组件的双向绑定实现细节
  4. 能够回答出 v-model 和 sync 修饰符有什么区别

  **单向绑定和双向绑定的优缺点是什么？**

  + 单向绑定（One-Way Data Binding）
    + 数据流清晰可预测（一般都是model -> View），组件间解耦，依赖关系明确，适合大型项目，也便于后期的维护和测试。也是复杂应用实施状态管理的前提。
    + 因为是单向绑定，所以需要手动修改数据值，以保持数据的更新，开发效率不高。

  + 双向绑定（Two-Way Data Binding）
    + 适用于实时反应用户输入的场景，简化表单处理。适合小型项目或简单交互，强调开发效率（如后台管理等）。
    + 数据流不透明，因为是双向绑定的，自动同步可能导致数据变更来源模糊，尤其在复杂组件层级中，调试难度增加。

  **```v-model``` 和 ```.sync``` 修饰符的区别** 

  + Vue2 中的使用
    + ```v-model``` 为单个 prop 的双向绑定设计，是```:value="data" @input="data = $event.target.value"``` 的语法糖
    + ```:value.sync``` 支持多个 props 的双向绑定，解决 v-model 只能绑定单个值的限制。主要是实现子组件与父组件的双向绑定是 
    ```html
    <!-- 父组件 -->
    <ChildComponent :title.sync="pageTitle" :size.sync="pageSize" />

    <!-- 等价于 -->
    <ChildComponent 
      :title="pageTitle" 
      @update:title="pageTitle = $event"
      :size="pageSize"
      @update:size="pageSize = $event"
    />
    ```

  + Vue3 中取消了 ```.sync```修饰符，因为 ```v-model``` 可支持多个Prop绑定，因此可以使用 v-bind 和 v-on 来手动实现类似的双向数据绑定效果

  ```html
  <!-- 父组件 -->
  <ChildComponent v-model:title="pageTitle" v-model:size="pageSize" />

  <!-- 等价于 -->
  <ChildComponent
    :title="pageTitle"
    @update:title="pageTitle = $event"
    :size="pageSize"
    @update:size="pageSize = $event"
  />
  ```

#### vue nextTick 实现原理

#### Vue 组件之间的通信方式有哪些？

  **总的来说：** 组件通信常用方式有以下 10 种：
  + **```props```**
  + **```$emit/$on```**
  + **```$children/$parent```**
  + **```$attrs/$listeners```**
  + **```ref```**
  + **```$root```**
  + **```provide + inject```**
  + **```eventbus```**
  + **```Vue2: vuex```**
  + **```Vue3: Pinia```**

  按分类来说的话：

  + 父子组件
    + ```props/$emit/$parent/ref/$attrs```
  + 兄弟组件
    + ```$parent/$root/eventbus/vuex/pinia```
  + 跨层级关系
    + ```eventbus/provide+inject/vuex/pinia```

  **扩展：**

  知道上述所有方式中，很多其实是已经在 Vue3 中被废弃或者不推荐使用
  + 在 3.x 中，**```$children```** 属性已被删除并且不再受支持。 相反，如果您需要访问子组件实例，我们建议使用 template refs。
  + **```$listeners```** 已经在 Vue3 中被废弃
  + **```EventBus```** 不推荐使用：
    当然，这里的不推荐使用并不是说 EventBus 完全不能使用，EventBus 的使用比较看场景，更适合在简单的场景下进行组件之间的通信。它允许任何组件在需要时发布事件，其他组件可以订阅这些事件并作出相应的响应。但是相对全局状态管理 Vuex 和 Pinia，

  **Vue 中 $attrs 和 $listeners 的含义和适用场景是什么？**

  + **```$attrs：```** 包含了父作用域中不被 prop 所识别 (且获取) 的特性绑定 ( class 和 style 除外 )。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 ( class 和 style 除外 )，并且可以通过 v-bind="$attrs" 传入内部组件。通常配合 inheritAttrs 选项一起使用。
  + **```$listeners：```**包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件
  **最常见的使用场景在于多级组件嵌套需要传递数据时**
  ```html
  <!-- 父组件 -->
  <template>
    <div>
      <child-dom :foo="foo" :bar="bar" @upFoo="update"></child-dom>
    </div>
  </template>
  
  <script>
  import ChildDom from "../components/attrs/ChildDom.vue";
  export default {
    components: {
      ChildDom,
    },
    data() {
      return {
        foo: "foo",
        bar: "bar",
      };
    },
    methods: {
      update(val) {
        this.foo = val;
        console.log("update success");
      },
    },
  };
  </script>


  <!-- 子组件 -->
  <template>
    <div>
      <p>foo:{{ foo }}</p>
      <p>attrs: {{ $attrs }}</p>
      <dom-child v-bind="$attrs" v-on="$listeners"></dom-child>
    </div>
  </template>
  •
  <script>
  import DomChild from "./DomChild.vue";
  export default {
    props: ["foo"],
    inheritAttrs: false,
    components: {
      DomChild,
    },
  };
  </script>


  <!-- 孙组件 -->
  <template>
    <div>
      <p>bar:{{ bar }}</p>
      <button @click="startUpFoo">我要更新foo</button>
    </div>
  </template>
  •
  <script>
  export default {
    props: ["bar"],
    methods: {
      startUpFoo() {
        this.$emit("upFoo", "foooooooooooo");
        console.log("startUpFoo");
      },
    },
  };
  </script>
  ```

#### Vue 中可以如何对一个组件进行扩展？(TODO -- 后续需要认真学习和总结-- 项目总结会涉及到)

#### Vue2.x 和 Vue3 响应式上的区别

  Vue 2.x 版本使用的是基于 Object.defineProperty 实现的响应式系统，而 Vue 3.x 版本使用的是基于 ES6 Proxy 对象实现的响应式系统，两者在实现上有很大的区别。

  在 Vue 2.x 中，当一个对象被设置为响应式对象时，会通过 Object.defineProperty() 方法把每个属性都转换成 getter 和 setter，当属性值发生变化时，会触发 setter，进而通知所有引用该属性的组件更新视图。
  而在 Vue 3.x 中，通过 ES6 Proxy 对象代理实现了对对象的监听和拦截，可以更加细粒度地控制对象属性的读取和赋值行为，也提供了更好的性能表现。
  1. Vue 3.x 中对于新增属性和删除属性的响应式处理更加完善和高效，无需使用 Vue.set()方法，而 Vue 2.x 中需要手动使用这些方法才能保证新增或删除属性的响应式效果。
  2. Vue 3.x 中使用了递归遍历 Proxy 对象的属性，因此在访问嵌套属性时会更加方便和高效，而 Vue 2.x 则需要通过 watch 或 computed 等方式才能实现嵌套属性的响应式。
  3. Vue 3.x 中的响应式系统支持了 reactive() 和 readonly() 等 API，方便开发者创建只读或可变的响应式对象。而在 Vue 2.x 中则没有这些 API。

  总的来说，Vue 3.x 中的响应式系统在使用上更加**方便、高效和完善**。

  **Object.defineProperty 实现数据响应式的一些问题:**

  + **只能劫持对象属性**
    + 如果需要对整个对象进行劫持代理， 或者需要监听对象上的多个属性，则需要额外需要配合 Object.keys(obj) 进行遍历。
    + 对象的层级不止一层，需要深度监听一个对象，则在上述的遍历操作下，还需要叠加递归处理的思想。因此，整个代码量和复杂度都是非常高的
  + **无法监听数组变化** ：在 Vue2.x 中，通过重写 Array 原型上的方法解决了这些问题
  + **初始化性能开销大**


#### Vue 怎么用 vm.$set() 解决对象新增属性不能响应的问题 ？


#### Vue 数据绑定是怎么实现的？

  Vue的数据绑定机制是通过**数据劫持**和**发布/订阅模式**实现的。当数据发生变化时，会自动更新视图，并通过虚拟DOM对比算法来提高性能。这个机制可以有效地简化开发过程，提高代码的可维护性和可读性。

  ##### Vue2的数据绑定

  [![image.png](https://i.postimg.cc/d1NwfWVS/image.png)](https://postimg.cc/qhKPhxn8)

  **简化版代码：**

  ```js
  // 响应式数据处理，构造一个响应式对象
  class Observer {
    constructor(data) {
      this.data = data
      this.walk(data)
    }

    // 遍历对象的每个 已定义 属性，分别执行 defineReactive
    walk(data) {
      if (!data || typeof data !== 'object') {
        return
      }

      Object.keys(data).forEach(key => {
        this.defineReactive(data, key, data[key])
      })
    }

    // 为对象的每个属性重新设置 getter/setter
    defineReactive(obj, key, val) {
      // 每个属性都有单独的 dep 依赖管理
      const dep = new Dep()

      // 通过 defineProperty 进行操作代理定义
      Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        // 值的读取操作，进行依赖收集
        get() {
          if (Dep.target) {
            dep.depend()
          }
          return val
        },
        // 值的更新操作，触发依赖更新
        set(newVal) {
          if (newVal === val) {
            return
          }
          val = newVal
          dep.notify()
        }
      })
    }
  }

  // 观察者的构造函数，接收一个表达式和回调函数
  class Watcher {
    constructor(vm, expOrFn, cb) {
      this.vm = vm
      this.getter = parsePath(expOrFn)
      this.cb = cb
      this.value = this.get()
    }

    // watcher 实例触发值读取时，将依赖收集的目标对象设置成自身，
    // 通过 call 绑定当前 Vue 实例进行一次函数执行，在运行过程中收集函数中用到的数据
    // 此时会在所有用到数据的 dep 依赖管理中插入该观察者实例
    get() {
      Dep.target = this
      const value = this.getter.call(this.vm, this.vm)
      // 函数执行完毕后将依赖收集目标清空，避免重复收集
      Dep.target = null
      return value
    }

    // dep 依赖更新时会调用，执行回调函数
    update() {
      const oldValue = this.value
      this.value = this.get()
      this.cb.call(this.vm, this.value, oldValue)
    }
  }

  // 依赖收集管理者的构造函数
  class Dep {
    constructor() {
      // 保存所有 watcher 观察者依赖数组
      this.subs = []
    }

    // 插入一个观察者到依赖数组中
    addSub(sub) {
      this.subs.push(sub)
    }

    // 收集依赖，只有此时的依赖目标（watcher 实例）存在时才收集依赖
    depend() {
      if (Dep.target) {
        this.addSub(Dep.target)
      }
    }
  }

  // 表达式解析
  function parsePath(path) {
    const segments = path.split('.')
    return function (obj) {
      for (let i = 0; i < segments.length; i++) {
        if (!obj) {
          return
        }
        obj = obj[segments[i]]
      }
      return obj
    }
  }
  ```

  **总结：**

  + 上图所示：Vue主要是由 **```Compile```、```Observe```、```Watcher```** 来实现的，通过 Observer 来监听自己的 model 数据变化，通过 ```Compile``` 来解析编译模板指令，最终利用 ```Watcher``` 搭起 ```Observer``` 和 ```Compile``` 之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据model变更的双向绑定效果。

  + Compile 的智慧
    + 不是一次性渲染，而是生成 带数据绑定的函数
    + 每个数据绑定对应一个 Watcher（精准更新）

  + Observe 的陷阱
    + 通过 getter/setter 制造"数据访问监控区"
    + 只有被 Watcher 访问过的数据才会被追踪

  **简略流程图：**
  ```
    [模板]                            [数据]                
      │                                │
      ▼                                ▼
    Compile解析                        Observe劫持
  （找到{{count}}）              （给count加getter/setter）
      │                                │
      ▼                                ▼
    创建渲染函数                     数据访问触发getter
      │                                │
      ▼                                ▼
  创建Watcher实例 ←───── 依赖收集 ←──── Dep.target
  （带更新函数）          （双向记录）
      │
      ▼
  数据变更触发setter
      │
      ▼
  通知Watcher更新
      │
      ▼
  执行更新函数
  ```

  ##### Vue3 的数据绑定

  Vue3的响应式的实现，表层来说只是Object.defineProperty变成了Proxy代理方式的变换。从更细维度的角度来讲，Vue3 的响应式系统基于 Proxy 和 Reflect API 进行了全面重构。以下是主要的差别：

  1. Proxy对象代理更简洁和高效，不需要递归遍历，每个属性进行```getter```和```Setter```重写，而且可以直接代理整个响应对象，就可以实现每个属性的监听。
  ```js
  // 创建响应式对象 reactive的基础实现
  function reactive(obj) {
    return new Proxy(obj, {
      get(target, key, receiver) {
        track(target, key) // 依赖收集
        return Reflect.get(target, key, receiver)
      },
      set(target, key, value, receiver) {
        const oldValue = target[key]
        const result = Reflect.set(target, key, value, receiver)
        if (oldValue !== value) {
          trigger(target, key) // 触发更新
        }
        return result
      },
      // 其他拦截操作（deleteProperty/has等）
    })
  }
  ```
  2. 依赖收集的实现的不一样。Vue 3中的effect函数相当于Vue 2的Watcher，当响应式数据被访问时，effect会被收集，数据变化时触发effect重新执行。track和trigger函数。Track在get操作时记录依赖，trigger在set操作时触发更新。
  ```js
  // 依赖存储结构
  const targetMap = new WeakMap() // target -> keyDepMap
  const keyDepMap = new Map()     // key -> depSet
  const depSet = new Set()        // 存储 effect

  // 收集依赖
  function track(target, key) {
    if (activeEffect) {
      let deps = targetMap.get(target)
      if (!deps) targetMap.set(target, (deps = new Map()))
      let dep = deps.get(key)
      if (!dep) deps.set(key, (dep = new Set()))
      dep.add(activeEffect)
    }
  }

  // 触发更新
  function trigger(target, key) {
    const deps = targetMap.get(target)
    if (!deps) return
    const effects = deps.get(key)
    effects && effects.forEach(effect => effect())
  }
  ```
  Vue3依赖收集的全过程
  ```js
  import { reactive, effect } from 'vue'

  // 1. 创建响应式对象
  const state = reactive({ count: 0, name: 'Vue' })

  // 2. 创建副作用函数（模拟组件渲染）
  effect(() => {
    console.log(`Count: ${state.count}`)
  })

  // 执行流程:
  // a. effect执行 -> activeEffect = 当前effect
  // b. 执行回调函数 -> 访问state.count
  // c. 触发Proxy.get拦截器 -> 调用track(state, 'count')
  // d. track将当前effect添加到count的依赖集合
  //
  // 依赖存储结构:
  // targetMap: {
  //   [state]: {
  //     'count': [当前effect]
  //   }
  // }

  // 3. 修改数据触发更新
  state.count++ 

  // 执行流程:
  // a. 触发Proxy.set拦截器 -> 调用trigger(state, 'count')
  // b. trigger查找count的所有依赖effect
  // c. 执行这些effect（重新运行回调函数）
  ```

  3. Vue3比较Vue2上还存在性能优化、处理数组和对象的能力差异，以及内存管理方面的改进。
  + 惰性代理 -- 只有被访问的属性才会被深度代理,避免初始化时递归整个对象树.
  + 依赖分级 -- 1. 根据操作类型优化触发逻辑。2. 数组的 length 变化特殊处理
  ```js
  // 更新触发类型
  export const enum TriggerOpTypes {
    SET = 'set',
    ADD = 'add',
    DELETE = 'delete',
    CLEAR = 'clear'
  }
  ```
  + 批量更新 -- 使用微任务队列批量处理更新

  参考 [Vue的依赖收集](https://ustbhuangyi.github.io/vue-analysis/v2/reactive/getters.html#dep)

#### 聊聊 keep-alive 组件

  在Vue中，keep-alive是一个抽象组件，它可以将其包裹的组件进行缓存，从而在切换组件时可以避免重复创建和销毁组件，提高页面性能和用户体验。

  当一个组件被包裹在keep-alive中时，该组件会被缓存起来，而不是销毁。当这个组件再次被使用时，它会被从缓存中取出来并重新挂载到页面上。keep-alive提供了两个钩子函数：activated和 deactivated，用来在组件被激活或停用时执行一些逻辑，比如在组件被激活时执行一些数据初始化或者异步操作。

#### Vue 如何进行依赖收集的?

  虽然 Vue 2 与 Vue 3 实现响应式系统的方式不同，但是他们的核心思想还是一致的，都是通过 发布-订阅模式 来实现（因为发布者和观察者之间多了一个 dependence 依赖收集者，与传统观察者模式不同）。

  **Vue2 中的依赖收集：**

  1. 在Vue2中，依赖收集是通过```Object.defineProperty```对数据的get和set方法进行劫持实现的。
  2. 当模板中使用到响应式数据时，Vue2会在编译阶段解析模板，将模板中所有的**数据访问表达式与对应的Watcher**建立联系。
  3. Watcher对象负责将模板中的数据和视图进行关联，并且会在数据改变时触发更新。
  4. 在初始化阶段，Vue2会为每个组件创建一个Watcher，并在组件渲染过程中进行依赖收集。
  5. 在Watcher的get方法中，会将当前的Watcher对象（Dep.target）存储到被访问数据的依赖列表中（Dep）。
  6. 当被访问的数据发生变化时，会触发setter方法，通过遍历依赖列表，通知每个依赖的Watcher执行更新操作。

  **Vue3 中的依赖收集：**

  1. 在Vue3中，依赖收集采用了Proxy代理对象的方式实现。
  2. 每个组件实例都会有一个Reactive对象，通过Proxy对数据进行劫持，当访问或修改数据时会触发对应的get和set操作。
  3. 在访问数据时，Vue3会通过Proxy捕获到访问操作，并将当前的Reactive对象和属性进行关联。
  4. 当数据发生变化时，Proxy会触发对应的set操作，通过遍历相关的依赖列表来进行更新。
  5. 与Vue2不同，Vue3采用了基于函数的响应式系统，将依赖收集与更新逻辑分离，避免了Watcher对象的创建和管理


  **Vue 中的计算属性是如何收集依赖和进行更新的？**

  Vue 的计算属性是一种便捷的属性，它的值是基于其他数据或计算属性衍生而来。Vue 能够自动追踪计算属性所依赖的数据以及对应的更新时机，这是通过依赖收集机制来实现的。

  + **收集依赖：** 在组件渲染过程中，当计算属性被访问时，Vue会将当前正在执行的计算属性添加到一个依赖收集器中（Dep）。
  + **触发依赖：** 同时，Vue 还会访问计算属性所依赖的其他数据（例如响应式数据或其他计算属性）。在访问这些数据的过程中，Vue 会将这些数据也添加到同一个依赖收集器中。
  + **建立关联：** Vue 会建立起计算属性与所依赖数据之间的关联关系，使得当所依赖的数据发生改变时，计算属性能够被正确地更新。
  + **派发更新：** 当所依赖的数据发生改变时，Vue 会通知依赖收集器中所关联的计算属性，将它们标记为需要重新计算。
  + **重新计算：** 在下一次访问计算属性时，如果该计算属性被标记为需要重新计算，Vue 会重新调用计算属性的求值函数来计算新的值，并缓存起来。

  **总结：**

  尽管 Vue2 和 Vue3 的依赖收集机制有所差异，但它们都通过劫持数据的访问操作，建立数据与视图的联系。Vue2 使用Object.defineProperty 对数据进行劫持，通过 Watcher 对象进行依赖收集和更新；
  而 Vue3 使用 Proxy 代理对象进行劫持，将数据与 Reactive 对象关联，并通过遍历依赖列表进行更新。Vue3 在性能和开发体验上做了一些优化，使得依赖收集更加高效和灵活。

  ```
  ***** 依赖收集的全过程 ******

  初始化响应式数据
        │
        ˅
  创建 Watcher（组件渲染/计算属性等）
        │
        ˅
  设置 Dep.target = 当前 Watcher
        │
        ˅
  执行渲染/计算（触发数据 getter）
        │
        ˅
  getter 中通过 dep.depend() 收集依赖
        │
        ˅
  将 Dep 存入 Watcher，同时将 Watcher 存入 Dep.subs
        │
        ˅
  重置 Dep.target = null
  ```

#### 函数式组件



#### 详解 Vue 单向数据流

  **单向数据流：** 在 Vue 中，单向数据流是指数据在组件之间的传递是单向的，即从父组件传递给子组件。这种单向数据流的模式有助于提高代码的可维护性和可预测性。

  **重要性：** 在父组件中，一个变量往往关联着多个变量或动作，如果子组件可以任意修改Prop对象，则父组件可能会出现未知的错误，并且无法预测其数据修改的来源的方式

  **Vue 的单向数据流和双向数据绑定是否冲突？**

  V-model和单项数据流并不冲突，所谓的单向数据流，指的是组件之间的数据流动。v-model 虽然是双向数据绑定，但是 v-model 只是一个语法糖， 本质上也是单向数据流，只是多了一层用户输入触发事件，更新数据的封装。

#### 详解 Vue template 模板编译

  ##### Vue模版编译的基础概念

  Vue中的模版编译主要是指将Vue的模版代码转换成JS可执行的代码的编译过程。

  Vue 模板（template）在**运行前会被编译成渲染函数**，**避免了每次渲染时重新解析模板的开销。** 模板编译主要存在以下的特点：

  + **提高性能：** 模板编译将模板转换成更高效的代码，避免了运行时解析模板的开销，提升了应用的性能。

  + **简化开发：** 通过模板编译，开发者可以使用类似 HTML 的标记语法编写组件模板，而无需直接操作 JavaScript 对象和函数，降低了开发的难度。

  + **实现响应式更新：** 模板编译会将模板中的指令和数据转化成一组渲染函数，这些渲染函数可以与 Vue 的响应式系统协同工作，实现数据的自动更新和视图的重渲染。

  + **基于模板的性能优化**

    + **静态节点提升：** Vue 在模板编译阶段会检测出那些静态节点（不依赖响应式数据的节点），并将其优化为常量，避免了在每次重新渲染时对这些节点进行重复的创建和比对操作。
    + **列表渲染优化：** Vue 提供了 v-for 指令用于列表渲染，而且在编译时会自动为每个列表项生成唯一的 key 值。这样在更新列表时，Vue 可以精确地检测到每个列表项的变化，减少了不必要的 DOM 操作，提高了性能。
    + **条件渲染优化：** Vue 的模板支持使用 v-if 和 v-show 指令进行条件渲染。在编译时，Vue 会根据指令的条件进行静态分析，如果条件是确定的（即不依赖响应式数据），则会进行静态提升，优化渲染性能。
    + **缓存事件处理函数：** Vue 的模板编译会自动为事件处理函数生成缓存版本，在渲染过程中复用同一个处理函数，避免了重复创建匿名函数的开销。
    + **内置指令:** Vue 内置了一些常用的指令，如 v-model、v-bind、v-on 等。这些指令在模板编译时会被转换为相应的渲染函数，能够更高效地更新视图，并且可以方便地处理用户输入、属性绑定和事件监听等操作。

  ##### 模板变异过程解析

  在 Vue 的整个编译过程中，会做三件事：

  + **解析模板 parse，生成 AST**
  + **优化 AST optimize**
  + **生成代码 generate**

  在 Vue 的编译过程中，其核心步骤可以分为以下三个阶段：
  
  + **解析模板 parse，生成 AST** ：在这一阶段，Vue 会将模板解析为抽象语法树（AST），以便后续进行优化和代码生成。Vue 的解析器采用了 **```HTML Parser```** 和 **```Text Parser```** 两个解析器，分别用于解析 HTML 标签和模板文本。解析器会将模板解析为一组元素描述对象和指令描述对象，然后使用这些对象构建出整个模板的 AST。

  + **优化 AST optimize：** 在生成 AST 后，Vue 会对其进行优化处理，以便更高效地生成代码。这一阶段包括以下三个优化步骤：

    + 静态节点标记。Vue 会对那些静态节点进行标记，避免其在之后的更新中重新渲染；
    + 静态节点提升。Vue 会将那些只包含静态内容的节点，在编译时提升为常量，从而减少渲染开销。
    + 插槽优化。Vue 会对所有的插槽节点进行标记和优化，从而更高效地处理 slot 元素的渲染。

  + **生成代码 generate：** 在 AST 优化后，Vue 会进一步将其转换为可执行的代码，以便生成组件的渲染函数。具体来说，Vue 会根据每个节点生成相应的渲染函数，并将这些函数组合成一个完整的组件渲染函数。同时，Vue 还会为每个组件生成相应的静态 Render 函数，以便在第一次渲染时可以直接使用，提高性能。

  ##### 了解 Vue template 与 React JSX 的差异及优劣势对比 ?


#### Vue的性能优化（后续可以项目上深挖）

  Vue 相关的性能优化，大致可以分为：

  + **页面渲染加载性能优化**
    + 避免将所有数据设置为响应式数据
    + 合理使用 computed 和 watch
    + 列表性能优化
    + 服务端渲染 SSR

  + **页面更新性能优化**
    + 静态内容标记为只渲染一次(v-once)以及缓存模板的子树(v-memo)
    + 减少大型不可变数据的响应性开销
    + 给 v-for 添加 key 且避免同时使用 v-if
    + 合理使用 v-if 与 v-show
    + 使用 keep-alive 组件

  + **构建优化**
    + 路由懒加载
    + 包体积优化与 Tree-shaking 优化
    + SourceMap 的处理

  **总结：**
  + 懒加载是首屏提速利器： 路由级、组件级。
  + v-for 必带稳定 key： 核心优化点。
  + 避免 v-for + v-if 共舞： 用计算属性过滤或移动 v-if。
  + v-if vs v-show： 按切换频率选。
  + 善用计算属性缓存： 避免模板复杂逻辑。
  + 冻结大型只读数据： Object.freeze() 减少响应式开销。
  + 构建优化不可少： 生产模式、Tree Shaking、代码分割、压缩。
  + keep-alive 缓存状态： 适用频繁切换的复杂组件。
  + 虚拟滚动救长列表： 必备方案。
  + 图片懒加载+优化： 提升加载体验。
  + SSR/SSG 选场景： 要首屏和 SEO 考虑 SSR/SSG。
  + 工具分析 + 监控： 用数据驱动优化。

#### 详解虚拟 DOM 与 Vue DIFF 算法原理

  ##### 虚拟DOM

  虚拟 DOM 是一个轻量级的 JavaScript 对象（或称为“树”），它是对真实 DOM 结构的抽象表示，也就是说每个虚拟DOM节点（VNode）代表一个真实DOM节点或一段文本。虚拟DOM对象包含与之相关的信息，如标签名、属性、子节点等。它主要是用于优化 DOM 操作的效率和性能

  **为什么要使用虚拟 DOM？虚拟 DOM 的性能一定比原生 DOM 好吗？**

  + 当然是前端优化方面，**避免频繁操作 DOM**，频繁操作 DOM 会可能让浏览器回流和重绘，性能也会非常低，还有就是手动操作 DOM 还是比较麻烦的，要考虑浏览器兼容性问题，当前 jQuery 等库简化了 DOM 操作，但是项目复杂了，DOM 操作还是会变得复杂，数据操作也变得复杂
  + **跨平台：** 虚拟 DOM 可以实现跨平台渲染，服务器渲染、小程序、原生应用都使用了虚拟 DOM
  + **状态追踪：** 虚拟 DOM 可以比较好的维护组件的状态，更好的跟踪的状态
  + 并不是所有情况使用虚拟 DOM 都提高性能，是针对在复杂的的项目使用。如果简单的操作，使用虚拟 DOM 要创建虚拟 DOM 对象等等一系列操作，还不如普通 的DOM 操作

  ##### Vue2 的DIFF算法

  DIFF 算法是虚拟 DOM 高效更新的引擎。Vue  的 DIFF 算法基于**两个关键假设（启发式策略）**，将复杂度从理论上的 O(n³) 优化到实践中高效的 O(n)：

  + **同层比较：** DIFF 只会比较同一层级的节点，不会跨层级比较。如果发现节点在不同层级，会直接销毁重建。
  + **节点复用策略：**
    + **不同类型节点：（直接销毁不会比较）** 如果两个节点的标签类型不同 (如 div vs span) 或组件类型不同，Vue 认为它们代表完全不同的子树，会直接销毁旧节点及其整个子树，创建并挂载新节点及其整个子树。不会尝试比较它们的子节点。
    + **相同类型节点：（相同节点才会继续比较）** 如果两个节点类型相同（且非静态/非异步组件等），Vue 会尝试复用该节点对应的真实 DOM 元素，只更新该节点上发生变化的属性。然后递归地对它们的子节点列表进行 DIFF 比较。

  **核心算法：子节点列表对比 (双端比较算法)**
  当新旧节点类型相同，需要对比它们的子节点数组 (children) 时，Vue 2 采用了高效的双端比较算法（头尾指针法）：

  1. **初始化指针：** 设置 4 个指针和对应的 VNode：
    ```oldStartIdx``` / ```oldStartVnode``` ：指向旧子节点列表的开始
    ```oldEndIdx``` / ```oldEndVnode``` ：指向旧子节点列表的结束
    ```newStartIdx``` / ```newStartVnode``` ：指向新子节点列表的开始
    ```newEndIdx``` / ```newEndVnode``` ：指向新子节点列表的结束
  2. **循环比较（直到任一列表的指针重合）：**
    + **情况 1：头头相同** (sameVnode(oldStartVnode, newStartVnode)):
      + 调用 ```patchVnode``` 更新这两个节点（递归 DIFF 属性和子节点）。
      + ```oldStartIdx++```, ```newStartIdx++``` （指针后移）。
    + **情况 2：尾尾相同** (sameVnode(oldEndVnode, newEndVnode)):
      + 调用 ```patchVnode``` 更新这两个节点。
      + ```oldEndIdx--```, ```newEndIdx--``` （指针前移）。
    + **情况 3：旧头 == 新尾** (sameVnode(oldStartVnode, newEndVnode)):
      + 节点相同，但位置变了（旧列表头 -> 新列表尾）。
      + 调用 patchVnode 更新节点。
      + 移动 DOM： 将 oldStartVnode 对应的真实 DOM 移动到 oldEndVnode 对应 DOM 的后面。
      + oldStartIdx++, newEndIdx--。
    + **情况 4：旧尾 == 新头** (sameVnode(oldEndVnode, newStartVnode)):
      + 节点相同，但位置变了（旧列表尾 -> 新列表头）。
      + 调用 patchVnode 更新节点。
      + 移动 DOM： 将 oldEndVnode 对应的真实 DOM 移动到 oldStartVnode 对应 DOM 的前面。
      + oldEndIdx--, newStartIdx++。
    + **情况 5：以上都不匹配：**
      + **基于 key 的查找 (关键！)：**
        + 尝试在剩余的旧子节点 (oldStartIdx 到 oldEndIdx) 中，根据 newStartVnode.key 查找是否有相同 key 的旧节点 (idxInOld)。
        + 如果找到 (idxInOld 存在)：
        + 找到的节点 (vnodeToMove) 与 newStartVnode 相同。
        + 调用 patchVnode 更新 vnodeToMove。
        + 移动 DOM： 将 vnodeToMove 对应的真实 DOM 移动到 oldStartVnode 对应 DOM 的前面。
        + 将旧节点数组中 idxInOld 位置的节点标记为 undefined (避免后续重复处理)。
      + **如果没找到：**
        + newStartVnode 是全新节点。
        + 创建 DOM： 为 newStartVnode 创建新的真实 DOM 节点，插入到 oldStartVnode 对应 DOM 的前面。
    + **newStartIdx++ (无论是否找到，新头指针后移)。**
  3. **循环结束后的处理：**
    + **新列表有剩余 (newStartIdx <= newEndIdx):** 说明有新增节点。遍历剩余新节点，为每个创建新 DOM，批量插入到参考位置 (通常是 oldEndVnode 的下一个兄弟节点前，若不存在则追加到父节点末尾)。
    + **旧列表有剩余 (oldStartIdx <= oldEndIdx):** 说明这些节点在新列表中不存在。遍历移除这些旧节点及其对应的真实 DOM。

  **Vue2的示例：**
  ```
  旧: [A(key:a), B(key:b), C(key:c), D(key:d)]
  新: [D(key:d), C(key:c), E(key:e), B(key:b)] // 移动了 D、C，新增 E，删除了 A
  ```
  + 初始化指针： oldStart=A, oldEnd=D, newStart=D, newEnd=B
  + 情况4 (旧尾D == 新头D)： 匹配！移动 D 到 A 前面。指针：oldStart=A, oldEnd=C, newStart=C, newEnd=B
  + 情况4 (旧尾C == 新头C)： 匹配！移动 C 到 A 前面。指针：oldStart=A, oldEnd=B, newStart=E, newEnd=B
  + 情况5： 查找 E(key:e) 在 [A, B] 中？未找到！创建 E 插入到 A 前面。指针：oldStart=A, oldEnd=B, newStart=B, newEnd=B
  + 情况2 (尾尾B相同)： 匹配！更新 B（无需移动）。指针结束。
  + 旧列表剩余 A： 删除 A。
  + 最终 DOM 顺序： [D, C, E, B] - 完美匹配新列表。
  结果： 只移动了 D 和 C 的 DOM，创建了 E 的 DOM，删除了 A 的 DOM。B 的 DOM 被复用且移动到了正确位置。避免了不必要的重建。

  ##### Vue3的DIFF算法

  Vue 3 在 DIFF 算法上做了革命性的改进，核心思想是：将更多工作移到编译阶段，减少运行时的 DIFF 开销。DIFF 算法本身（双端比较）逻辑相似，但利用了编译时信息大幅优化。

  + **Patch Flags (补丁标志位)：**  标记动态部分，运行时 DIFF 精准靶向，避免无用检查。
    + **编译时分析：** Vue 3 的编译器在编译模板时，会静态分析模板中的动态绑定（{{ }}, v-bind, v-if 等）。
    + **标记动态部分：** 对于包含动态绑定的元素，编译器会在其虚拟 DOM 节点上添加一个 patchFlag 属性。这个标志位是一个二进制数，每一位代表一种可能的动态更新类型（如 TEXT-文本, CLASS-类名, STYLE-样式, PROPS-属性, FULL_PROPS-全属性等）。
    + **运行时优化：**
      当 DIFF 算法遇到带有 patchFlag 的节点时，不需要递归检查整个节点及其子树。
      它直接根据 patchFlag 的值，精确地知道需要检查这个节点的哪些特定部分是否发生了变化。
      例子： 如果一个节点只有 class 是动态的 (patchFlag = PatchFlags.CLASS)，DIFF 时只需对比新旧 class 值，完全跳过其子节点和其他属性的检查。

  + **静态提升 (Static Hoisting)：** 静态节点只创建一次，永不 DIFF，彻底消除其开销。
    **编译时识别：** 编译器识别出模板中完全静态的部分（没有任何动态绑定的元素、文本或子树）。
    **提升到渲染函数外：** 这些静态节点的虚拟 DOM 对象只在应用初始化时创建一次。
    **运行时复用：** 在后续的组件渲染中，直接复用这个静态的 VDOM 对象。
    效果： 静态节点完全跳过 DIFF 过程！大大减少了需要参与 DIFF 的节点数量。

  + **树结构优化 (Tree Flattening / Block Tree)：** 扁平化动态节点，跳过静态兄弟节点比较，大幅减少遍历量。
    + **识别动态子树根：** 编译器将模板视为嵌套的“区块”(Block)。每个区块由一个动态节点（如带 v-if, v-for 或动态绑定的节点）及其静态子节点组成。
    + **扁平化存储：** 区块内的动态子节点会被收集到一个扁平的数组中 (**```dynamicChildren```**)，存储在区块的根 VNode 上。
    + **运行时优化：**
      + 当 DIFF 一个区块时，Vue 3 只需要 DIFF 这个扁平的动态子节点数组。
      + 跳过了区块内所有纯静态节点的 DIFF（因为它们已被提升或无需比较）。
      + 即使静态节点是动态节点的兄弟节点（同层级），只要它们不在同一个动态父块内，也不会被比较。
      + 效果： 显著减少了需要遍历和比较的 VNode 数量，尤其是对于大型静态模板。
      + **注意核心是DIFF dynamicChildren：** 不再递归遍历 Block 根节点的整个子树！ 而是直接比较新旧 Block 节点上的 dynamicChildren 数组


#### Vue3的新特性

  + **Composition API：** Vue 3 引入了 Composition API，这是一组新的 API，允许用户更灵活地组合组件的逻辑。与 Vue 2 中的 Options API 相比，Composition API 提供了更好的逻辑复用和代码组织方式。
  + **性能提升：** Vue 3 在性能方面有显著的提升。它的框架大小减少了，初始化速度更快，同时更新的效率也得到了提高。
  + **响应式系统的重写：** Vue 3 的响应式系统从头开始重写，使用了 Proxy 代替了 Object.defineProperty，这使得它可以监听更多类型的数据变化，同时也减少了内存的使用。
  + **更好的 TypeScript 支持：** Vue 3 从一开始就考虑了对 TypeScript 的支持，这使得在 TypeScript 环境下开发 Vue 应用更加友好。
  + **新的生命周期钩子：** 例如 setup 钩子，它是在组件被创建之前执行的，适合用来定义 Composition API 中的响应式属性和函数。
  + **Fragment、Teleport 和 Suspense：**
    + Fragment：在 Vue 3 中，组件可以返回多个根节点，这称为 Fragment。
    + Teleport：这个新组件允许将子节点渲染到 DOM 树的任何位置，而不仅仅是父组件内部。
    + Suspense：支持异步组件的等待状态，使得异步加载组件时可以提供更好的用户体验。
  + **自定义渲染器 API：** Vue 3 提供了创建自定义渲染器的能力，这意味着 Vue 不仅限于浏览器，还可以用于其他环境，如小程序或原生应用。
  + **更多的内置功能：** 例如对虚拟 DOM 的改进，提供了更多的内置指令和组件，使得开发更加便捷。


#### Vue-router 的核心原理

#### computed和 watch 的区别

#### Vue 组件加载和渲染顺序








  

  






















