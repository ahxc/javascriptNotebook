
// * ts是js的超集，在js的基础上加入了【类型系统】，让每个参数有明确的意义，并附加智能提示。
// * ts是一门强类型语言，但浏览器不能识别ts，所以编译时会编译为js。
// * 基本类型：string、number、boolean、symbol、bigint、null、undefined;
// * 引用类型：array、 Tuple(元组)、 object(包含Object和{})、function
// * 特殊类型：any、unknow、void、never、Enum(枚举);
// * 其他类型：类型推理、字面量类型、交叉类型;

// 字符串
let str: string = 'ahxc';

// 数字
let num: number = 7;

// 布尔
let bool: boolean = true;

// 标记符号 
let sym: Symbol = Symbol();

// bigint 新增
let big: bigint = 10n;

// null
let n: null = null;

// undefined
let undef: undefined = undefined;

// ! 注意，
// ! 一旦null和undefined赋值后，便不能再赋予其他任何类型。
// ! symbol 是独一无二的，在定义一个sym1，sym ===sym1 false

// array 数组
// 类型名称 + []
// Array<类型名称>

let arr1: number[] = [1, 2, 3];
let arr2: Array<number> = [1, 2, 3]; // 两个都被限定为number类型，其他类型会报错

// 除非
let arr3: Array<number | string> = [1, 2, '3'];

// tuple 元组 新增
// 可以说是数组的特殊情况，不仅限制类型还要限制个数。他可以push新增，但不能访问新增元素。

let t: [number, string] = [1, '2']; // 必须一一匹配。

t.push(2);
// t[2] 报错

// object 
// object非原始类型，可以直接定义，但修改属性值会报错，因为没有指定类型。需要{}来定义。

let obj1: object = { a: 1, b: 2 };
// obj1.a = 3; 报错
let obj2: { a: number, b: number; } = { a: 1, b: 2 };

// 或者使用Object，大写，他可以进行任意赋值。
let obj: Object;
obj = 1; // ok
obj = "a"; // ok
obj = true; // ok
obj = {}; // ok
obj = Symbol(); //ok
obj = 10n; //ok
// obj.a = '3' // 报错;，不存在的属性不能赋值。
// obj = null; // error
// obj = undefined; // error

// 函数
// 可以写入返回值的类型，如果写入，则必须要有对应类型的返回值，通常情况下是省略返回值类型，因为TS的类型推断功能够正确推断出返回值类型
function fun1(name: string) {

}

// function fun2(name: string): string {
//     return 1; // 无返回，或则返回类型不匹配都报错
// }

function fun2(name: string): string {
    return name;
}

// 箭头函数同理
const fun3 = (name: string): string => {
    console.log('hello', name); return name;
};

// 参数类型
// 可选参数：?，位置一定要靠后。
const fun4 = (name: string, age?: number) => console.log(name, age);
// 默认参数：=，不能和?混用
const fun5 = (name: string, age: number = 1) => console.log(name, age);
// 剩余参数：...，和js不同的是，不限定用...rest
const fun6 = (...numbers: number[]) => console.log(numbers);
const fun7 = (...rest) => console.log(rest); // any 类型

let obj3: any = {};
function setInfo(val: string): void;
function setInfo(val: number): void;
function setInfo(val: boolean): void;
function setInfo(val: string | number | boolean): void {
    if (typeof val === "string") {
        obj3.name = val;
    } else {
        obj3.age = val;
    }
}

// any
// ts中，任何类型都可以归于any类型，所以any类型是所有类型的顶级类型，不指定类型的话则默认any类型。但这ts就丧失了意义。
let d: any; //等价于 let d 
d = '1';
d = 2;
d = true;
d = [1, 2, 3];
d = {};

// unknown
// 与any一样都可以作为顶级类型，可接收各种类型的赋值，但unknown更加严格，
// any类型可以赋值给任何类型，而unknown只能复制给unknown和any。
// unknown不允许定义的值有任何操作，而any可以。

