const fn = (v: boolean) => {
  if (v)
    return 1
  else
    return 2
}



type MyReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : never

type a = MyReturnType<typeof fn>


type Point = { x: number; y: number };

const point = {
  a: 1,
  b: 'test'
}
type P = keyof typeof point; // type '"x" || "y"'

const coordinate: P = 'z'

type Action =
  | {
    type: "INIT"
  }
  | {
    type: "SYNC"
  }
  | {
    type: "LOG_IN"
    emailAddress: string
  }
  | {
    type: "LOG_IN_SUCCESS"
    accessToken: string
  }


type ActionType = Action["type"]

type ExcludeTypeKey<T> = T extends "type" ? never : T

type ExcludeTypeArguments<A, T> = A extends { type: T }
  ? {
    [k in Exclude<keyof A, 'type'>]: A[k]
  }
  : never



declare function dispatch(type: ExtractSimpleAction<Action>['type']) : void
declare function dispatch<T extends ActionType>(type: T, args: ExcludeTypeArguments<Action, T>): void


dispatch("LOG_IN", {
  emailAddress: '123'
})

dispatch({
  emailAddress: 'ds'
})
