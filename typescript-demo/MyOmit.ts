interface Todo {
    name: string;
    description: string;
    completed: boolean;
}


type MyOmit<T, K extends string| number| symbol> = {
    [P in Exclude<keyof T, K>] : T[P]
}


type MyOmitTodo = MyOmit<Todo, 'description' | 'name'>;

const foo:MyOmitTodo = {
    completed: false
}





