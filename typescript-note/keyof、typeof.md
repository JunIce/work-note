## keyof

keyof用于获取对象的key
```ts
type Point = {
  x: number;
  y: number;
}

type KPoint = keyof Point; // x | y
```

## typeof

```ts

const point = {
a : 1,
b: 'test'
}
type P = keyof typeof point; // type '"a" || "b"'

const coordinate: P = 'z' // Type '"z"' is not assignable to type '"a" | "b"'.
```