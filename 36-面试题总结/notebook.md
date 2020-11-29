[toc]

# 2019前端面试题 | JS部分（附带答案）

其实刷面试题的过程也能更新自己对知识的认识，所以也提醒自己多看多理解。如果对下面题目有更深理解，会实时更新。遇到新题目，也会不定时更新。希望能帮助到部分朋友～

## 一、各种函数方法定义及区别

### 1. typeof运算符和instanceof运算符以及isPrototypeOf方法的区别

typeof是一个运算符，用于检测数据的类型，比如基本数据类型null、undefined、string、number、boolean，以及引用数据类型object、function，但是对于正则表达式、日期、数组这些引用数据类型，它会全部识别为object； 

instanceof同样也是一个运算符，它就能很好识别数据具体是哪一种引用类型。它与isPrototypeOf的区别就是它是用来检测实例化的构造函数的原型是否存在于指定对象的原型链当中；

而isPrototypeOf是用来检测调用此方法的对象是否存在于指定对象的原型链中，所以本质上就是检测目标不同，对象颠倒。

### 2.call()和apply()的区别

实际上，apply和call的功能是一样的，只是传入的参数列表形式不同。apply最多只能有两个参数：新this对象和一个数组argArray。call则没限制。

### 3.全局函数eval()有什么作用？

eval()只有一个参数，如果传入的参数不是字符串，它直接返回这个参数。如果参数是字符串，它会把字符串当成javascript代码进行编译。如果编译失败则抛出一个语法错误(syntaxError)异常。如果编译成功，则开始执行这段代码，并返回字符串中的最后一个表达式或语句的值，如果最后一个表达式或语句没有值，则最终返回undefined。如果字符串抛出一个异常，这个异常将把该调用传递给eval()。

### 4.描述以下变量的区别：null，undefined或undeclared

***null*** 表示"没有对象"，即该处不应该有值，转为数值时为0。

（1） 作为函数的参数，表示该函数的参数不是对象。

（2） 作为对象原型链的终点。

***undefined*** 表示"缺少值"，就是此处应该有一个值，但是还没有定义，转为数值时为NaN。

（1）变量被声明了，但没有赋值时，就等于undefined。

（2) 调用函数时，应该提供的参数没有提供，该参数等于undefined。

（3）对象没有赋值的属性，该属性的值为undefined。

（4）函数没有返回值时，默认返回undefined。

***undeclared*** :js语法错误，没有申明直接使用，js无法找到对应的上下文。

### 5.==和===有什么区别？

== equality 等同。两边值类型不同的时候，要先进行类型转换，再比较。

=== identity 恒等。不做类型转换，类型不同的一定不等。

### 6.同步异步?

进程同步：就是在发出一个功能调用时，在没有得到结果之前，该调用就不返回。也就是必须一件一件事做,等前一件做完了才能做下一件事

异步的概念和同步相对。当一个异步过程调用发出后，调用者不能立刻得到结果。实际处理这个调用的部件在完成后，通过状态、通知和回调来通知调用者。

## 二、各种概念/原理

### 1. 什么是事件代理/事件委托？

事件代理/事件委托是利用事件冒泡的特性，将本应该绑定在多个元素上的事件绑定在他们的祖先元素上，尤其在动态添加子元素的时候，可以非常方便的提高程序性能，减小内存空间。把事件委托给祖先元素

### 2.什么是事件冒泡？什么是事件捕获？

冒泡型事件：事件按照从最特定的事件目标到最不特定的事件目标的顺序触发。

（1）只有祖先元素绑定事件，从底往上传递

（2）每个元素都绑定，从上往底传递

捕获型事件：事件从最不精确的dom对象开始触发，然后到最精确(也可以在窗口级别捕获事件，不过必须由开发人员特别指定)。

​	当一个元素需要多种监听时，可以使用事件绑定addEventListener，响应顺序按照函数定义顺序