let u: unknown;
let a: any;

u = '1'; //ok
u = 2; //ok
u = true; //ok
u = [1, 2, 3]; //ok
u = {}; //ok

let value: any = u; //ok
let value1: any = a; //ok

let value2: unknown = u; //ok
let value3: unknown = a; //ok

// let value4:string = u //error
let value5: string = a; //ok

// let value6:number = u //error
let value7: number = a; //ok

// let value8: boolean = u; //error
let value9: boolean = a; //ok

// void
// 当一个函数没有返回值时，ts默认他的返回值为 void 类型。指定了void类型后，只能返回undefined
const setInfo0 = (): void => { }; // 等价于 const setInfo = () => {}
// const setInfo1 = (): void => { return '1'; };  // error
// const setInfo2 = (): void => { return 2; }; // error
// const setInfo3 = (): void => { return true; }; // error
const setInfo4 = (): void => { return; }; // ok
const setInfo5 = (): void => { return undefined; }; //ok 

// never
// never 表示函数永远不会有返回值，相当于void子集，void可以返回undefined，而never连undefined也不会返回。
// 符合never的情况有：1.抛出异常，2.无限死循环。

let error = (): never => { // 等价约 let error = () => {}
    throw new Error("error");
};

let error1 = (): never => {
    while (true) { }
};

// enum 枚举
// 枚举类型只能是string，number，默认number
// 数值枚举
enum numberType1 { A, B, C = 7, D }

let num0 = numberType1.A; // 默认0
let num1 = numberType1[0]; // "A"，反向映射属性名A，只能映射无默认值的属性，且默认值前面的属性才能被映射。
let num2 = numberType1[1]; // undefined，虽然被赋值了7，但前面无默认值。
let num3 = numberType1[2]; // undefined

// 字符串枚举，字符串必须要有默认值，不支持反向映射。
enum stringType {
    A = 'A',
    B = 'B',
    C = 'C',
    D = 'D',
}

// 常量枚举，和数值枚举区别，不再有undefined，会根据默认值累加
const enum numberType2 {
    A, B, C = 7, D
}

let enum1 = numberType2.A; // 0
let enum2 = numberType2.B;// 1
let enum3 = numberType2.C;// 7
let enum4 = numberType2.D;// 8

// 异构枚举，数值型与字符型混合，反向映射和上面同理，默认值前面才有
enum typeData {
    A, B, C = 'C', D = 'D', E = 7, F
}

console.log(typeData.A, typeData[0], typeData[1], typeData[2], typeData[3]); // 0 "A" undefined undefined

// 类型推论
// ts不用每个都去赋值类型，根据结果会默认赋予相应的类型。可以减少工作量。
let a2; // 推断为any
let stri = '小杜杜'; // 推断为string
let numb = 13; // 推断为number
let flag = false; // 推断为boolean

// str = true; // error Type 'boolean' is not assignable to type 'string'.(2322)
// num = 'Domesy'; // error
// flag = 7; // error

// 字面量类型
// 把类型和值一起指定，重新赋值时不能超过其范围。
let str2: 'ahxc';
let num4: 1 | 2 | 3 = 1;
let flag2: true; // 赋值


str2 = 'ahxc'; // ok
// str2 = 'Donmesy' // error

num4 = 2; //ok
// num4 = 7 // error

flag2 = true; // ok
// flag2 = false // error

// 交叉类型
// 多个类型合并为一个类型，使用 & 符号连接。

type AProps = { a: string; };
type BProps = { b: number; };
type allProps = AProps & BProps;// 合并字符和数值类型相当于 {a:string,b:number}
const setInfo6: allProps = {
    a: 'ahxc',
    b: 7,
    // c: 0// error，没有指定类型
};
type a = string | number; // 自定义或类型

// 同名属性合并
// {a:number} & {a:string} = never 属性a类型
// string & number = never 类型
// string & string = string

