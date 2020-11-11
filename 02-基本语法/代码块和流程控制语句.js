{
  /* 代码块不需要加分号 */
}

/* 条件判断语句 */
if (true) {} 
else if(true) {}

/* 条件分支语句 */
/* switch在于值匹配，也有局限性，如条件判断它只注重值truefalse的匹配，
不会在意条件 */
switch(a) {
  case 1: {break}
  case 2: {break}
  case 3: {break}
  case a>0: { break}
  default: {break}
}

/* while循环 */
while(true && false) {}

/* for循环 */
for (const a=0; a<10; a++) {}

/* break和continue */
/* break和continue只存在循环和switch语句中 */
outer:
for (let i=0; i<5; i++) {
  for (let j=0; j<5; j++){
    break outer/* 什么都不做直接跳出最外层循环 */
  }
}
/* continue用来跳过当前循环，同缩进的下面语句也不会再次执行 */