​	支持W3C标准的浏览器在添加事件时用addEventListener(event, fn, useCapture)方法，基中第3个参数useCapture是一个Boolean值，用来设置事件是在true	事件捕获时执行，还是false事件冒泡时执行。而不兼容W3C的浏览器(IE)用attachEvent()方法，此方法没有相关设置，不过IE的事件模型默认是在事件冒泡时执	行的，也就是在useCapture等于false的时候执行，所以把在处理事件时把useCapture设置为false是比较安全，也实现兼容浏览器的效果。

### 3.如何阻止冒泡？

w3c的方法是e.stopPropagation()，IE则是使用e.cancelBubble = true。例如： `window.event? window.event.cancelBubble = true : e.stopPropagation();`

return false加入事件封装函数的底部可以阻止冒泡。还可以阻止大多的事件默认类型。

### 4.如何阻止默认事件？

w3c的方法是e.preventDefault()，IE则是使用e.returnValue = false，比如：

```javascript
function stopDefault(e){
    //阻止默认浏览器动作(W3C) 
    if ( e && e.preventDefault ) 
        e.preventDefault(); 
    //IE中阻止函数器默认动作的方式 
    else 
        window.event.returnValue = false; 
}
```

return false也能阻止默认行为。

### 5.简述javascript中this的指向

第一准则是：this永远指向函数运行时所在的对象，而不是函数被创建时所在的对象。

- 普通的函数调用，函数被谁调用，this就是谁。
- 构造函数的话，如果不用new操作符而直接调用，那即this指向window。用new操作符生成对象实例后，this就指向了新生成的对象。
- 匿名函数或不处于任何对象中的函数指向window 。
- 如果是call，apply等，指定的this是谁，就是谁。

### 5.原生对象和宿主对象

**原生对象/内建对象**是ECMAScript规定的对象，所有内置对象都是原生对象，比如Math，String，Number，Boolean，Function，Object，Array、Date、RegExp等；

**宿主对象**是宿主环境比如浏览器规定的对象BOM和DOM，用于完善是ECMAScript的执行环境，比如Document、Location、Navigator等。

### 6.基本数据类型和引用数据类型

**基本数据类型**指的是简单的数据段，有5种，包括null、undefined、string、boolean、number；

**引用数据类型**指的是有多个值构成的对象，包括object、array、date、regexp、function等。

**主要区别：**

- 声明变量时不同的内存分配：前者由于占据的空间大小固定且较小，会被存储在栈当中，也就是变量访问的位置；后者则存储在堆当中，变量访问的其实是一个指针，它指向存储对象的内存地址。
- 也正是因为内存分配不同，在复制变量时也不一样。前者复制后2个变量是独立的，因为是把值拷贝了一份；后者则是复制了一个指针，2个变量指向的值是该指针所指向的内容，一旦一方修改，另一方也会受到影响。
- 参数传递不同：虽然函数的参数都是按值传递的，但是引用值传递的值是一个内存地址，实参和形参指向的是同一个对象，所以函数内部对这个参数的修改会体现在外部。原始值只是把变量里的值传递给参数，之后参数和这个变量互不影响。

### 7.深拷贝和浅拷贝

浅拷贝是创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以**如果其中一个对象改变了这个地址，就会影响到另一个对象**。

深拷贝是将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象，且**修改新对象不会影响原对象**。

```javascript
var a1 = {b: {c: {}};
var a2 = shallowClone(a1); // 浅拷贝方法
a2.b.c === a1.b.c // true 新旧对象还是共享同一块内存
var a3 = deepClone(a3); // 深拷贝方法
a3.b.c === a1.b.c // false 新对象跟原对象不共享内存
```

### 8.赋值和深/浅拷贝的区别

这三者的区别如下，不过比较的前提都是**针对引用类型**：

