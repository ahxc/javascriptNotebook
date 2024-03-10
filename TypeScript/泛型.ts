// 如果不想限死类型标识，而是根据参数的类型来确定，这就是泛型的作用
// TU没有具体含义，只是类型占位符，把类型当做参数来使用
// 泛型也可以指定默认类型
function fanxing<T, U = string>(data: T): T[] {
  let list: T[] = [];

  // 接口也可以使用泛型
  interface A<T, U> {
    name: T;
    age?: U; // 可选属性，age是可选地可有可无
  }

  const obj: A<string, number> = { name: "ahxc" };

  return list;
}

// 调用时传入相等泛型个数的参数类型即可
type Props = {
  name: string;
  age: number;
};
fanxing<Props>({ name: "asdf", age: 7 });

// 泛型中的一些常用语义字母

// T：type，类型
// K：key，键的类型
// V：value，值的类型
// E：element，元素类型

// 泛型也可以像函数和对象一样使用
// extends、typeof、Partial、Record、Exclude、Omit
// extends
interface _extends_Props {
  length: number;
}

function _extends<T extends _extends_Props>(data: T): number {
  return data.length; // 报错，因为不知道data有没有length这个属性。
  // 用extends继承接口，扩展对象类型
  // ! 注意，如果传入了没有.length属性的data，还是会报错。这个只是扩展的类型限制。
}

// typeof
// typeof 可以推出变量的类型也可以用于再次赋值
const typeofInfo = {
  name: "ahxc",
  age: 7,
};

type typeofProps = typeof typeofInfo; // {name:string,age:number,sex:boolean}

// keyof
// 获取接口的所有key值，也可以检查对象是否存在指定键值
interface keyofProps {
  name: string;
  age: number;
}

type keyofPropsKey = keyof keyofProps; // 此处用法和typeof不同，推导类型键值。name,age

const keyofCom1: keyofPropsKey = "name"; // 键值名
// const keyofCom2: keyofPropsKey = 'ahxc';// 报错，keyofPropsKey无此键名
