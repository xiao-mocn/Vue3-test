// 原型链继承的实现 --> 很简单的概念，将构造函数的原型对象指向父类的实例
// 1. 定义一个父类
function Prarent() {
}
// 给父类原型对象上添加一个方法
Prarent.prototype.say = function() {
  console.log('hello')
}
// 2. 定义一个子类
function Child() {}
// 3. 将子类的原型指向父类的实例
Child.prototype = new Prarent()
// 4. 实例化子类
const child = new Child()
child.say() // hello
