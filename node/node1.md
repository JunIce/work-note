## module.exports 和 exports 关系
用一句话来说明就是，require方能看到的只有module.exports这个对象，它是看不到exports对象的，而我们在编写模块时用到的exports对象实际上只是对module.exports的引用。

module.exports 初始值为一个空对象 {}
exports 是指向的 module.exports 的引用
require() 返回的是 module.exports 而不是 exports
所有的 exports 做的工作实际上是收集属性，如果 module.exports 当前没有任何属性，exports便将收集到的属性添加到 module.exports 上。如果 module.exports已经存在若干属性，exports 上的属性都会被忽略。

## 客户端禁用cookie后怎么使用session?
URL重写，就是把session id直接附加在URL路径的后面
表单隐藏字段。就是服务器会自动修改表单，添加一个隐藏字段，以便在表单提交时能够把session id传递回服务器。

## libuv 
高性能事件驱动i/o库，事件驱动

## nodejs 优缺点
优点： 
    - 事件驱动、异步编程
    - 异步io，提升并发量
    - 单进程，节约资源
    - Node.js非阻塞模式的IO处理给Node.js带来在相对低系统资源耗用下的高性能与出众的负载能力，非常适合用作依赖其它IO资源的中间层服务。
缺点：
    - 可靠性低
    - 单进程，单线程，只支持单核CPU，不能充分的利用多核CPU服务器

## process.nextTick与setTimeout递归调用区别
process.nextTick 属于微任务，是在当前执行栈的尾部，Event Loop 之前触发，下面两个都是递归调用，test1 中 process.nextTick 是在当前执行栈调用，是一次性执行完，相当于 while(true){}，主线程陷入了死循环，阻断 IO 操作。

test2 方法中，setTimeout 属于宏任务，在任务队列中同样也是递归，但是它并不是一次性的执行而是会多次 Event Loop，不会阻断 IO 操作，另外注意 setTimeout 有一个最小的时间 4ms。
```js
function test1() {
    process.nextTick(() => test());
}

function test2() {
    setTimeout(() => test(), 0);
}
```
process.nextTick 将会阻塞 IO，setImmediate 不会输出
```js
function test() {
    return process.nextTick(() => test());
}

test();

setImmediate(() => {
    console.log('setImmediate');
})

```
下面使用 setTimeout 不会造成 IO 阻塞，会输出 setImmediate
```js
function test() { 
    setTimeout(() => test(), 0);
}

test()

setImmediate(() => {
    console.log('setImmediate');
})

```