- 当我们把一个对象赋值给一个新的变量时，**赋的其实是该对象的在栈中的地址，而不是堆中的数据**。也就是两个对象指向的是同一个存储空间，无论哪个对象发生改变，其实都是改变的存储空间的内容，因此，两个对象是联动的。
- 浅拷贝：重新在堆中创建内存，拷贝前后对象的基本数据类型互不影响，但拷贝前后对象的引用类型因共享同一块内存，会相互影响。
- 深拷贝：从堆内存中开辟一个新的区域存放新对象，对对象中的子对象进行递归拷贝,拷贝前后的两个对象互不影响。

```javascript
/* 关于赋值和内存的问题 */
/* 引用传递 */
var obj1 = {"name": "zx"}
var obj2 = obj1;/* 引用变量的共享数据，可互相修改属性 */
obj1.name = "xz";

/* 值传递 */
var obj3 = {"name": "zx"}
var obj4 = obj3;
obj3 = {"name:": "xz"}/* 赋值运算覆盖原对象，对象成为垃圾对象，造成引用变量的断裂 */
obj4.name = "y";
```

### 9.解释一下原型继承的原理

首先js分为函数对象和普通对象，每个对象都有__proto__属性，但是只有函数对象才有**prototype**属性，prototype好比对象的公共区域，可以定义一些公共属性，无定义为undefined，js是基于原型对象的，原型也是一个对象，通过原型可以实现对象之间的属性继承。

调用对象属性或方法时，会先在自身寻找，然后再去原型查找，然后再去原型的原型上查找，直到object，object的原型没有原型为null。

### 10.解释下为什么接下来这段代码不是IIFE(立即调用的函数表达式):

```
function foo(){
    //code
}()
```

以function关键字开头的语句会被解析为函数声明，而**函数声明是不允许直接运行的**。 只有当解析器把这句话解析为函数表达式，才能够直接运行，怎么办呢？以运算符开头就可以了。

```
(function foo(){
    // code..
})()
```

### 11.get和post有什么区别？

其实，GET和POST本质上两者没有任何区别。他们都是HTTP协议中的请求方法。底层实现都是基于TCP/IP协议。所谓区别，只是浏览器厂家根据约定，做得限制而已。

- get是通过明文发送数据请求，而post是通过密文；
- get传输的数据量有限，因为url的长度有限，post则不受限；
- GET请求的参数只能是ASCII码，所以中文需要URL编码，而POST请求传参没有这个限制
- GET产生一个TCP数据包；POST产生两个TCP数据包。对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）；而对于POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok（返回数据）。
- 通常post用于发送表单，而get获取资源

### 12.请解释变量声明提升

通过var声明的变量会被提升至作用域的顶端。不仅仅是变量，函数声明也一样会被提升。当同一作用域内同时出现变量和函数声明提升时，变量仍然在函数前面。

### 13.请指出document.onload和document.ready两个事件的区别

页面加载完成有两种事件，一是ready，表示文档结构已经加载完成（不包含图片等非文字媒体文件），二是onload，指示页面包含图片等文件在内的所有元素都加载完成。

与之相似的还有window.onload

### 14.如何从浏览器的URL中获取查询字符串参数？

```javascript
getUrlParam : function(name){
        // baidu.com/product/list?keyword=XXX&page=1
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
	}
```

- 首先设置一个函数，给这个函数传递一个参数，也就是url的search部分的key值；
- 设置一个正则表达式，以&开头或没有，中间是参数，后面以#或&结尾或没有；
- 通过window.location.search.substr(1).match()匹配,返回一个数组
- 如果数组不为空，返回数组的第3个值，也就是正则表达式的第二个子串

### 15.JavaScript里arguments究竟是什么？

Javascrip中国每个函数都会有一个Arguments对象实例arguments，它引用着函数的实参，可以用数组下标的方式"[]"引用arguments的元素，可以不指定形成而获取函数获得的所有实参。arguments.length为函数实参个数，arguments.callee引用函数自身。

在函数代码中，使用特殊对象arguments，开发者无需明确指出参数名，通过使用下标就可以访问相应的参数。

