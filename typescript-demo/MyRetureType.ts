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
    a : 1,
    b: 'test'
  }
  type P = keyof typeof point; // type '"x" || "y"'
  
  const coordinate: P = 'z'
