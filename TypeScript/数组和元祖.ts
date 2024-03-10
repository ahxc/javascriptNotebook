// 数组也可以省略类型标识

const arr1 = [1, "2"];
const arr2: (number | string)[] = [1, 2];
const arr3: Array<number | string> = [1, 2]; // jsx 冲突


// 元祖比数组有更多限制，须制定个数和对应类型，和对象obj一致
// 可以新增删除，新增的元素不能通过索引访问。
const arr: [string, number] = ["1", 2];

