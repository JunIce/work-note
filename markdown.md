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
<b> <i> 是自然样式标签
<em> 和 <strong> 是语义样式标签

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

## 
