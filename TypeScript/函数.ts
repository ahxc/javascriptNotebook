// 函数和其参数也可以省略参数的和返回的类型标识，默认为any
// 如果参数有指定类型，必须有 return 返回参数包含的类型
// 通常省略返回类型标识，箭头函数同理
// 可选参数：?，位置一定要靠后。
function fun1(a, b = [], c: string, d?: number): string {
  return a;
}

// 剩余参数，不限定使用 rest，位置一定要靠后
const fun2 = (...a: number[]) => console.log(a);
const fun3 = (...rest) => console.log(rest); // 默认 any

// 当函数没有参数时可以不需要返回，默认返回 void
// 也可以指定 never ，前提是函数陷入死循环或者一定会 throw 异常
function fun4(): never {
  while (true) {}
  throw new Error("error");
}
