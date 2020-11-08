/* 转字符串 */
a = 123;
a = true;
a = null;
a = undefined;
/* 方法一 */
const b = a.toString;
/* '123'，'true'，null和undefined报错 */
/* 方法二 */
String(a)
/* 对于null和undefined就是toString */

/* 转数值型 */
a = ""
Number(a)/* null，空串或者空格串为0，undefined为NaN */
parseInt(a)/* 转换为整数 */
parseFloat(a)/* 转换为浮点数，两个parse都只转换数值部分，过于混杂则返回NaN */