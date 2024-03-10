// 类型断言只是一种类型注解的方式，忽略一些提前的报警
// 它不会改变变量的实际类型。如果变量的实际类型与断言的类型不匹配，后续操作仍出错

let a: any = "小杜杜";
let b: number = (<string>a).length; // 断言为 string jsx 冲突
let c: number = (a as string)!.length;
let d!: number; // 非空断言，没有初始值d去执行操作会报错，加上非空赋值后无影响
const obj: { a?: string } = {}; // 可选断言
