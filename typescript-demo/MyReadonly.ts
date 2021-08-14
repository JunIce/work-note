


interface Todo {
    title: string
    description: string
  }


type MyReadonly<T> = {
    readonly [key in keyof T]: T[key]
}



const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar"
}

todo.title = 'jack'
