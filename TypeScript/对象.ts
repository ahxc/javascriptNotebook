// 引用对象包括基础类型以外的所有类型
// 不用类型标识默认标识为Object，
// Object与object区别：大写的变量可以重新赋值，但不能赋值 null 和 undefined。注意要用let。

const obj0 = { a: "1" };
const obj1: object = { a: "1" };
const obj2: Object = { a: "1" }; // obj1可以重新赋值

Object.assign(obj1, { a: 1 }); // 不能修改不存在的属性，不能以此新增属性。需要 assign 方法。

// 这种写法更精确
const obj3: { a: number; b: number } = { a: 1, b: 2 };
