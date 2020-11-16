/* js六种数据类型 */
/* String，Number，Boolean，Null，Undefined，Object */

/* 字符串String */
/* 字符串单双引号都可以，但不能同类型嵌套如："""""，'''，除非转义字符\ */
/* \t制表符 */

/* 数值型Number */
/* js中所有数值都是Number型，包括整数和小数 */
console.log(typeof a);/* 可以用typeof检查变量类型 */
Number.MAX_VALUE;/* js中的最大值，在该值上增加则为Infinity值，无穷但类型不变 */
Number.MIN_VALUE;
NaN;/* 表示这不是一个数值的数值类型 */
const a = 0.1+0.2/* 返回0.30000004，大多语言的一个通病，浮点运算不准确，其他语言做了处理 */
/* 所以精度高的运算不要在js中做 */
a=0x10/* 十六进制，输出都会转换为十进制 */
a=070/* 八进制 */
a=0b10/* 二进制 */

/* 布尔值Boolean */
true || false

/* undefined */
const a = null/* 空 */
const b = undefined/* 未定义 */
/* undefined与null的区别
    undefined表示已定义未赋值，null表示赋值空 */

/* 基本数据类型
String，Number，Boolean，Null，undefined
基本数据类型存储在栈内存，相互独立 */

/* 引用数据类型
Object
对象引用数据类型存储在堆内存中，每新建一个对象会在内存中开辟一个新空间 */