```javascript
function test() {
        var s = "";
        for (var i = 0; i < arguments.length; i++) {
            alert(arguments[i]);
            s += arguments[i] + ",";
        }
        return s;
    }
    test("name", "age");//name,age
```

arguments虽然有一些数组的性质，但其并非真正的数组，只是一个类数组对象。其并没有数组的很多方法，不能像真正的数组那样调用.jion(),.concat(),.pop()等方法。

### 16.什么是"use strict";?使用它的好处和坏处分别是什么？

在代码块头部中出现表达式"use strict"; 意味着代码按照严格模式解析，这种模式使得Javascript在更严格的条件下运行。

***好处：***

- 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
- 消除代码运行的一些不安全之处，保证代码运行的安全；
- 提高编译器效率，增加运行速度；
- 为未来新版本的Javascript做好铺垫。

***坏处：***

- 同样的代码，在"严格模式"中，可能会有不一样的运行结果；
- 一些在"正常模式"下可以运行的语句，在"严格模式"下将不能运行。

### 17.请解释一下JavaScript的同源策略

同源策略，即拥有相同的协议（protocol），端口（如果指定），主机（域名）的两个页面是属于同一个源。 然而在IE中比较特殊，IE中没有将端口号加入同源的条件中，因此上图中端口不同那一项，在IE中是算同源的。 `<script> <img> <iframe>`中的src，href都可以任意链接网络资源，**不遵循通源策略**。

### 18.请解释JSONP的工作原理，以及它为什么不是真正的AJAX。

JSONP (JSON with Padding)是一个简单高效的跨域方式，HTML中的script标签可以加载并执行其他域的javascript，于是我们可以通过script标记来动态加载其他域的资源。例如我要从域A的页面pageA加载域B的数据，那么在域B的页面pageB中我以JavaScript的形式声明pageA需要的数据，然后在 pageA中用script标签把pageB加载进来，那么pageB中的脚本就会得以执行。JSONP在此基础上加入了回调函数，pageB加载完之后会执行pageA中定义的函数，所需要的数据会以参数的形式传递给该函数。JSONP易于实现，但是也会存在一些安全隐患，如果第三方的脚本随意地执行，那么它就可以篡改页面内容，截获敏感数据。但是在受信任的双方传递数据，JSONP是非常合适的选择。

### 19.通过new创建一个对象的时候，构造函数内部有哪些改变？

```javascript
function Person(){}
Person.prototype.friend = [];
Person.prototype.name = '';
var a = new Person();
a.friend[0] = '王琦';
var b = new Person();
console.log(b.friend);//Array [ "王琦" ]
```

- 创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数（函数是引用变量因此可以相互修改）的原型，查找不存在的属性和方法会去原型上查找。
- 属性和方法被加入到 this 引用的对象中。
- 新创建的对象由 this 所引用，并且最后隐式的返回 this 。

### 20.什么是跨域？有什么方法解决跨域带来的问题？

跨域需要针对浏览器的同源策略来理解，同源策略指的是请求必须是同一个**端口**，同一个**协议**，同一个**域名**，不同源的客户端脚本在没有明确授权的情况下，不能读写对方资源。受浏览器同源策略的影响，不是同源的脚本不能操作其他源下面的对象。想要操作另一个源的对象是就需要跨域。

### 21. 什么是原型?

**原型链**

​	简单来讲就是原型组成的链，比如函数的原型是Function，Function的原型是Object，Object的原型仍然是Object，一直追溯到最终的原型对象到null。

函数通过 prototype 来追溯原型对象，对象通过 proto 来追溯原型对象。

​	通过一个构造函数创建出来的多个实例，如果都要添加一个方法，给每个实例去添加并不是一个明智的选择。这时就该用上原型了。在实例的原型上添加一个方法，这个原型的所有实例便都有了这个方法。

**原型的作用**

​	全局方法或组件的定义可以用到原型，原型加上$符号便于区分。

​	使用原型防止变量名污染。

**原型链继承**

