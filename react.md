## React 主要特性
- 虚拟dom
- 服务端渲染
- 单项数据流
- 组合式ui框架

##  Element and Component
一个React element就是一个代表了DOM节点的对象
一个component就是一个方法或者一个类，可以接受一定的输入，之后返回一个React element

## 创建组件
- Function Component
- Class Component

## Pure component
props or state 变化，纯组件会做浅对比 shallow comparison

## State and Props

### State 
组件内部的状态，跟随组件生命周期，完全私有，组件内部控制

### Props
组件外部的输入

## setState
直接改变不会重新渲染组件，setState改变才会重新渲染
第二个参数是回调函数

## synthetic events 合成事件
和浏览器原生事件一样，抹平不同浏览器之间的差异

## "key" prop
帮助react区分什么组件需要更新，性能优化需要

## refs
组件实例的引用，可以拿到dom
可以使用`React.createRef()`拿到

## React.forwardRef
React.forwardRef,该方法接受一个有额外ref参数的react组件函数，不调用该方法，普通的组件函数是不会获得该参数的。
如果子组件中用到了该方法，那么对应的高阶组件中也需要使用React.forwardRef方法

## React Fiber
V15版本
更新组件树时是同步更新的，当组件数比较大时，会出现性能问题
Fiber 任务分片，更新过程碎片化，维护每一个分片的数据结构，就是Fiber

- 第一阶段
componentWillMount
componentWillReceiveProps
shouldComponentUpdate
componentWillUpdate

- 第二阶段
componentDidMount
componentDidUpdate
componentWillUnmount


在React Fiber中，不再是这样了，第一阶段中的生命周期函数在一次加载和更新过程中可能会被多次调用！