type DProps = { a: string, c: number; };
type EProps = { b: number, c: string; };

type allProps2 = DProps & EProps;

// const Info2: allProps2 = {
// a: '小杜杜',
// b: 7,
// c, error // 缺少属性c会报错
// c:  1, // error (property) c: never
// c:  'Domesy', // error (property) c: never // ! 怎么赋值都会报错
// };

// 非表层属性合并，同理
interface A { a: number; }
interface B { b: string; }

interface C {
    x: A;
}
interface D {
    x: B;
}
type allProps3 = C & D; // x合成了 a和b

const Info: allProps3 = {
    x: {
        a: 7,
        b: '小杜杜'
    }
};

console.log(Info); // { x: { "a": 7, "b": "小杜杜" }}

// class 
// 静态属性，静态方法、成员属性、成员方法、构造器、get set方法

// ! 注意： 在成员属性中，如果不给默认值,并且不使用是会报错的，如果不想报错就给如 !，如：name4!:string
// 5.2.2最新版本没有报错。

class Info3 {
    //静态属性
    static name1: string = 'Domesy';

    //成员属性，实际上是通过public上进行修饰，只是省略了
    nmae2: string = 'Hello'; //ok 
    name3: string; //error 
    name4!: string; //ok 不设置默认值的时候必须加入 !

    //构造方法
    constructor(_name: string) {
        this.name4 = _name;
    }

    //静态方法
    static getName = () => {
        return '我是静态方法';
    };

    //成员方法
    getName4 = () => {
        return `我是成员方法:${this.name4}`;
    };

    //get 方法
    get name5() {
        return this.name4;
    }

    //set 方法
    set name5(name5) {
        this.name4 = name5;
    }
}

const setName = new Info3('你好');
console.log(Info3.name1); //  "Domesy" 
console.log(Info3.getName()); // "我是静态方法" 
console.log(setName.getName4()); // "我是成员方法:你好" 

// 类的私有字段 #
// 私有字段唯一，不能添加访问修饰符 public，private，只能类内部访问，甚至不能被检测到。

class InfoPrivate {
    #name: string; //私有字段
    getName: string;

    constructor(name: string) {
        this.#name = name;
        this.getName = name;
    }

    setName() {
        return `我的名字是${this.#name}`;
    }
}

let myName = new InfoPrivate("Domesy");

console.log(myName.setName()); // "我的名字是Domesy" 
console.log(myName.getName); // ok "Domesy" 
// console.log(myName.#name); // error
// Property '#name' is not accessible outside class 'Info'
// because it has a private identifier.(18013)

// 只读属性 readonly
// 只能在构造函数constructor中修改，在ts中，只能用于interface，type，class标为只读
// 接口示例  
interface Person {
    readonly name: string;
    readonly age: number;
}

const person: Person = { name: 'Alice', age: 25 };
console.log(person.name); // 输出 'Alice'  
//   person.name = 'Bob'; // 报错：TypeError: Cannot assign to read only property 'name' of object '#<Object>'  

// 类型别名示例  
type ReadonlyPerson = {
    readonly name: string;
    readonly age: number;
};

const readonlyPerson: ReadonlyPerson = { name: 'Alice', age: 25 };
console.log(readonlyPerson.name); // 输出 'Alice'  
// readonlyPerson.name = 'Bob'; // 报错：TypeError: Cannot assign to read only property 'name' of object '#<Object>'  

// 类示例  
class ReadonlyClass {
    private _name: string; // 私有属性外部无法修改
    private _age: number;
    public readonly name2: string; // 只读属性

    constructor(name: string, age: number) {
        this._name = name;
        this._age = age;
    }

    get name(): string {
        // this.name2 = name // error
        return this._name;
    }

    get age(): number {
        return this._age;
    }
}

