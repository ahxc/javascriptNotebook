// 类型守卫 关键字：in，typeof instanceof 类型为此：is
// 类型断言声明变量的类型让编辑器略过检查，而类型守卫则是确定变量是否属于哪个类型。

const obj: {
  name: string;
  age: number;
} = { name: "ahxc", age: 18 };

"age" in obj;
