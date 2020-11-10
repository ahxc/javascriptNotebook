/* 质数：只能被1和自身整除的数 */
const num = prompt("请输入一个大于1的整数")/* prompt弹出一个带提示的文本框 */
if (num<=1) {
  alert("不合法")
}
else {
  for(let i = 2; i < num; i++) {
    if (num%i == 0){alert(num+"不是质数")}
  }
}


/* 星阵 */
/* 
*
**
***
****
*/
for(let i=0; i<5; i++){
  for(let j=0; j<i+1; j++){
    document.write("*")
  }
  document.write("<br />")
}