const readonlyInstance = new ReadonlyClass('Alice', 25);
console.log(readonlyInstance.name); // 输出 'Alice'  
// readonlyInstance.name = 'Bob'; // 报错：TypeError: Cannot assign to read only property 'name' of object '#<Object>'

// 父类
class Persons {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    getName() {
        console.log(`我的姓名是：${this.name}`);
        return this.name;
    }

    setName(name: string) {
        console.log(`设置姓名为：${name}`);
        this.name = name;
    }
}

// 子类
class Childs extends Persons {
    tel: number;
    constructor(name: string, age: number, tel: number) {
        super(name, age);
        this.tel = tel;
    }

    getTel() {
        console.log(`电话号码是${this.tel}`);
        return this.tel;
    }
}

let res = new Childs("Domesy", 7, 123456);
console.log(res); // Child {."name": "Domesy", "age": 7, "no": 1 }
console.log(res.age); // 7
res.setName('小杜杜'); // "设置姓名为：小杜杜" 
res.getName(); //   "我的姓名是：小杜杜"
res.getTel(); //  "电话号码是123456" 

// 修饰符，主要有三种
// public：类中，子类，外部都能调用
// protected：外部不能调用
// private：仅类中可以调用。

class Personss {
    public name: string;
    protected age: number;
    private tel: number;

    constructor(name: string, age: number, tel: number) {
        this.name = name;
        this.age = age;
        this.tel = tel;
    }
}

class Childss extends Personss {
    constructor(name: string, age: number, tel: number) {
        super(name, age, tel);
    }

    getName() {
        console.log(`我的名字叫${this.name},年龄是${this.age}`); // ok name 和 age可以
        // console.log(`电话是${this.tel}`); // error 报错 原因是 tel 拿不出来
    }
}

const res2 = new Childss('Domesy', 7, 123456);
console.log(res.name); // ok Domesy
console.log(res.age); // error
console.log(res.tel); // error

// 抽象类 abstract
// 抽象类不能被实例化，抽象方法指不包含具体实现的方法。

abstract class Personabst {
    constructor(public name: string) { }

    // 抽象方法
    abstract setAge(age: number): void;
}

class Childab extends Personabst {
    constructor(name: string) {
        super(name);
    }

    setAge(age: number): void {
        console.log(`我的名字是${this.name},年龄是${age}`);
    }
}

// let res = new Personabst("小杜杜"); //error 
let res1 = new Childab("小杜杜"); // 继承后子类实现了抽象方法便可以实例化

res1.setAge(7); // "我的名字是小杜杜,年龄是7"

// 重写重载
// 重写：子类继承后重写父类的方法。
// 重载，即函数重载在类内部的运用。参数个数和类型不同，其调用方法不同。

// 重写
class PersonRe {
    setName(name: string) {
        return `我的名字叫${name}`;
    }
}

class ChildRe extends PersonRe {
    setName(name: string) {
        return `你的名字叫${name}`;
    }
}

const yourName = new ChildRe();
console.log(yourName.setName('小杜杜')); // "你的名字叫小杜杜" 

// 重载，根据参数的数量和类型调用不同的方法。可以用switch匹配 argments 长度。
class Person1 {
    setNameAge(name: string): void;
    setNameAge(name: number): void;
    setNameAge(name: string | number) {
        if (typeof name === 'string') {
            console.log(`我的名字是${name}`);
        } else {
            console.log(`我的年龄是${name}`);
        }
    };
}

const resss = new Person1();
resss.setNameAge('小杜杜'); // "我的名字是小杜杜" 
resss.setNameAge(7); // "我的年龄是7"

// 类型断言，给变量指定类型申明。
//尖括号
let numAccount: any = '小杜杜';
let resAccount: number = (<string>numAccount).length; // React中会 error，因为尖括号与jsx语法冲突。所以只能用as

// as 语法
let strAccount: any = 'Domesy';
let resAccountAccount: number = (str as string).length;

// 非空断言