```javascript
function Show(){
this.name="run";
}
function Run(){
this.age="20";
}
Run.prototype = new Show();// Run继承了Show，通过原型形成链条
var showName = new Run();
alert(showName.name)//结果：run，通过原型链查找
```

### 22. 什么是闭包？使用场景是？

简单理解为函数包裹函数，防止函数名污染命名空间，内部函数引用了外部函数的数据，闭包就是能够读取其他函数内部变量的函数，它的最大用处有两个，一个是可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中，不会在外部函数调用后被自动清除。

**使用场景**

​	立即执行函数(func)(参数)：可用于闭包，防止函数名污染命名空间

​	原生JS的模块化，与以往导入js不同，这里引用的js都封装在了moduleA中

```javascript
var moduleA = moduleA();
```

​	将函数作为另一个函数的参数

### 23. 了解过Promise吗？与回调地狱有什么关系？

promise是一套异步解决方法，异步执行可以用回调函数实现。使用不当则造成回调地狱。回调地狱：各种函数和回调函数的嵌套，造成逻辑混乱，返回值不可预估。

解决回调地狱的方法，es7的 async await，其中await能等待promise对象执行完成变为请求的数据

## 三、关于定时器的那些事儿～（偏小白逻辑）

防抖：一般输入框等v-model类型，快速的输入多个字符每个字符都响应，滚动滚动条位置频繁响应等等

节流：下拉刷新、上拉加载和按钮频繁点击造成的多次请求类型等等

解决原理：把请求封装成函数加入一个定时器，如果再次来了请求，清除前一个定时器，再创建一个新定时器

```javascript
// 简单用法
clearTimeout(this.timer);
this.timer = setTimeout(() => {
	this.getSearch({query: value})
}, 1000);

// 高级封装
function debounce(func, delay=50) {
  let timer = null;

  return function(...args) {
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
```

### 1.如果用户持续点击一个按钮，如何只提交一次请求，且不影响后续使用？（节流）

**何为节流** 触发函数事件后，短时间间隔内无法连续调用，只有上一次函数执行后，过了规定的时间间隔，才能进行下一次的函数调用，一般用于http请求。

**解决原理** 对处理函数进行延时操作，若设定的延时到来之前，再次触发事件，则清除上一次的延时操作定时器，重新定时。

```
function conso(){
	console.log('is run');
}
var btnUse=true;
$("#btn").click(function(){
	if(btnUse){
		conso();
		btnUse=false;
}
setTimeout(function(){
		btnUse=true;
	},1500) //点击后相隔多长时间可执行
})
```

### 2.如何防抖？

**何为防抖** 多次触发事件后，事件处理函数只执行一次，并且是在触发操作结束时执行，一般用于scroll事件。

**解决原理** 对处理函数进行延时操作，若设定的延时到来之前再次触发事件，则清除上一次的延时操作定时器，重新定时。

```
let timer;
window.onscroll  = function () {
    if(timer){
        clearTimeout(timer)
    }
    timer = setTimeout(function () {
        //滚动条位置
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        console.log('滚动条位置：' + scrollTop);
        timer = undefined;
    },200)
}
复制代码
```

或者是这样：

```
function debounce(fn, wait) {
    var timeout = null;
    return function() {  
        if(timeout !== null)   clearTimeout(timeout);        
        timeout = setTimeout(fn, wait);    
    }
}
// 处理函数
function handle() {    
    console.log(Math.random()); 
}
// 滚动事件
window.addEventListener('scroll', debounce(handle, 1000));
复制代码
```

### 2.猜猜如下题目的结果？

```
function Timer() {
  this.s1 = 0;
  this.s2 = 0;
  setInterval(() => this.s1++, 1000);
  setInterval(function () {
    this.s2++;
  }, 1000);
}

var timer = new Timer();
setTimeout(() => console.log('s1: ', timer.s1), 3100);
setTimeout(() => console.log('s2: ', timer.s2), 3100);
复制代码
```

答案是：

```
s1: 3
s2: 0
复制代码
```