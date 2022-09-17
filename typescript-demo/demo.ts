// get value
type p = Promise<"hello">;
type MyGetValueResult<P> = P extends Promise<infer S> ? S : never;
type pr = MyGetValueResult<p>;

// First
type f = [1, 2, 3];
type MyGetFirst<P extends unknown[]> = P extends [infer F, ...unknown[]]
    ? F
    : never;
type f1 = MyGetFirst<f>;

// Last
type l = [1, 2, 3];
type MyGetLast<P extends unknown[]> = P extends [...unknown[], infer F]
    ? F
    : never;
type f2 = MyGetLast<f>;

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

// replace
type MyReplace<S extends string, F extends string, T extends string> = S extends `${infer Start}${F}${infer End}` ? `${Start}${T}${End}` : S

type p6 = MyReplace<"hello world", "ll", "ooo">

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

// get param
type MyGetParam<F extends Function> = F extends (...args: infer Arg) => unknown ? Arg : never;
type p7 = MyGetParam<(name: string, age: number) => {}>


// get return type
type MyGetReturn<F extends Function> = F extends () => infer T ? T : never;
type p8 = MyGetReturn<() => string[]>

// get Constructor type
type Person = {
    name: string
}
type PersonContructor = {
    new(name: string): Person;
}

type MyGetContrucstorType<T extends new(...args: any) => any> = T extends new(...args: any) => infer S ? S : never;
type MyGetContrucstorParamsType<T extends new(...args: any) => any> = T extends new(...args: infer S) => any ? S : never;

type p9 = MyGetContrucstorType<PersonContructor>
type p10 = MyGetContrucstorParamsType<PersonContructor>

// get props ref
type MyGetPropsRefType<Props extends {}> = 
    'ref' extends keyof Props 
        ? 
            Props extends {ref ?: infer P | undefined } 
                ? P : never
        :   never

type p11 = MyGetPropsRefType<{ref: number}>
type p12 = MyGetPropsRefType<{ref: undefined}>