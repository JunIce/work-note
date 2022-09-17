// get value
type p = Promise<"hello">;
type GetValueResult<P> = P extends Promise<infer S> ? S : never;
type pr = GetValueResult<p>;

// First
type f = [1, 2, 3];
type GetFirst<P extends unknown[]> = P extends [infer F, ...unknown[]]
    ? F
    : never;
type f1 = GetFirst<f>;

// Last
type l = [1, 2, 3];
type GetLast<P extends unknown[]> = P extends [...unknown[], infer F]
    ? F
    : never;
type f2 = GetLast<f>;

// pop
type MyPop<P extends unknown[]> = P extends [...infer F, unknown]
    ? F
    : never;
type p3 = MyPop<l>

// shift
type MyShift<P extends unknown[]> = P extends [unknown, ...infer F]
    ? F
    : never;
type p4 = MyShift<l>

// startWiths

type MyStartWiths<S extends string, P extends string> = S extends `${P}${string}` ? true : false

type p5 = MyStartWiths<"hello world", "hel">


// trim
type TrimLeft<Str extends string> = Str extends `${
    | " "
    | "\n"
    | "\t"}${infer Rest}`
    ? TrimLeft<Rest>
    : Str;
type TrimRight<Str extends string> = Str extends `${infer Rest}${
    | " "
    | "\n"
    | "\t"}`
    ? TrimRight<Rest>
    : Str;
type MyTrim<Str extends string> = TrimLeft<TrimRight<Str>>;

type AB = MyTrim<"   boss   ">;
