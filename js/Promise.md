## 特性
1. 状态 pending、rejected、fulfilled
2. Promise对象接受一个回调函数作为参数, 该回调函数接受两个参数，分别是成功时的回调resolve和失败时的回调reject；另外resolve的参数除了正常值以外， 还可能是一个Promise对象的实例；reject的参数通常是一个Error对象的实例。
3. then方法返回一个新的Promise实例，并接收两个参数onResolved(fulfilled状态的回调)；onRejected(rejected状态的回调，该参数可选)
4. catch方法返回一个新的Promise实例
5. finally方法不管Promise状态如何都会执行，该方法的回调函数不接受任何参数

## 优点
1. 统一api
2. 解决回调地狱
3. 链式处理

## 缺点
1. 无法取消Promise，一旦新建它就会立即执行，无法中途取消。
2. 不catch错误，不能抛出来
3. 当处于Pending状态时，无法得知目前进展到哪一个阶段