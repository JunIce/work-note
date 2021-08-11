## uuid regexp

```regexp
/^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/
```

## 如何实现一个Instance

```js
function _instanceof(left, right){
	let proto = left.__proto__;
	const prototype = right.prototype;

	while(true){
		if (proto === null) return false;
		if (proto === prototype) return true;
		proto = proto.__proto__;
	}
}
```

## module.exports 和 export import 区别
- module.exports导出模块，输出的是值的拷贝，这个值在模块内部的变化是监听不到的
- 使用import语句导入模块，export语句导出模块，输出的是对值的引用
- 只会生成一个动态的只读引用，等真的需要用到这个值时，再到模块中取值，也就是说原始值变了，那输入值也会发生变化。

## ES6模块与CommonJS模块
- Commonjs 输出的是值的拷贝， Es6输出的是值的引用。
- CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

## 渲染引擎和 JS 引擎
渲染引擎的职责就是渲染，即在浏览器窗口中显示所请求的内容
最开始渲染引擎和 JS 引擎并 没有区分的很明确，后来 JS 引擎越来越独立，内核就倾向于只指渲染引擎

## 浏览器渲染原理
- 构建dom树
- 构建cssom树
- 根据dom和cssom构建渲染树
- 根据渲染树进行布局（回流）
- 绘制阶段

## script 脚本 async defer
async 异步加载
defer 延迟加载

## b 与 strong 的区别和 i 与 em 的区别
`<b> <i> `是自然样式标签
`<em>` 和 `<strong> `是语义样式标签

## cookie sessionStorage localStorage
- cookie 4k
- sessionStorage localStorage 5M
- sessionStorage 一次会话中所保存的数据,同源访问
- localStorage 持久化数据，同源访问

## 页签之间通信

1. websocket
2. shareWorker
3. localStorage 监听变化
4. postMessage

## visibilitychange

document.visibilityState'

```js
hidden：页面彻底不可见。
visible：页面至少一部分可见。
prerender：页面即将或正在渲染，处于不可见状态。
```
dom元素的可见性
```js
document.addEventListener('visibilitychange', function() {
    ....
})
```

## 1px的线

```html
<div style="height:1px;overflow:hidden;background:red"></div>
```

## IE Chrome 并行下载多少个资源
IE6 2个 其他6个

## Event Loop
[https://github.com/lgwebdream/FE-Interview/issues/26](https://github.com/lgwebdream/FE-Interview/issues/26)

同步任务是直接放在主线程上排队依次执行，异步任务会放在任务队列中，若有多个异步任务则需要在任务队列中排队等待，任务队列类似于缓冲区，任务下一步会被移到调用栈然后主线程执行调用栈的任务。
> 调用栈：调用栈是一个栈结构，函数调用会形成一个栈帧，帧中包含了当前执行函数的参数和局部变量等上下文信息，函数执行完后，它的执行上下文会从栈中弹出。

### macro-task  
    setTimeout setInterval script UI渲染
### micro-task
    Promise.then() MutationObserve

### requestAnimationFrame 
    既不是宏任务也不是微任务

GUI渲染之前，micro-task 之后，由浏览器决定执行时机

### 执行机制：
1个宏任务 清空所有微任务，最后更新页面视图

## node中的Event Loop
采用v8作为js的解析引擎

libuv负责Node api的执行，讲不同的任务分配给线程，形成一个Event Loop,以异步的形式最后讲执行结果返回给V8，v8返回给用户

## node middleware

```js
const http = require('http')

function compose(middlewares) {
    return ctx => {
        function dispatch(i) {
            const fn = middlewares[i]
            try {
                return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)))
            } catch(err) {
                Promise.reject(err)
            }
        }
        return dispatch(0)
    }
}


class App {

    constructor() {
        this.middlewares = []
    }

    add(fn) {
        this.middlewares.push(fn)
        return this
    }

    handleRequest(ctx, middleware) {
        return middleware(ctx)
    }


    createContext(req, res) {
        return {
            req, res
        }
    }

    callback() {
        const fn = compose(this.middlewares)
        return (req, res) => {
            return this.handleRequest(this.createContext(req, res), fn)
        }
    }


    listen(...args) {
        const server = http.createServer(this.callback())
        return server.listen(...args)
    }
}


```

## node中间层的作用

限流
日志
权限鉴别
缓存
路由
服务端渲染
监控
代理

## li与li之间的空白
浏览器会把inline元素之间的空格、回车、tab渲染成一个空格，大约8px

1)  li设置float：left
2） li都写在同一行
3） ul {
     letter-spacing: 8px;
    }
    li {
        letter-spacing: normal;
    }

## width: 100% 和 width: auto区别
width 100% 元素宽度等于父元素宽度
width auto 会使元素撑满整个父元素，margin、border、padding、content 区域会自动分配水 平空间。

## margin 合并
margin-top 和 margin-bottom 合并

## BFC块级格式化上下文
1. float
2. position
3. overflow hidden/auto
4. display inline/block/inline-block/table-cell

## 清除浮动
1. clear: both
2. BFC清除浮动

## 去除 inline-block 元素间间距
font-size:0
letter-spacing -3px
word-spacing -6px





