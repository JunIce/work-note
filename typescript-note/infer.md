## infer

```ts
const add = (x: number, y: number) => x + y
type D = ReturnType<typeof add> // number
```

```ts
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any
```

> infer 的作用是让 TypeScript 自己推断，并将推断的结果存储到一个类型变量中，infer 只能用于 extends 语句中。