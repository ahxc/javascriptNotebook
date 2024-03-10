// 类型是类型标识的别名，适用所有类型，接口只适用于对象。
// 类型和接口定义后，变量必须严格符合其定义，新增和遗漏，类型不符都会报错

type a = string | number; // 自定义或类型
type b = { a: string }; // 联合类型
type c = { b: number };
type all = b & c; // {a:string,b:number}
const obj: all = {
  a: "ahxc",
  b: 7,
  // c: 0// error，没有指定类型
};
// 如果 a和b重名，且类型不一致，那么怎么赋值都会报错，为never类型

// 接口是非表层属性合并
interface A {
  a: number;
}
interface B {
  readonly b: string; // 只读属性，初始赋值后便不能修改
}
// 可以嵌套定义
interface C {
  x: A;
}
interface D {
  x: B;
}
// 类型别名
type inter = C & D; // {x:{a,b}}
